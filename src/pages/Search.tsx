import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, Filter, Calendar, Users, Brain, BarChart3, Tag, Clock } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchType, setSearchType] = useState('all');

  const searchResults = [
    {
      type: 'project',
      title: 'E-commerce Checkout Flow Analysis',
      description: 'Detailed analysis of user friction points in the checkout process for mobile e-commerce',
      tags: ['E-commerce', 'Mobile UX', 'Conversion'],
      date: '2024-01-15',
      insights: 12,
      personas: 3,
      relevance: 95
    },
    {
      type: 'persona',
      title: 'The Tech-Savvy Parent',
      description: 'Busy professional parent who values efficiency and family-friendly technology solutions',
      tags: ['Consumer', 'Family', 'Technology'],
      date: '2024-01-10',
      usageCount: 8,
      relevance: 88
    },
    {
      type: 'insight',
      title: 'Mobile checkout abandonment patterns',
      description: 'Users abandon checkout 73% more frequently when forms exceed 3 steps on mobile devices',
      tags: ['Behavior Pattern', 'Mobile', 'Conversion'],
      date: '2024-01-18',
      confidence: 92,
      project: 'E-commerce Checkout Analysis',
      relevance: 91
    },
    {
      type: 'simulation',
      title: 'CPG Product Launch - Consumer Response',
      description: 'Simulation of consumer decision-making process for new beverage product launch',
      tags: ['CPG', 'Product Launch', 'Consumer Behavior'],
      date: '2024-01-20',
      duration: '24m',
      insights: 8,
      relevance: 85
    },
    {
      type: 'note',
      title: 'Price sensitivity observations',
      description: 'Key findings about price anchoring effects in premium product categories during user research',
      tags: ['Pricing', 'Psychology', 'Premium Products'],
      date: '2024-01-12',
      project: 'Luxury Brand Analysis',
      relevance: 78
    }
  ];

  const filterOptions = [
    { label: 'Projects', value: 'project', icon: Brain },
    { label: 'Personas', value: 'persona', icon: Users },
    { label: 'Insights', value: 'insight', icon: BarChart3 },
    { label: 'Simulations', value: 'simulation', icon: Clock },
    { label: 'Notes', value: 'note', icon: Tag }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-500/20 text-blue-300';
      case 'persona': return 'bg-purple-500/20 text-purple-300';
      case 'insight': return 'bg-emerald-500/20 text-emerald-300';
      case 'simulation': return 'bg-cyan-500/20 text-cyan-300';
      case 'note': return 'bg-orange-500/20 text-orange-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return Brain;
      case 'persona': return Users;
      case 'insight': return BarChart3;
      case 'simulation': return Clock;
      case 'note': return Tag;
      default: return SearchIcon;
    }
  };

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = searchQuery === '' || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = searchType === 'all' || result.type === searchType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Knowledge Discovery
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Research Insights
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Connected Data
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-prismatic font-['Sora'] mb-2">Universal Search</h1>
          <p className="text-teal-700 font-['Inter']">Find projects, personas, insights, and notes across your research</p>
        </div>

        {/* Search Bar */}
        <div className="glass-card p-6 mb-8">
          <div className="relative mb-4">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-600" />
            <input
              type="text"
              placeholder="Search across all your research data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg glass-card text-teal-700 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 font-['Inter']"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={searchType === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchType('all')}
              className={`font-['Inter'] ${
                searchType === 'all' 
                  ? 'gradient-cta text-white' 
                  : 'text-teal-700 border-teal-300 hover:bg-teal-50'
              }`}
            >
              All Results
            </Button>
            {filterOptions.map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.value}
                  variant={searchType === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSearchType(filter.value)}
                  className={`font-['Inter'] ${
                    searchType === filter.value 
                      ? 'gradient-cta text-white' 
                      : 'text-teal-700 border-teal-300 hover:bg-teal-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-teal-600 font-['Inter']">
              {filteredResults.length} results found
            </p>
            <div className="flex items-center gap-2 text-sm text-teal-500">
              <span className="font-['Inter']">Sort by:</span>
              <Button variant="ghost" size="sm" className="text-teal-600 hover:text-white hover:bg-white/10 font-['Inter']">
                Relevance
              </Button>
              <Button variant="ghost" size="sm" className="text-teal-600 hover:text-white hover:bg-white/10 font-['Inter']">
                Date
              </Button>
            </div>
          </div>

          {filteredResults.map((result, index) => {
            const Icon = getTypeIcon(result.type);
            return (
              <Card key={index} className="glass-card hover:scale-102 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white font-['Sora'] mb-1">{result.title}</h3>
                          <p className="text-teal-600 font-['Inter'] mb-2">{result.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(result.type)} font-['Inter']`}>
                            {result.type}
                          </span>
                          <span className="text-xs text-teal-500 font-['Inter']">
                            {result.relevance}% match
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {result.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs bg-white/10 text-teal-300 rounded-full font-['Inter']"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-teal-500">
                        <div className="flex items-center gap-4 font-['Inter']">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{result.date}</span>
                          </div>
                          {result.insights && (
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              <span>{result.insights} insights</span>
                            </div>
                          )}
                          {result.personas && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{result.personas} personas</span>
                            </div>
                          )}
                          {result.usageCount && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Used {result.usageCount} times</span>
                            </div>
                          )}
                          {result.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{result.duration}</span>
                            </div>
                          )}
                          {result.confidence && (
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              <span>{result.confidence}% confidence</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="micro-viz" style={{ width: `${result.relevance}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
