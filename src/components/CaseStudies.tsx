import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ShoppingCart, Car, Presentation, Coffee } from "lucide-react"

const CaseStudies = () => {
  const cases = [
    {
      icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
      industry: "E-commerce",
      title: "Premium Coffee Brand Launch",
      description:
        "Simulated customer journey through online purchasing decisions for artisanal coffee subscription service.",
      insights: "Discovered emotional triggers around sustainability messaging increased purchase intent by 40%",
      persona: "The Mindful Consumer",
      badge: "CPG",
    },
    {
      icon: <Car className="h-6 w-6 text-teal-600" />,
      industry: "Automotive",
      title: "EV Adoption Barriers",
      description:
        "Deep-dive simulation of family car-buying process exploring electric vehicle hesitations and motivations.",
      insights: "Identified charging anxiety as primary concern, leading to targeted infrastructure messaging",
      persona: "The Practical Parent",
      badge: "Automotive",
    },
    {
      icon: <Presentation className="h-6 w-6 text-purple-600" />,
      industry: "SaaS",
      title: "Enterprise Software Demo",
      description:
        "Simulated C-suite executive evaluating project management platform during high-stakes presentation.",
      insights: "Revealed decision-makers prioritize integration capabilities over feature complexity",
      persona: "The Strategic Executive",
      badge: "Enterprise",
    },
    {
      icon: <Coffee className="h-6 w-6 text-orange-600" />,
      industry: "Retail",
      title: "Supermarket Aisle Optimization",
      description: "Traced shopper's internal dialogue navigating health food section with competing brand messages.",
      insights: "Found placement near organic produce increased perceived healthiness by 60%",
      persona: "The Health-Conscious Shopper",
      badge: "Retail",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Real-World Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how leading brands use Simulacrum to uncover deep consumer insights and drive meaningful business
            outcomes across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((study, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:scale-110 transition-transform">
                      {study.icon}
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-1">
                        {study.badge}
                      </Badge>
                      <CardTitle className="text-lg">{study.title}</CardTitle>
                    </div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Key Insight</h4>
                  <p className="text-blue-800 text-sm">{study.insights}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Persona: {study.persona}</span>
                  <span className="text-sm font-medium text-blue-600">View Full Case →</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
