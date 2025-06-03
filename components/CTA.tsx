import { Button } from "./ui/button"

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-primary text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your understanding of user behavior?</h2>
        <p className="text-xl mb-10 opacity-90">
          Join thousands of companies using Simulacrum Mind Forge to build better products and experiences.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent">
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA
