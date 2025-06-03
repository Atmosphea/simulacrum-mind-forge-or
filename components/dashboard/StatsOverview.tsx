import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const StatsOverview = () => {
  const stats = [
    {
      title: "Total Simulations",
      value: "124",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Personas",
      value: "38",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Insights Generated",
      value: "1,284",
      change: "+18%",
      changeType: "positive",
    },
    {
      title: "Avg. Session Time",
      value: "24m",
      change: "-2%",
      changeType: "negative",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default StatsOverview
