import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, Users, Brain, Clock, Target, Zap, BarChart3, PieChart, LineChart } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    {
      icon: Brain,
      label: 'Total Simulations',
      value: '247',
      change: '+18%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      icon: Users,
      label: 'Personas Used',
      value: '15',
      change: '+3',
      trend: 'up',
      period: 'new this month'
    },
    {
      icon: Target,
      label: 'Insights Generated',
      value: '1,249',
      change: '+24%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      icon: Clock,
      label: 'Avg Session Time',
      value: '22m',
      change: '+5m',
      trend: 'up',
      period: 'vs last month'
    }
  ];

  const simulationData = [
    { category: 'E-commerce', count: 45, percentage: 35 },
    { category: 'CPG', count: 32, percentage: 25 },
    { category: 'FinTech', count: 28, percentage: 22 },
    { category: 'Healthcare', count: 15, percentage: 12 },
    { category: 'Other', count: 8, percentage: 6 }
  ];

  const personaUsage = [
    { name: 'Tech-Savvy Parent', usage: 85, insights: 24 },
    { name: 'Eco-Conscious Millennial', usage: 72, insights: 19 },
    { name: 'Senior Digital Adopter', usage: 68, insights: 22 },
    { name: 'High-Stakes Executive', usage: 45, insights: 15 },
    { name: 'Creative Entrepreneur', usage: 38, insights: 12 }
  ];

  const recentInsights = [
    {
      type: 'Pain Point',
      description: 'Users struggle with complex checkout forms on mobile devices',
      confidence: 92,
      source: 'E-commerce Checkout Analysis'
    },
    {
      type: 'Opportunity',
      description: 'Strong emotional connection to sustainable packaging messaging',
      confidence: 88,
      source: 'CPG Product Launch'
    },
    {
      type: 'Behavior Pattern',
      description: 'Decision postponement increases with number of options presented',
      confidence: 85,
      source: 'Choice Architecture Study'
    },
    {
      type: 'Purchase Intent',
      description: 'High intent triggered by peer recommendations and reviews',
      confidence: 91,
      source: 'Social Commerce Research'
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'Pain Point': return 'bg-red-500/20 text-red-300';
      case 'Opportunity': return 'bg-green-500/20 text-green-300';
      case 'Behavior Pattern': return 'bg-blue-500/20 text-blue-300';
      case 'Purchase Intent': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Data Patterns
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Insight Trends
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Behavioral Analysis
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-prismatic font-['Sora'] mb-2">Analytics Dashboard</h1>
          <p className="text-teal-700 font-['Inter']">Track simulation performance and extract insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-['Inter']">
                    {metric.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white mb-1 text-glow font-['Sora']">{metric.value}</p>
                  <p className="text-sm text-teal-600 font-['Inter']">{metric.label}</p>
                  <p className="text-xs text-teal-500 mt-1 font-['Inter']">{metric.period}</p>
                  <div className="micro-viz mt-2" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Simulation Categories */}
          <Card className="glass-card">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white font-['Sora'] flex items-center gap-2">
                <PieChart className="h-5 w-5 text-cyan-400" />
                Simulation Categories
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {simulationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: `hsl(${index * 72}, 70%, 60%)` }}
                    />
                    <span className="text-teal-700 font-['Inter']">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-['Inter']">{item.count}</span>
                    <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-teal-500 w-8 font-['Inter']">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Persona Usage */}
          <Card className="glass-card">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white font-['Sora'] flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
                Persona Performance
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {personaUsage.map((persona, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700 text-sm font-['Inter']">{persona.name}</span>
                    <span className="text-xs text-teal-500 font-['Inter']">{persona.insights} insights</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-1000"
                      style={{ width: `${persona.usage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Insights */}
        <Card className="glass-card">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white font-['Sora'] flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Recent High-Confidence Insights
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className={`px-2 py-1 text-xs rounded-full ${getInsightColor(insight.type)} font-['Inter']`}>
                  {insight.type}
                </div>
                <div className="flex-1">
                  <p className="text-white font-['Inter'] mb-1">{insight.description}</p>
                  <div className="flex items-center justify-between text-xs text-teal-500">
                    <span className="font-['Inter']">{insight.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-['Inter']">Confidence: {insight.confidence}%</span>
                      <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
