import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Simulate Human Behavior with AI</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Create realistic personas and simulate their interactions with your products, services, and environments to
          gain deep insights into human behavior.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-3">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
