import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "E-commerce Optimization",
      company: "RetailCo",
      description: "Increased conversion rates by 24% by simulating customer journeys and identifying friction points.",
      tags: ["Retail", "UX Design", "Conversion"],
    },
    {
      title: "Product Development",
      company: "TechInnovate",
      description: "Reduced development time by 30% through early persona testing and feature prioritization.",
      tags: ["SaaS", "Product", "Development"],
    },
    {
      title: "Marketing Campaign",
      company: "BrandGrowth",
      description: "Optimized messaging to increase engagement by 45% across target demographics.",
      tags: ["Marketing", "Engagement", "Analytics"],
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
                <CardDescription>{study.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
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
