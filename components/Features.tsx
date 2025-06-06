import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      title: "AI-Powered Personas",
      description: "Create detailed personas with realistic behaviors, preferences, and decision-making patterns.",
    },
    {
      title: "Simulation Chamber",
      description: "Run interactive simulations to observe how personas interact with your products and services.",
    },
    {
      title: "Behavioral Analytics",
      description: "Get deep insights into user behavior patterns and decision-making processes.",
    },
    {
      title: "Real-time Insights",
      description: "Monitor simulations in real-time and capture key behavioral moments and triggers.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Behavioral Simulation</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to understand and predict human behavior
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
