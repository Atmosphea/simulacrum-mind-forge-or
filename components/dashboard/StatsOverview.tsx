import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StatsOverview() {
  const stats = [
    { title: "Total Simulations", value: "1,234", change: "+12%" },
    { title: "Active Personas", value: "56", change: "+8%" },
    { title: "Insights Generated", value: "2,890", change: "+23%" },
    { title: "Success Rate", value: "94.2%", change: "+2.1%" },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-green-600">{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
