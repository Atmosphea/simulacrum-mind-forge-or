import React from 'react';
import { TrendingUp, Users, Brain, Clock } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      icon: Brain,
      label: 'Active Simulations',
      value: '24',
      change: '+12%',
      trend: 'up',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Users,
      label: 'Personas Created',
      value: '156',
      change: '+8%',
      trend: 'up',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      label: 'Insights Generated',
      value: '2.4k',
      change: '+24%',
      trend: 'up',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: Clock,
      label: 'Avg. Session Time',
      value: '18m',
      change: '+3%',
      trend: 'up',
      gradient: 'from-orange-400 to-rose-500'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass-card p-6 hover:scale-105 transition-all duration-300 group animate-scale-in"
          style={{ 
            animationDelay: `${index * 100}ms`,
            background: 'rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-sparkle`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full font-['Inter'] ${
              stat.trend === 'up' ? 'text-emerald-300 bg-emerald-500/20' : 'text-rose-300 bg-rose-500/20'
            }`}>
              {stat.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1 text-glow font-['Sora']">{stat.value}</p>
            <p className="text-sm text-white/60 font-['Inter']">{stat.label}</p>
            <div className="micro-viz mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
