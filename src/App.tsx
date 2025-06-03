import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Personas from "./pages/Personas"
import Projects from "./pages/Projects"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import SetupHub from "./pages/SetupHub"
import SimulationChamber from "./pages/SimulationChamber"
import AnalysisPortal from "./pages/AnalysisPortal"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import Pricing from "./pages/Pricing"
import FAQPage from "./pages/FAQPage"
import Feedback from "./pages/Feedback"
import { AuthProvider } from "./components/AuthProvider"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import { AnalyticsProvider } from "./components/AnalyticsProvider"

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/personas"
              element={
                <ProtectedRoute>
                  <Personas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setup"
              element={
                <ProtectedRoute>
                  <SetupHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/simulation/:id"
              element={
                <ProtectedRoute>
                  <SimulationChamber />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis/:id"
              element={
                <ProtectedRoute>
                  <AnalysisPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <Feedback />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnalyticsProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
