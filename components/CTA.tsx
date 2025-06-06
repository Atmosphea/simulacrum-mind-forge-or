import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 bg-purple-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Understand Your Users Better?</h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Start simulating human behavior today and unlock insights that drive real business results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-white text-purple-600 hover:bg-gray-100">
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
