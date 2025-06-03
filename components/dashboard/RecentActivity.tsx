import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      action: "Simulation Completed",
      description: 'E-commerce checkout flow with "Budget Shopper" persona',
      time: "2 hours ago",
      user: "You",
    },
    {
      id: 2,
      action: "Persona Created",
      description: 'New persona "Tech Enthusiast" added to library',
      time: "5 hours ago",
      user: "You",
    },
    {
      id: 3,
      action: "Insight Flagged",
      description: "High hesitation detected in pricing page interaction",
      time: "1 day ago",
      user: "Team Member",
    },
    {
      id: 4,
      action: "Project Updated",
      description: 'Added new scenario to "Mobile App Onboarding"',
      time: "2 days ago",
      user: "You",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start">
              <div className="mr-4 mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.time} by {activity.user}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default RecentActivity
