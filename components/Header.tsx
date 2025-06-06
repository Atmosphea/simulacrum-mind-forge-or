import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-purple-600">Simulacrum</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-purple-600">
            Features
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-purple-600">
            Pricing
          </a>
          <a href="#about" className="text-gray-600 hover:text-purple-600">
            About
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  )
}
