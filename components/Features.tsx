import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const Features = () => {
  const features = [
    {
      title: "Persona Builder",
      description: "Create detailed personas with customizable traits, values, and behavioral patterns.",
    },
    {
      title: "Simulation Chamber",
      description: "Run interactive simulations to see how personas respond to different scenarios.",
    },
    {
      title: "Arena Analyzer",
      description: "Compare different scenarios and identify optimal conditions for desired outcomes.",
    },
    {
      title: "Knowledge Asset Upload",
      description: "Import your existing data to provide context for more accurate simulations.",
    },
  ]

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
