import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "E-commerce Optimization",
      company: "RetailCorp",
      result: "35% increase in conversion rates",
      description: "Used persona simulations to optimize checkout flow and product recommendations.",
    },
    {
      title: "App User Experience",
      company: "TechStart",
      result: "50% reduction in user churn",
      description: "Simulated user journeys to identify friction points and improve onboarding.",
    },
    {
      title: "Marketing Campaign",
      company: "BrandCo",
      result: "40% better targeting accuracy",
      description: "Created detailed personas to predict campaign effectiveness across demographics.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how companies are using Simulacrum to drive results
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{study.title}</CardTitle>
                <p className="text-sm text-purple-600 font-semibold">{study.company}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-green-600">{study.result}</span>
                </div>
                <p className="text-gray-600">{study.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
