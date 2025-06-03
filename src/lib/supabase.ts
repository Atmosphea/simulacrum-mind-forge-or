import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  company: string | null
  role: string | null
  plan_type: "explorer" | "voyager" | "architect" | null
  created_at: string
  updated_at: string
}

export interface Simulation {
  id: string
  user_id: string
  title: string
  description: string | null
  persona_id: string | null
  scenario_data: any
  results: any | null
  status: "draft" | "running" | "completed" | "failed"
  created_at: string
  updated_at: string
}

export interface Persona {
  id: string
  user_id: string
  name: string
  description: string
  traits: any
  is_custom: boolean
  created_at: string
  updated_at: string
}
