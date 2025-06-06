import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTA = () => {
  const benefits = [
    "No credit card required",
    "3 free simulations included",
    "Access to all personas",
    "Full analytics dashboard"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your
          <br />
          <span className="bg-gradient-to-r from-blue-200 to-teal-200 bg-clip-text text-transparent">
            Market Research?
          </span>
        </h2>
        
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Join leading brands already using Simulacrum to uncover deep consumer 
          insights and drive meaningful business outcomes.
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-teal-300 flex-shrink-0" />
                <span className="text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
            Schedule Demo
          </Button>
        </div>
        
        <p className="text-blue-200 text-sm mt-8">
          Trusted by 500+ market researchers worldwide
        </p>
      </div>
    </section>
  );
};

export default CTA;
