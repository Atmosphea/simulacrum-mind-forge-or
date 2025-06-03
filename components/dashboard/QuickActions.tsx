import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

const QuickActions = () => {
  const actions = [
    {
      title: "New Simulation",
      description: "Run a new simulation with existing personas",
      icon: "play",
    },
    {
      title: "Create Persona",
      description: "Build a new persona for your simulations",
      icon: "user-plus",
    },
    {
      title: "Export Results",
      description: "Download simulation results as CSV or PDF",
      icon: "download",
    },
    {
      title: "Share Insights",
      description: "Share insights with your team members",
      icon: "share",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button key={index} variant="outline" className="h-auto flex flex-col items-start p-4 text-left">
              <span className="text-lg font-medium">{action.title}</span>
              <span className="text-sm text-gray-500 mt-1">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions
