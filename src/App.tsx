import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Dashboard from "./pages/Dashboard"
import Dashboard2 from "./pages/Dashboard2"
import Projects from "./pages/Projects"
import Personas from "./pages/Personas"
import Analytics from "./pages/Analytics"
import Search from "./pages/Search"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import SetupHub from "./pages/SetupHub"
import SimulationChamber from "./pages/SimulationChamber"
import AnalysisPortal from "./pages/AnalysisPortal"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard2" element={<Dashboard2 />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setup" element={<SetupHub />} />
          <Route path="/simulation-chamber" element={<SimulationChamber />} />
          <Route path="/analysis" element={<AnalysisPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
