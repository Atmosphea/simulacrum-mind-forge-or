import { Card, CardContent } from "@/components/ui/card"
import { Brain, Users, BarChart3, Zap, Eye, MessageCircle } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Driven Simulations",
      description: "Advanced LLM integration creates realistic internal monologues and decision-making processes",
    },
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: "Hyper-Specific Personas",
      description: "Curated dataset enables incredibly detailed and nuanced consumer personality simulations",
    },
    {
      icon: <Eye className="h-8 w-8 text-purple-600" />,
      title: "Immersive Experience",
      description: "Dynamic thought streams with emotional cadence markers create engaging research sessions",
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-orange-600" />,
      title: "Real-Time Collaboration",
      description: "Team notes panel allows multiple researchers to capture insights simultaneously",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Actionable Analytics",
      description: "AI-powered analysis identifies pain points, purchase intent, and optimization opportunities",
    },
    {
      icon: <Zap className="h-8 w-8 text-red-600" />,
      title: "Rapid Iteration",
      description: "Test multiple scenarios and personas to find optimal market positioning quickly",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-teal-900 bg-clip-text text-transparent">
              Powered by Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with deep consumer psychology expertise to deliver
            unprecedented market research capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white"
            >
              <CardContent className="p-8">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
