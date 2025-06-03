import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const FAQ = () => {
  const faqCategories = [
    {
      id: "general",
      label: "General",
      questions: [
        {
          question: "What is Simulacrum Mind Forge?",
          answer:
            "Simulacrum Mind Forge is a platform for creating, testing, and analyzing persona simulations to gain insights into user behavior and decision-making processes.",
        },
        {
          question: "How does it work?",
          answer:
            "Our platform uses advanced AI models to simulate how different personas would react in various scenarios, providing insights into user behavior without the need for extensive real-world testing.",
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      questions: [
        {
          question: "What pricing plans are available?",
          answer:
            "We offer flexible pricing plans including Free, Pro, and Enterprise tiers. Each plan includes different features and simulation quotas to meet your needs.",
        },
        {
          question: "Is there a free trial?",
          answer: "Yes, we offer a 14-day free trial of our Pro plan with no credit card required.",
        },
      ],
    },
    {
      id: "technical",
      label: "Technical",
      questions: [
        {
          question: "Can I integrate with my existing tools?",
          answer:
            "Yes, Simulacrum Mind Forge offers API integrations with popular tools like Figma, Qualtrics, and more.",
        },
        {
          question: "What data security measures do you have?",
          answer:
            "We implement enterprise-grade security with end-to-end encryption, regular security audits, and compliance with GDPR and other privacy regulations.",
        },
      ],
    },
  ]

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

        <Tabs defaultValue="general">
          <TabsList className="w-full flex justify-center mb-8">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="space-y-6">
                {category.questions.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default FAQ
