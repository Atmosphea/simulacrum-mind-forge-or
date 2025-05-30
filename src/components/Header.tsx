import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card backdrop-blur-xl border-b border-white/20"
            style={{ background: 'rgba(230, 240, 250, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 gradient-cta rounded-lg flex items-center justify-center animate-sparkle">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-prismatic font-['Sora']">
                Simulacrum
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/setup')}
              className="text-white/80 hover:text-white text-sm font-['Inter'] transition-colors"
            >
              Setup Hub
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-white/80 hover:text-white text-sm font-['Inter'] transition-colors"
            >
              Dashboard
            </button>
            <button className="text-white/80 hover:text-white text-sm font-['Inter'] transition-colors">
              Case Studies
            </button>
            <button className="text-white/80 hover:text-white text-sm font-['Inter'] transition-colors">
              Personas
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden sm:inline-flex text-white border-white/30 hover:bg-white/10 text-sm">
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/setup')}
              className="gradient-cta text-white text-sm"
            >
              Start Simulation
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
