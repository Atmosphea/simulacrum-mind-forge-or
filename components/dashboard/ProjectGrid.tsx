import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectGrid() {
  const projects = [
    { name: "E-commerce Flow", simulations: 12, status: "Active" },
    { name: "Mobile App UX", simulations: 8, status: "Completed" },
    { name: "Marketing Campaign", simulations: 15, status: "Active" },
    { name: "Product Launch", simulations: 6, status: "Draft" },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{project.simulations} simulations</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs ${
                  project.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : project.status === "Completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {project.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
