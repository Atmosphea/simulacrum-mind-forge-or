import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your simulation overview.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Export Data</Button>
          <Button>New Simulation</Button>
        </div>
      </div>
    </header>
  )
}
