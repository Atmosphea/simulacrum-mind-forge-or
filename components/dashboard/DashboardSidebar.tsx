import { Button } from "@/components/ui/button"

export default function DashboardSidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Simulations", href: "/simulations", icon: "🧪" },
    { name: "Personas", href: "/personas", icon: "👥" },
    { name: "Analytics", href: "/analytics", icon: "📈" },
    { name: "Projects", href: "/projects", icon: "📁" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-purple-600">Simulacrum</h2>
      </div>
      <nav className="px-4">
        {menuItems.map((item) => (
          <Button key={item.name} variant="ghost" className="w-full justify-start mb-2 text-left">
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
