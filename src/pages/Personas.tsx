import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Search, Filter, User, Brain, Heart, Star, Eye, Plus } from 'lucide-react';

const Personas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const personas = [
    {
      id: 1,
      name: 'The Tech-Savvy Parent',
      description: 'Busy professional seeking efficient, family-friendly solutions',
      category: 'Consumer',
      avatar: '👨‍💻',
      traits: ['Efficiency-focused', 'Value-conscious', 'Tech-forward'],
      motivators: ['Time-saving', 'Family safety', 'Quality'],
      riskTolerance: 'Medium',
      decisionStyle: 'Research-heavy',
      usageCount: 12
    },
    {
      id: 2,
      name: 'The Eco-Conscious Millennial',
      description: 'Environmentally aware consumer prioritizing sustainability',
      category: 'Lifestyle',
      avatar: '🌱',
      traits: ['Environmentally conscious', 'Brand loyal', 'Social-minded'],
      motivators: ['Sustainability', 'Brand values', 'Community impact'],
      riskTolerance: 'Low',
      decisionStyle: 'Values-driven',
      usageCount: 8
    },
    {
      id: 3,
      name: 'The Senior Digital Adopter',
      description: 'Older adult embracing technology with careful consideration',
      category: 'Demographics',
      avatar: '👵',
      traits: ['Cautious', 'Detail-oriented', 'Relationship-focused'],
      motivators: ['Security', 'Simplicity', 'Human connection'],
      riskTolerance: 'Very Low',
      decisionStyle: 'Consultation-based',
      usageCount: 15
    },
    {
      id: 4,
      name: 'The High-Stakes Executive',
      description: 'C-level decision maker balancing innovation and risk',
      category: 'Business',
      avatar: '💼',
      traits: ['Strategic', 'Time-constrained', 'ROI-focused'],
      motivators: ['Efficiency', 'Competitive advantage', 'Results'],
      riskTolerance: 'High',
      decisionStyle: 'Data-driven',
      usageCount: 6
    },
    {
      id: 5,
      name: 'The Creative Entrepreneur',
      description: 'Independent creator building their brand and business',
      category: 'Professional',
      avatar: '🎨',
      traits: ['Creative', 'Independent', 'Budget-conscious'],
      motivators: ['Self-expression', 'Growth', 'Authenticity'],
      riskTolerance: 'Medium-High',
      decisionStyle: 'Intuition-guided',
      usageCount: 9
    }
  ];

  const categories = ['all', 'Consumer', 'Lifestyle', 'Demographics', 'Business', 'Professional'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low': return 'bg-red-500/20 text-red-300';
      case 'Low': return 'bg-orange-500/20 text-orange-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'Medium-High': return 'bg-lime-500/20 text-lime-300';
      case 'High': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const filteredPersonas = personas.filter(persona => {
    const matchesSearch = persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         persona.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || persona.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Persona Insights
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Human Behavior
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Decision Patterns
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-prismatic font-['Sora'] mb-2">Persona Library</h1>
          <p className="text-teal-700 font-['Inter']">Explore and select personas for your simulations</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal-600" />
              <input
                type="text"
                placeholder="Search personas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-card text-teal-700 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 font-['Inter']"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-teal-600" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize font-['Inter'] ${
                    selectedCategory === category 
                      ? 'gradient-cta text-white' 
                      : 'text-teal-700 border-teal-300 hover:bg-teal-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonas.map((persona) => (
            <Card key={persona.id} className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-2xl">
                    {persona.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white font-['Sora'] mb-1">{persona.name}</h3>
                    <p className="text-sm text-teal-600 font-['Inter']">{persona.description}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-white/10 text-teal-300 rounded-full mt-2 font-['Inter']">
                      {persona.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Traits */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 font-['Sora']">Key Traits</h4>
                  <div className="flex flex-wrap gap-1">
                    {persona.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full font-['Inter']"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Motivators */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 font-['Sora']">Primary Motivators</h4>
                  <div className="flex flex-wrap gap-1">
                    {persona.motivators.map((motivator, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded-full font-['Inter']"
                      >
                        {motivator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decision Profile */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-teal-500 font-['Inter']">Risk Tolerance</span>
                    <span className={`block px-2 py-1 rounded text-center mt-1 ${getRiskColor(persona.riskTolerance)} font-['Inter']`}>
                      {persona.riskTolerance}
                    </span>
                  </div>
                  <div>
                    <span className="text-teal-500 font-['Inter']">Decision Style</span>
                    <span className="block px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-center mt-1 font-['Inter']">
                      {persona.decisionStyle}
                    </span>
                  </div>
                </div>

                {/* Usage Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1 text-xs text-teal-500 font-['Inter']">
                    <Star className="h-3 w-3" />
                    <span>Used {persona.usageCount} times</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:text-white hover:bg-white/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="gradient-cta text-white font-['Inter']">
                      Select
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create New Persona Button */}
        <div className="fixed bottom-8 right-8">
          <Button className="gradient-cta text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Personas;
