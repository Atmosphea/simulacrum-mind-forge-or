import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import CaseStudies from "@/components/CaseStudies"
import CTA from "@/components/CTA"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <CaseStudies />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
