import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Search, Filter, Tag, Calendar, Users, BarChart3, Play, Settings, Trash2, Eye } from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Checkout Analysis',
      description: 'Understanding user friction in the checkout process',
      tags: ['E-commerce', 'UX Research', 'Conversion'],
      status: 'completed',
      date: '2024-01-15',
      personas: 3,
      insights: 12,
      duration: '18m'
    },
    {
      id: 2,
      title: 'CPG Product Launch Strategy',
      description: 'Consumer response to new beverage product',
      tags: ['CPG', 'Product Launch', 'Consumer Behavior'],
      status: 'running',
      date: '2024-01-20',
      personas: 2,
      insights: 8,
      duration: '24m'
    },
    {
      id: 3,
      title: 'Banking App Redesign',
      description: 'User experience evaluation for mobile banking',
      tags: ['FinTech', 'Mobile UX', 'Security'],
      status: 'draft',
      date: '2024-01-18',
      personas: 4,
      insights: 0,
      duration: '0m'
    }
  ];

  const filters = ['all', 'completed', 'running', 'draft'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/20 text-emerald-300';
      case 'running': return 'bg-cyan-500/20 text-cyan-300';
      case 'draft': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Project Insights
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Research Flow
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Data Stories
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-prismatic font-['Sora'] mb-2">Research Projects</h1>
          <p className="text-teal-700 font-['Inter']">Manage and track your simulation projects</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal-600" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-card text-teal-700 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 font-['Inter']"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-teal-600" />
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={`capitalize font-['Inter'] ${
                    selectedFilter === filter 
                      ? 'gradient-cta text-white' 
                      : 'text-teal-700 border-teal-300 hover:bg-teal-50'
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="glass-card hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white font-['Sora'] mb-1">{project.title}</h3>
                    <p className="text-sm text-teal-600 font-['Inter']">{project.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} font-['Inter']`}>
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-white/10 text-teal-300 rounded-full font-['Inter']"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-teal-600 mb-4 font-['Inter']">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{project.personas}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      <span>{project.insights}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{project.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="micro-viz mb-4" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-teal-500 font-['Inter']">{project.date}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:text-white hover:bg-white/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:text-white hover:bg-white/10">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-teal-600 hover:text-white hover:bg-white/10">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create New Project Button */}
        <div className="fixed bottom-8 right-8">
          <Button className="gradient-cta text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform">
            <Play className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
