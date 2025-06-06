import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecentActivity() {
  const activities = [
    { action: "Simulation completed", project: "E-commerce Flow", time: "2 hours ago" },
    { action: "New persona created", project: "Mobile App UX", time: "4 hours ago" },
    { action: "Insights exported", project: "Marketing Campaign", time: "1 day ago" },
    { action: "Project shared", project: "Product Launch", time: "2 days ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.project}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
