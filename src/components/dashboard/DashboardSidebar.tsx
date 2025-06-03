"use client"
import { Brain, Home, FolderOpen, Users, BarChart3, Settings, Plus, Search, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

const DashboardSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard", count: null },
    { icon: FolderOpen, label: "Projects", path: "/projects", count: 12 },
    { icon: Users, label: "Personas", path: "/personas", count: 8 },
    { icon: BarChart3, label: "Analytics", path: "/analytics", count: null },
    { icon: MessageSquare, label: "Feedback", path: "/feedback", count: null },
    { icon: Search, label: "Search", path: "/search", count: null },
    { icon: Settings, label: "Settings", path: "/settings", count: null },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div
      className="w-64 glass-card backdrop-blur-xl border-r border-white/20 h-screen flex flex-col"
      style={{ background: "rgba(230, 240, 250, 0.1)" }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 gradient-cta rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-prismatic font-['Sora']">Simulacrum</h1>
            <p className="text-xs text-white/60">AI Research Hub</p>
          </div>
        </div>
      </div>

      {/* Quick Create */}
      <div className="p-4">
        <Button
          className="w-full gradient-cta text-white border-0 font-['Inter'] text-sm"
          onClick={() => navigate("/setup")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Simulation
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 group ${
              isActive(item.path)
                ? "glass-card bg-white/10 border-white/30 text-white"
                : "hover:bg-white/5 text-white/70 hover:text-white"
            }`}
            onClick={() => navigate(item.path)}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium font-['Inter']">{item.label}</span>
            </div>
            {item.count && <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">{item.count}</span>}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/20">
        <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
          onClick={() => navigate("/profile")}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white font-['Inter']">Dr. Sarah Chen</p>
            <p className="text-xs text-white/60 font-['Inter']">Research Lead</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
