-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    simulation_id UUID REFERENCES public.simulations(id) ON DELETE SET NULL,
    rating_overall INTEGER NOT NULL CHECK (rating_overall BETWEEN 1 AND 5),
    rating_accuracy INTEGER NOT NULL CHECK (rating_accuracy BETWEEN 1 AND 5),
    comments TEXT,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create research_data table for uploaded files
CREATE TABLE IF NOT EXISTS public.research_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    file_path TEXT NOT NULL,
    description TEXT,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_logs table for tracking user sessions
CREATE TABLE IF NOT EXISTS public.analytics_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_id TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    page_views JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_logs ENABLE ROW LEVEL SECURITY;

-- Feedback policies
CREATE POLICY "Users can view their own feedback"
    ON public.feedback
    FOR SELECT
    USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own feedback"
    ON public.feedback
    FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own feedback"
    ON public.feedback
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Research data policies
CREATE POLICY "Users can view their own research data"
    ON public.research_data
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own research data"
    ON public.research_data
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Analytics logs policies
CREATE POLICY "Users can view their own analytics logs"
    ON public.analytics_logs
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics logs"
    ON public.analytics_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics logs"
    ON public.analytics_logs
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create storage buckets for research data
INSERT INTO storage.buckets (id, name, public) VALUES ('research_notes', 'research_notes', false);

-- Set up storage policies
CREATE POLICY "Users can upload their own research notes"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'research_notes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own research notes"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'research_notes' AND auth.uid()::text = (storage.foldername(name))[1]);
