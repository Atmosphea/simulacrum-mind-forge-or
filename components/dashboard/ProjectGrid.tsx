import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

const ProjectGrid = () => {
  const projects = [
    {
      id: 1,
      name: "E-commerce User Journey",
      description: "Analyzing customer behavior in online shopping experiences",
      personas: 3,
      simulations: 12,
      lastUpdated: "2 days ago",
      status: "active",
    },
    {
      id: 2,
      name: "Mobile App Onboarding",
      description: "Testing user reactions to different onboarding flows",
      personas: 5,
      simulations: 8,
      lastUpdated: "1 week ago",
      status: "completed",
    },
    {
      id: 3,
      name: "Product Pricing Strategy",
      description: "Evaluating customer responses to pricing models",
      personas: 4,
      simulations: 6,
      lastUpdated: "3 days ago",
      status: "draft",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{project.name}</CardTitle>
              <Badge>{project.status}</Badge>
            </div>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Personas</p>
                <p className="font-medium">{project.personas}</p>
              </div>
              <div>
                <p className="text-gray-500">Simulations</p>
                <p className="font-medium">{project.simulations}</p>
              </div>
              <div>
                <p className="text-gray-500">Updated</p>
                <p className="font-medium">{project.lastUpdated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ProjectGrid
