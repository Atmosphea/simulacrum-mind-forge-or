import { Button } from "./ui/button"

const Hero = () => {
  return (
    <section className="py-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Simulacrum Mind Forge</h1>
      <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600">
        Create, test, and analyze persona simulations to gain insights into user behavior and decision-making.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>
    </section>
  )
}

export default Hero
