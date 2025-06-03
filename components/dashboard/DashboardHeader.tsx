import { Button } from "../ui/button"

const DashboardHeader = () => {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          Help
        </Button>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </header>
  )
}

export default DashboardHeader
