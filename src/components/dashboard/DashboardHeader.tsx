import { Search, Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const DashboardHeader = () => {
  return (
    <header
      className="h-16 glass-card backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-6"
      style={{ background: "rgba(230, 240, 250, 0.1)" }}
    >
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-white text-glow font-['Sora']">Research Dashboard</h2>
        <div className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full border border-white/20 animate-sparkle">
          BETA v2.1
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <input
            type="text"
            placeholder="Search projects, personas..."
            className="w-64 h-9 pl-10 pr-4 glass-card text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-['Inter']"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Profile Dropdown */}
        <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-prism-shift"></div>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
