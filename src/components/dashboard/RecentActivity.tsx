import React from 'react';
import { Clock, MessageSquare, Play, Users, FileText } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      icon: Play,
      action: 'Simulation completed',
      details: 'E-commerce Checkout Flow - Persona #3',
      time: '2 minutes ago',
      type: 'success'
    },
    {
      icon: MessageSquare,
      action: 'New insight generated',
      details: 'Pain point identified in checkout step 4',
      time: '15 minutes ago',
      type: 'info'
    },
    {
      icon: Users,
      action: 'Persona created',
      details: 'The Tech-Savvy Parent persona added',
      time: '1 hour ago',
      type: 'success'
    },
    {
      icon: FileText,
      action: 'Report exported',
      details: 'CPG Product Launch - Full Analysis',
      time: '2 hours ago',
      type: 'neutral'
    },
    {
      icon: Play,
      action: 'Simulation started',
      details: 'Banking App Redesign - Persona #2',
      time: '4 hours ago',
      type: 'info'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-emerald-300 bg-emerald-500/20';
      case 'info': return 'text-cyan-300 bg-cyan-500/20';
      case 'neutral': return 'text-white/60 bg-white/20';
      default: return 'text-white/60 bg-white/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-white text-glow font-['Sora']">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 glass-card hover:scale-105 transition-all duration-300 animate-scale-in"
            style={{ 
              animationDelay: `${index * 100}ms`,
              background: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(activity.type)} animate-sparkle`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white font-['Inter']">{activity.action}</p>
              <p className="text-xs text-white/60 truncate font-['Inter']">{activity.details}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="h-3 w-3 text-white/40" />
                <span className="text-xs text-white/40 font-['Inter']">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
