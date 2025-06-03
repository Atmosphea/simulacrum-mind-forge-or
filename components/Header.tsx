import { Button } from "./ui/button"

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white border-b">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Simulacrum Mind Forge</h1>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-sm font-medium">
          Features
        </a>
        <a href="#" className="text-sm font-medium">
          Pricing
        </a>
        <a href="#" className="text-sm font-medium">
          Documentation
        </a>
        <a href="#" className="text-sm font-medium">
          About
        </a>
      </nav>
      <div className="flex items-center space-x-4">
        <Button variant="outline">Sign In</Button>
        <Button>Get Started</Button>
      </div>
    </header>
  )
}

export default Header
