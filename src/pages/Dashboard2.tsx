import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Heart, Lightbulb, User } from "lucide-react"

const Dashboard2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-purple-50 to-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <span className="text-2xl font-bold text-neutral-800">Simulacrum</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-neutral-700 hover:text-neutral-900">
            Platform
          </a>
          <a href="#" className="text-neutral-700 hover:text-neutral-900">
            Solutions
          </a>
          <a href="#" className="text-neutral-700 hover:text-neutral-900">
            Resources
          </a>
          <a href="#" className="text-neutral-700 hover:text-neutral-900">
            Company
          </a>
          <a href="#" className="text-neutral-700 hover:text-neutral-900">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-neutral-700 hover:text-neutral-900 hidden md:block">
            Log In
          </a>
          <a href="#" className="text-neutral-700 hover:text-neutral-900 hidden md:block">
            Free Trial
          </a>
          <Button className="bg-purple-600 hover:bg-purple-700">Get A Demo</Button>
        </div>
      </header>

      {/* New Feature Banner */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-full shadow-sm py-2 px-4 flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-neutral-100 rounded-full p-1">
              <ArrowRight className="h-4 w-4" />
            </div>
            <span className="font-medium text-sm">New!</span>
          </div>
          <div className="flex-1 text-center text-sm md:text-base">
            Introducing 'Arenas': Instantly identify the optimal and most challenging conditions for your product's
            success, based on deep persona simulation.
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-400" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
          Simulacrum: Experience Your Audience's Reality
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-neutral-700">
          Journey into the heart of consumer decision-making. With Simulacrum, you don't just predict behavior—you live
          it, breathe it, and sculpt your strategies from an unparalleled depth of human understanding.
        </p>
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-neutral-800 hover:bg-neutral-900 text-white px-8 py-6 text-lg">
            Begin Your Free Simulation
          </Button>
          <Button variant="outline" className="border-neutral-300 text-neutral-800 px-8 py-6 text-lg">
            Request a Personalized Demo
          </Button>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-medium text-neutral-700 mb-8">
          Leading Innovators Trust Simulacrum to Illuminate the Path to Customer Empathy
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
          {/* Placeholder logos */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-24 bg-neutral-300 rounded"></div>
          ))}
        </div>
      </section>

      {/* Platform Overview */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">The Simulacrum Platform: Forged for Empathetic Insight</h2>
        <p className="text-lg max-w-4xl mx-auto text-neutral-700 mb-10">
          Simulacrum is the definitive generative AI platform designed to simulate human experience for profound market
          understanding. Built upon a bedrock of expertly curated qualitative data, Simulacrum immerses you in your
          target audience's world, offering intuitive tools and dynamic environments that empower researchers,
          marketers, and strategists to unlock unparalleled insights and accelerate breakthrough innovations.
        </p>
        <Button className="bg-neutral-800 hover:bg-neutral-900 text-white">Discover the Depths</Button>
      </section>

      {/* Core Pillars */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-xl shadow-sm">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Simulation Chamber</h3>
            <p className="text-neutral-700">
              Step into living narratives. Our interactive Simulation Chamber allows you to witness and influence
              unfolding user stories, observe internal monologues, and test hypotheses in real-time dynamic
              environments.
            </p>
          </div>

          <div className="p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Persona Engine</h3>
            <p className="text-neutral-700">
              Master the art of understanding. Utilize meticulously crafted Premade Personas or build your own with our
              intuitive Persona Builder, defining every nuance from core values to fleeting impulses.
            </p>
          </div>

          <div className="p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Insight Synthesis Core</h3>
            <p className="text-neutral-700">
              Transform raw experience into actionable intelligence. Our proprietary Insight Synthesis Core, built on
              expertly curated 'rich impulsive data' and evolving via RAG, analyzes simulated experiences to highlight
              pain points, motivations, and optimal 'Arenas' for success.
            </p>
          </div>

          <div className="p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Empathy-First Foundation</h3>
            <p className="text-neutral-700">
              Security and ethical considerations are paramount. Our unique approach, grounded in human-expert data,
              ensures authentic and insightful simulations, allowing you to focus on understanding—not on questioning
              the source.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions by Role */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Empowering Every Innovator</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              role: "Market Researchers",
              description:
                "Move beyond static reports. Experience consumer journeys firsthand, validate hypotheses through immersive simulation, and unearth the 'why' behind the data with unprecedented depth.",
            },
            {
              role: "UX Designers & Product Teams",
              description:
                "Walk in your users' shoes. Generate hyper-realistic user stories, test product concepts and image reception in simulated contexts, and iterate designs based on genuine, predicted human responses.",
            },
            {
              role: "Marketing & Brand Strategists",
              description:
                "Craft messages that resonate at a core level. Understand the internal monologue of your target audience, identify their deepest pain points, and socially engineer needs by speaking directly to their true motivations.",
            },
            {
              role: "Sales & Presentation Coaches",
              description:
                "Prepare for high-stakes interactions. Simulate challenging 'shark tank' pitches, difficult client negotiations, or sales encounters to refine messaging and build confident delivery.",
            },
            {
              role: "Innovation & R&D Teams",
              description:
                "Rapidly explore the human element of new ideas. Test the intuitive appeal and potential adoption barriers of nascent concepts by simulating how different personas might perceive and interact with them.",
            },
          ].map((item, index) => (
            <div key={index} className="p-6 border border-neutral-200 rounded-xl">
              <h3 className="text-xl font-bold mb-3">{item.role}</h3>
              <p className="text-neutral-700 mb-4">{item.description}</p>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                Solutions for {item.role.split(" ")[0]}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Step into Your Audience's World with Simulacrum Today</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button className="bg-neutral-800 hover:bg-neutral-900 text-white px-8 py-6 text-lg">
            Begin Your Free Simulation
          </Button>
          <Button variant="outline" className="border-neutral-300 text-neutral-800 px-8 py-6 text-lg">
            Request a Personalized Demo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                {[
                  "Simulation Chamber",
                  "Persona Engine",
                  "Scenario Input Suite",
                  "A/B Testing & Arenas Analyzer",
                  "Insight Synthesis Core",
                  "RAG Architecture",
                  "Browser Extension (Roadmap)",
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Solutions</h3>
              <ul className="space-y-2">
                {[
                  "Market Researchers",
                  "UX & Product Teams",
                  "Marketing Strategists",
                  "Sales & Presentation Coaches",
                  "Innovation Teams",
                  "Use Case Library",
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {[
                  "Learn",
                  "Blog/Journal",
                  "Events",
                  "Success Stories",
                  "Prompting Guides",
                  "The Science of Simulation Report",
                ].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Ethical AI Framework", "Contact Support", "Help Center", "FAQs"].map(
                  (item, i) => (
                    <li key={i}>
                      <a href="#" className="text-neutral-600 hover:text-neutral-900">
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Data Processing Agreement"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-neutral-600 hover:text-neutral-900">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-neutral-600">© 2025 Simulacrum AI, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard2
