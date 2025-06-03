import { Button } from "../ui/button"

const DashboardSidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: "grid", path: "/dashboard" },
    { name: "Projects", icon: "folder", path: "/projects" },
    { name: "Personas", icon: "users", path: "/personas" },
    { name: "Simulations", icon: "zap", path: "/simulation-chamber" },
    { name: "Analytics", icon: "bar-chart", path: "/analytics" },
    { name: "Feedback", icon: "message-square", path: "/feedback" },
    { name: "Settings", icon: "settings", path: "/settings" },
  ]

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Simulacrum</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.path} className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button className="w-full">New Simulation</Button>
      </div>
    </aside>
  )
}

export default DashboardSidebar
