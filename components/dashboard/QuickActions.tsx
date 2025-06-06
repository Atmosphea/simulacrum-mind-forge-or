import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuickActions() {
  const actions = [
    { title: "New Simulation", description: "Start a new behavioral simulation", icon: "🧪" },
    { title: "Create Persona", description: "Build a new user persona", icon: "👤" },
    { title: "Import Data", description: "Upload existing user data", icon: "📊" },
    { title: "View Reports", description: "Access detailed analytics", icon: "📈" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center text-center">
              <span className="text-2xl mb-2">{action.icon}</span>
              <span className="font-medium">{action.title}</span>
              <span className="text-xs text-gray-600 mt-1">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
