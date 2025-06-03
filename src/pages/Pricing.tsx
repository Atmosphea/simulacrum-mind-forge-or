"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import { useState } from "react"

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false)

  const pricingTiers = [
    {
      name: "Explorer",
      price: "39",
      description:
        "Powerful simulation features to explore internal monologues & begin to understand consumer decision-making.",
      cta: "Begin Free 7-Day Simulation",
      features: [
        "1 user seat",
        "1 Custom Persona Slot + Access to all Premade Personas",
        "Access to core Simulation Chamber",
        "Basic Scenario Input & 'Rich Impulsive Data' integration",
        "Simulation export & basic analytics",
        "Access to Simulacrum browser extension for context capture (Roadmap)",
      ],
    },
    {
      name: "Voyager",
      price: "59",
      description:
        "Advanced simulation tools to craft diverse scenarios, collaborate on insight discovery, and analyze varied audience segments.",
      cta: "Begin Free 7-Day Simulation",
      baseTier: "Everything in Explorer, plus:",
      features: [
        "Includes 1 seat, add up to 5",
        "3 Custom Persona Slots + Full Premade Library",
        "10 Uploaded Knowledge Assets (Product info, marketing copy, images)",
        "3 Insight 'Arenas' Analyses per month (A/B testing reports)",
        "Collaboration & user management features (shared notes, projects)",
        "Optional on-the-fly image generation integration (Beta, when available)",
      ],
    },
    {
      name: "Architect",
      price: "Custom",
      description:
        "Personalized experiential AI features with enhanced control, security, team onboarding & dedicated strategic support for transformative insights.",
      cta: "Contact Sales for Consultation",
      baseTier: "Everything in Voyager, plus:",
      features: [
        "Custom Persona Builder (No-code interface)",
        "Unlimited multi-modal knowledge asset uploads",
        "Unlimited Insight 'Arenas' & A/B testing",
        "Custom Simulation Workflows and Applications (e.g., 'Shark Tank' trainer)*",
        "Advanced group & document collaboration",
        "Customizable Persona Trait Guides with in-depth exploration",
        "Enterprise-grade security, governance, & compliance (SOC2 pending)",
        "Advanced admin controls",
        "API access (Roadmap)*",
        "Dedicated Insight Strategist & premium support team",
        "Deploy custom simulations to company workspace",
        "Secure and flexible deployment options (Cloud/On-premise - future)",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-purple-400">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-purple-600 text-xl font-bold">S</span>
          </div>
          <span className="text-2xl font-bold text-white">Simulacrum</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white/90 hover:text-white">
            Company
          </a>
          <a href="#" className="text-white/90 hover:text-white">
            Pricing
          </a>
          <a href="#" className="text-white/90 hover:text-white">
            Log In
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
            Begin Free Simulation
          </Button>
          <Button className="bg-white text-purple-600 hover:bg-gray-100">Request a Demo</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Experiential AI Designed for Your Deepest Insights</h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto text-white/90">
          Simulacrum's plans & pricing are structured to support your journey into understanding as your needs evolve.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`${!isYearly ? "text-white" : "text-white/70"}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-16 h-8 bg-white/20 rounded-full p-1 transition-colors"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition-transform ${
                isYearly ? "translate-x-8" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`${isYearly ? "text-white" : "text-white/70"}`}>Yearly</span>
          {isYearly && <Badge className="bg-white text-purple-600 ml-2">Save ~20%</Badge>}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card key={tier.name} className="bg-white text-gray-900 relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold mb-2">{tier.name}</CardTitle>
                <div className="mb-4">
                  {tier.price === "Custom" ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold">Custom</span>
                      <span className="text-sm text-gray-600">pricing</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-sm">$</span>
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-sm text-gray-600">month/seat</span>
                    </div>
                  )}
                </div>
                <CardDescription className="text-base">{tier.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button
                  className={`w-full mb-6 ${
                    tier.name === "Architect"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  variant={tier.name === "Architect" ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>

                <div className="text-left">
                  {tier.baseTier && <p className="text-sm font-medium text-gray-700 mb-3">{tier.baseTier}</p>}
                  {!tier.baseTier && <p className="text-sm font-medium text-gray-700 mb-3">Plan includes:</p>}

                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Empathy-First Foundation: Secure, Ethical, Profound Insights</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8">
            Our enterprise-grade security, unique data architecture, and LLM-agnostic approach prioritize your data
            protection & privacy while delivering unparalleled depth in simulated human experience.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">Explore Trust & Methodology</Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We're here to help with any questions you have about Simulacrum plans, pricing, and supported features for
              unlocking deep human insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Simulacrum Basics</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Why should I choose Simulacrum over other research methods or AI tools?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    What exactly is Simulacrum and how does it simulate human experience?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    How much does Simulacrum cost?
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Billing Questions</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    What's the cancellation policy?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Do you offer yearly price plans for savings?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Can I upgrade or downgrade my plan at a later time?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Do you offer free trials to experience Simulacrum?
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Product & Data Questions</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Can I use Simulacrum for my client's projects and research?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    What is Simulacrum's Fair Use Policy regarding simulation intensity?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    What does Simulacrum do with my data?
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-xl font-bold mb-4">Have additional questions?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                Help Articles & Knowledge Base
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@simulacrum.ai"
                className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                Contact Customer Support
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#" className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                Request a Personalized Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-purple-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Begin Your Journey into Deep Human Understanding Today</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Begin Free Simulation
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-6 text-lg"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Simulacrum Core
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Simulation Chamber
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Persona Engine
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Insight Synthesis Core
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Arenas Analyzer
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Market Researchers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    UX & Product Teams
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Marketing Strategists
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Innovation Teams
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Learn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Simulacrum Journal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About Simulacrum
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-4 mb-4 md:mb-0">
              <Button className="bg-purple-600 hover:bg-purple-700">Begin Free Simulation</Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Request a Demo
              </Button>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">© 2025 Simulacrum AI, INC.</p>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Data Processing Agreement
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Pricing
