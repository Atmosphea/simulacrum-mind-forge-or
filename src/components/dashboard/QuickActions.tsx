import React from 'react';
import { Plus, Upload, Users, Brain, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'New Project',
      description: 'Start a fresh simulation',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Users,
      label: 'Create Persona',
      description: 'Build custom personas',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Upload,
      label: 'Import Data',
      description: 'Upload research files',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: Brain,
      label: 'AI Assistant',
      description: 'Get insights & suggestions',
      gradient: 'from-orange-400 to-rose-500'
    },
    {
      icon: Zap,
      label: 'Quick Sim',
      description: '5-min rapid simulation',
      gradient: 'from-indigo-400 to-purple-500'
    },
    {
      icon: Download,
      label: 'Export Report',
      description: 'Download findings',
      gradient: 'from-teal-400 to-cyan-500'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-white text-glow font-['Sora']">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            className="h-auto p-4 flex flex-col items-center space-y-2 glass-card hover:scale-105 transition-all duration-300 group animate-scale-in font-['Inter']"
            style={{ 
              animationDelay: `${index * 100}ms`,
              background: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-sparkle`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{action.label}</p>
              <p className="text-xs text-white/60">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
