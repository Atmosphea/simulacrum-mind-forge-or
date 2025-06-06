import React from 'react';
import { MoreHorizontal, Play, Users, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectGrid = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Checkout Flow',
      description: 'Understanding user friction points during the checkout process for luxury fashion brands.',
      status: 'active',
      personas: 4,
      simulations: 12,
      lastActivity: '2 hours ago',
      progress: 75,
      gradient: 'from-cyan-400 to-blue-500',
      starred: true
    },
    {
      id: 2,
      title: 'CPG Product Launch',
      description: 'Consumer response analysis for new organic snack line targeting health-conscious millennials.',
      status: 'completed',
      personas: 6,
      simulations: 8,
      lastActivity: '1 day ago',
      progress: 100,
      gradient: 'from-purple-400 to-pink-500',
      starred: false
    },
    {
      id: 3,
      title: 'Automotive UX Research',
      description: 'In-vehicle experience optimization for electric vehicle charging interface.',
      status: 'draft',
      personas: 3,
      simulations: 0,
      lastActivity: '3 days ago',
      progress: 30,
      gradient: 'from-green-500 to-emerald-600',
      starred: true
    },
    {
      id: 4,
      title: 'Banking App Redesign',
      description: 'User journey analysis for mobile banking app targeting Gen Z customers.',
      status: 'active',
      personas: 5,
      simulations: 15,
      lastActivity: '4 hours ago',
      progress: 60,
      gradient: 'from-orange-500 to-red-600',
      starred: false
    },
    {
      id: 5,
      title: 'SaaS Onboarding Flow',
      description: 'Optimizing user onboarding experience for B2B project management platform.',
      status: 'active',
      personas: 4,
      simulations: 9,
      lastActivity: '6 hours ago',
      progress: 45,
      gradient: 'from-indigo-500 to-purple-600',
      starred: true
    },
    {
      id: 6,
      title: 'Healthcare Portal UX',
      description: 'Patient experience research for telemedicine platform interface design.',
      status: 'draft',
      personas: 2,
      simulations: 0,
      lastActivity: '1 week ago',
      progress: 15,
      gradient: 'from-teal-500 to-cyan-600',
      starred: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-300 bg-emerald-500/20';
      case 'completed': return 'text-blue-300 bg-blue-500/20';
      case 'draft': return 'text-orange-300 bg-orange-500/20';
      default: return 'text-white/60 bg-white/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white text-glow font-['Sora']">Active Projects</h3>
        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-['Inter']">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="glass-card p-6 hover:scale-105 transition-all duration-300 group animate-scale-in"
            style={{ 
              animationDelay: `${index * 150}ms`,
              background: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 bg-gradient-to-br ${project.gradient} rounded-full animate-sparkle`}></div>
                <h4 className="font-semibold text-white group-hover:text-prismatic transition-colors text-glow font-['Sora']">
                  {project.title}
                </h4>
                {project.starred && (
                  <Star className="h-4 w-4 text-yellow-300 fill-current animate-sparkle" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full font-['Inter'] ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-white/60 mb-4 line-clamp-2 font-['Inter']">
              {project.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-xs text-white/60 font-['Inter']">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{project.personas} personas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Play className="h-3 w-3" />
                  <span>{project.simulations} sims</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{project.lastActivity}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-['Inter']">
                <span className="text-white/60">Progress</span>
                <span className="text-white font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5">
                <div
                  className={`bg-gradient-to-r ${project.gradient} h-1.5 rounded-full transition-all duration-500`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <Button variant="ghost" size="sm" className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 font-['Inter']">
                <Play className="mr-1 h-3 w-3" />
                Continue
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white font-['Inter']">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
