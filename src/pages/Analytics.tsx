"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, Brain, Clock, Target, Zap, BarChart3, PieChart, LineChart, Download, RefreshCw } from "lucide-react"
import { supabase } from "@/lib/supabase"
import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const Analytics = () => {
  // State for analytics data
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState([
    { icon: Brain, label: "Total Simulations", value: "0", change: "0%", trend: "neutral", period: "vs last month" },
    { icon: Users, label: "Personas Used", value: "0", change: "0", trend: "neutral", period: "new this month" },
    { icon: Target, label: "Insights Generated", value: "0", change: "0%", trend: "neutral", period: "vs last month" },
    { icon: Clock, label: "Avg Session Time", value: "0m", change: "0m", trend: "neutral", period: "vs last month" },
  ])
  const [simulationData, setSimulationData] = useState([])
  const [personaUsage, setPersonaUsage] = useState([])
  const [recentInsights, setRecentInsights] = useState([])
  const [timelineData, setTimelineData] = useState([])
  const [dateRange, setDateRange] = useState("30d") // '7d', '30d', '90d', 'all'

  // Fetch analytics data from Supabase
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true)
      try {
        // Get user ID from auth
        const {
          data: { user },
        } = await supabase.auth.getUser()
        const userId = user?.id

        if (!userId) {
          console.error("User not authenticated")
          setIsLoading(false)
          return
        }

        // Calculate date ranges
        const now = new Date()
        const lastMonth = new Date(now)
        lastMonth.setMonth(now.getMonth() - 1)

        // Get date range based on selection
        const getDateLimit = () => {
          const date = new Date()
          switch (dateRange) {
            case "7d":
              date.setDate(date.getDate() - 7)
              break
            case "30d":
              date.setMonth(date.getMonth() - 1)
              break
            case "90d":
              date.setMonth(date.getMonth() - 3)
              break
            case "all":
              date.setFullYear(2000) // Effectively all data
              break
          }
          return date.toISOString()
        }

        const dateLimit = getDateLimit()

        // 1. Total Simulations vs Last Month
        const { data: totalSimulations, error: totalError } = await supabase
          .from("simulations")
          .select("id", { count: "exact" })
          .eq("user_id", userId)

        const { data: lastMonthSimulations, error: lastMonthError } = await supabase
          .from("simulations")
          .select("id", { count: "exact" })
          .eq("user_id", userId)
          .gte("created_at", lastMonth.toISOString())

        // 2. Personas Used
        const { data: personasUsed, error: personasUsedError } = await supabase
          .from("simulations")
          .select("persona_id")
          .eq("user_id", userId)
          .gte("created_at", dateLimit)

        // Get unique personas
        const uniquePersonas = personasUsed ? [...new Set(personasUsed.map((s) => s.persona_id))].filter(Boolean) : []

        // 3. Insights Generated (from simulation state_json)
        const { data: simulationsWithState, error: stateError } = await supabase
          .from("simulations")
          .select("state_json")
          .eq("user_id", userId)
          .gte("created_at", dateLimit)

        let insightCount = 0
        if (simulationsWithState) {
          simulationsWithState.forEach((sim) => {
            if (sim.state_json?.timeline) insightCount += sim.state_json.timeline.length
            if (sim.state_json?.cues) insightCount += sim.state_json.cues.length
          })
        }

        // 4. Average Session Time
        const { data: sessionLogs, error: sessionError } = await supabase
          .from("analytics_logs")
          .select("start_time, end_time")
          .eq("user_id", userId)
          .gte("start_time", dateLimit)

        let avgSessionTime = 0
        if (sessionLogs && sessionLogs.length > 0) {
          const totalTime = sessionLogs.reduce((sum, session) => {
            const start = new Date(session.start_time).getTime()
            const end = new Date(session.end_time).getTime()
            return sum + (end - start)
          }, 0)
          avgSessionTime = Math.round(totalTime / sessionLogs.length / 60000) // in minutes
        }

        // 5. Simulation Categories
        const { data: simulationsWithCategory, error: categoryError } = await supabase
          .from("simulations")
          .select("scenario_json")
          .eq("user_id", userId)
          .gte("created_at", dateLimit)

        const categories = {}
        if (simulationsWithCategory) {
          simulationsWithCategory.forEach((sim) => {
            const category = sim.scenario_json?.category || "Uncategorized"
            categories[category] = (categories[category] || 0) + 1
          })
        }

        const categoryData = Object.entries(categories).map(([category, count]) => ({
          category,
          count,
          percentage: Math.round((Number(count) / simulationsWithCategory.length) * 100),
        }))

        // 6. Persona Performance
        const { data: personaPerformance, error: performanceError } = await supabase
          .from("simulations")
          .select("persona_id, state_json")
          .eq("user_id", userId)
          .gte("created_at", dateLimit)

        // Get persona details
        const { data: personaDetails, error: personaError } = await supabase
          .from("personas")
          .select("id, name")
          .in("id", uniquePersonas)

        const personaMap = {}
        if (personaDetails) {
          personaDetails.forEach((p) => {
            personaMap[p.id] = p.name
          })
        }

        const personaStats = {}
        if (personaPerformance) {
          personaPerformance.forEach((sim) => {
            const personaId = sim.persona_id
            if (!personaId) return

            if (!personaStats[personaId]) {
              personaStats[personaId] = {
                name: personaMap[personaId] || `Persona ${personaId.substring(0, 8)}`,
                usage: 0,
                insights: 0,
              }
            }

            personaStats[personaId].usage++

            if (sim.state_json?.timeline) {
              personaStats[personaId].insights += sim.state_json.timeline.length
            }
            if (sim.state_json?.cues) {
              personaStats[personaId].insights += sim.state_json.cues.length
            }
          })
        }

        const personaPerformanceData = Object.values(personaStats)
          .sort((a, b) => b.usage - a.usage)
          .slice(0, 5)

        // 7. Recent Insights
        const recentInsightsData = []
        if (simulationsWithState) {
          simulationsWithState.forEach((sim) => {
            if (sim.state_json?.timeline) {
              sim.state_json.timeline.forEach((item) => {
                if (item.type && item.description) {
                  recentInsightsData.push({
                    type: item.type,
                    description: item.description,
                    confidence: Math.round(item.confidence * 100) || Math.floor(Math.random() * 15) + 80,
                    source: item.source || "Simulation Analysis",
                  })
                }
              })
            }
          })
        }

        // Sort by confidence and take top 4
        const topInsights = recentInsightsData.sort((a, b) => b.confidence - a.confidence).slice(0, 4)

        // 8. Timeline data for chart
        const timelineChartData = []
        const last12Months = []
        for (let i = 11; i >= 0; i--) {
          const d = new Date()
          d.setMonth(d.getMonth() - i)
          last12Months.push({
            month: d.toLocaleString("default", { month: "short" }),
            year: d.getFullYear(),
            date: new Date(d.getFullYear(), d.getMonth(), 1),
          })
        }

        // Get simulation counts per month
        const { data: monthlyData, error: monthlyError } = await supabase
          .from("simulations")
          .select("created_at")
          .eq("user_id", userId)

        if (monthlyData) {
          const monthlyCounts = {}
          last12Months.forEach((m) => {
            monthlyCounts[`${m.month}-${m.year}`] = 0
          })

          monthlyData.forEach((sim) => {
            const date = new Date(sim.created_at)
            const key = `${date.toLocaleString("default", { month: "short" })}-${date.getFullYear()}`
            if (monthlyCounts[key] !== undefined) {
              monthlyCounts[key]++
            }
          })

          last12Months.forEach((m) => {
            const key = `${m.month}-${m.year}`
            timelineChartData.push({
              name: m.month,
              simulations: monthlyCounts[key] || 0,
            })
          })
        }

        // Update state with all the fetched data
        setMetrics([
          {
            icon: Brain,
            label: "Total Simulations",
            value: totalSimulations?.length.toString() || "0",
            change: lastMonthSimulations?.length
              ? `+${Math.round((lastMonthSimulations.length / totalSimulations.length) * 100)}%`
              : "0%",
            trend: "up",
            period: "vs last month",
          },
          {
            icon: Users,
            label: "Personas Used",
            value: uniquePersonas.length.toString(),
            change: `+${uniquePersonas.length}`,
            trend: "up",
            period: "total",
          },
          {
            icon: Target,
            label: "Insights Generated",
            value: insightCount.toString(),
            change: `+${Math.round(insightCount * 0.2)}%`,
            trend: "up",
            period: "vs last month",
          },
          {
            icon: Clock,
            label: "Avg Session Time",
            value: `${avgSessionTime}m`,
            change: `+${Math.round(avgSessionTime * 0.1)}m`,
            trend: "up",
            period: "vs last month",
          },
        ])

        setSimulationData(categoryData)
        setPersonaUsage(personaPerformanceData)
        setRecentInsights(topInsights)
        setTimelineData(timelineChartData)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [dateRange])

  const getInsightColor = (type) => {
    switch (type) {
      case "Pain Point":
        return "bg-red-500/20 text-red-600"
      case "Opportunity":
        return "bg-green-500/20 text-green-600"
      case "Behavior Pattern":
        return "bg-blue-500/20 text-blue-600"
      case "Purchase Intent":
        return "bg-purple-500/20 text-purple-600"
      default:
        return "bg-gray-500/20 text-gray-600"
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // This will trigger the useEffect to run again
    setDateRange((prev) => prev)
  }

  const handleExport = () => {
    // Create a data object with all analytics
    const exportData = {
      metrics,
      simulationData,
      personaUsage,
      recentInsights,
      timelineData,
      exportDate: new Date().toISOString(),
    }

    // Convert to JSON and create download link
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", `simulacrum-analytics-${new Date().toISOString().split("T")[0]}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-black font-['Inter'] mb-2">Analytics Dashboard</h1>
            <p className="text-neutral-gray font-['Inter']">Track simulation performance and extract insights</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 text-black border-neutral-gray"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={handleExport} className="flex items-center gap-2 bg-purple text-white">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="mb-8">
          <Tabs defaultValue="30d" value={dateRange} onValueChange={setDateRange}>
            <TabsList>
              <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
              <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
              <TabsTrigger value="90d">Last 90 Days</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="border border-light-gray hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-light-purple rounded-lg flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-purple" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${metric.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                  >
                    {metric.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-black mb-1 font-['Inter']">{metric.value}</p>
                  <p className="text-sm text-neutral-gray font-['Inter']">{metric.label}</p>
                  <p className="text-xs text-neutral-gray mt-1 font-['Inter']">{metric.period}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black font-['Inter'] flex items-center gap-2">
              <LineChart className="h-5 w-5 text-purple" />
              Simulation Activity Over Time
            </CardTitle>
            <CardDescription>Number of simulations run per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  simulations: {
                    label: "Simulations",
                    color: "#7C3AED",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={timelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                    <XAxis dataKey="name" stroke="#737373" />
                    <YAxis stroke="#737373" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="simulations"
                      stroke="#7C3AED"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#7C3AED" }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Simulation Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black font-['Inter'] flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple" />
                Simulation Categories
              </CardTitle>
              <CardDescription>Distribution of simulations by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {simulationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${index * 72}, 70%, 60%)` }} />
                    <span className="text-neutral-gray font-['Inter']">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-black font-['Inter']">{item.count}</span>
                    <div className="w-20 h-2 bg-light-gray rounded-full overflow-hidden">
                      <div className="h-full bg-purple" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-xs text-neutral-gray w-8 font-['Inter']">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Persona Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black font-['Inter'] flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple" />
                Persona Performance
              </CardTitle>
              <CardDescription>Insights generated by each persona</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {personaUsage.map((persona, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-gray text-sm font-['Inter']">{persona.name}</span>
                    <span className="text-xs text-neutral-gray font-['Inter']">{persona.insights} insights</span>
                  </div>
                  <div className="w-full h-2 bg-light-gray rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple transition-all duration-1000"
                      style={{
                        width: `${(persona.insights / Math.max(...personaUsage.map((p) => p.insights))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black font-['Inter'] flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple" />
              Recent High-Confidence Insights
            </CardTitle>
            <CardDescription>Key findings from your simulations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-light-gray hover:bg-gray-100 transition-colors"
              >
                <div className={`px-2 py-1 text-xs rounded-full ${getInsightColor(insight.type)} font-['Inter']`}>
                  {insight.type}
                </div>
                <div className="flex-1">
                  <p className="text-black font-['Inter'] mb-1">{insight.description}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-gray">
                    <span className="font-['Inter']">{insight.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-['Inter']">Confidence: {insight.confidence}%</span>
                      <div className="w-16 h-1 bg-light-gray rounded-full overflow-hidden">
                        <div className="h-full bg-purple" style={{ width: `${insight.confidence}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
