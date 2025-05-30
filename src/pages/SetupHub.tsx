import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Sparkles, ArrowRight, Target, Users, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SetupHub = () => {
  const navigate = useNavigate();
  const [scenario, setScenario] = useState({
    objective: '',
    environment: '',
    goal: '',
    situation: '',
    userStory: ''
  });
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const personas = [
    {
      id: 1,
      name: "The Mindful Consumer",
      description: "Environmentally conscious, values authenticity",
      traits: ["Sustainability-focused", "Quality over quantity", "Research-driven"],
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      id: 2,
      name: "The Practical Parent",
      description: "Budget-conscious, family-first decision maker",
      traits: ["Value-seeking", "Safety-prioritized", "Time-conscious"],
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      name: "The Strategic Executive",
      description: "Results-oriented, efficiency-focused professional",
      traits: ["ROI-focused", "Integration-minded", "Decision-swift"],
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  const insightQuestions = [
    "What triggers their purchase decision?",
    "What are their main pain points?",
    "How do they evaluate alternatives?",
    "What emotional factors influence them?",
    "What would make them recommend this?"
  ];

  const enhanceUserStory = () => {
    // AI enhancement simulation
    setScenario(prev => ({
      ...prev,
      userStory: prev.userStory + " [Enhanced: The user feels a subtle tension between their desire for convenience and their environmental values, creating an internal dialogue about compromise...]"
    }));
  };

  const startSimulation = () => {
    navigate('/simulation-chamber');
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '15%', left: '5%' }}>
        Research Objective
      </div>
      <div className="background-text" style={{ top: '45%', left: '85%' }}>
        Persona Selection
      </div>
      <div className="background-text" style={{ top: '75%', left: '15%' }}>
        Story Enhancement
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-prismatic mb-2 font-['Sora']">Setup Hub</h1>
          <p className="text-white/80 font-['Inter'] text-sm">Configure your simulation parameters and persona selection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Input */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white font-['Sora']">
                  <Target className="h-5 w-5 text-cyan-400" />
                  <span>Scenario Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-white/80 mb-2 block font-['Inter']">Research Objective</label>
                  <Input
                    placeholder="e.g., Understand coffee purchasing decisions in premium market"
                    value={scenario.objective}
                    onChange={(e) => setScenario(prev => ({ ...prev, objective: e.target.value }))}
                    className="glass-card text-white placeholder-white/60"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-white/80 mb-2 block font-['Inter']">Environment</label>
                    <Input
                      placeholder="e.g., Upscale grocery store"
                      value={scenario.environment}
                      onChange={(e) => setScenario(prev => ({ ...prev, environment: e.target.value }))}
                      className="glass-card text-white placeholder-white/60"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/80 mb-2 block font-['Inter']">Goal</label>
                    <Input
                      placeholder="e.g., Choose sustainable coffee brand"
                      value={scenario.goal}
                      onChange={(e) => setScenario(prev => ({ ...prev, goal: e.target.value }))}
                      className="glass-card text-white placeholder-white/60"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white/80 mb-2 block font-['Inter']">Situation Context</label>
                  <Textarea
                    placeholder="Describe the specific situation, time of day, mood, external factors..."
                    value={scenario.situation}
                    onChange={(e) => setScenario(prev => ({ ...prev, situation: e.target.value }))}
                    className="glass-card text-white placeholder-white/60 min-h-[100px]"
                  />
                </div>
                
                {/* Image Upload */}
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/80 text-sm font-['Inter']">Upload product images or mockups</p>
                  <Button variant="outline" className="mt-2 text-white border-white/30 hover:bg-white/10">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Story Enhancer */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white font-['Sora']">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span>User Story Enhancement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write your user story here... Our AI will enhance it with emotional depth and contextual details."
                  value={scenario.userStory}
                  onChange={(e) => setScenario(prev => ({ ...prev, userStory: e.target.value }))}
                  className="glass-card text-white placeholder-white/60 min-h-[120px] mb-4"
                />
                <Button 
                  onClick={enhanceUserStory}
                  className="gradient-cta text-white"
                  disabled={!scenario.userStory}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhance with AI
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Persona Selection & Insight Questions */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white font-['Sora']">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span>Select Persona</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {personas.map((persona) => (
                  <div
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedPersona === persona.id 
                        ? 'bg-white/20 border-2 border-white/40' 
                        : 'bg-white/10 border border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${persona.gradient} rounded-lg mb-2 animate-sparkle`} />
                    <h4 className="text-white font-medium text-sm font-['Sora']">{persona.name}</h4>
                    <p className="text-white/70 text-xs font-['Inter'] mb-2">{persona.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {persona.traits.slice(0, 2).map((trait, i) => (
                        <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white font-['Sora']">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span>Insight Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {insightQuestions.map((question, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (selectedQuestions.includes(index)) {
                        setSelectedQuestions(prev => prev.filter(i => i !== index));
                      } else {
                        setSelectedQuestions(prev => [...prev, index]);
                      }
                    }}
                    className={`p-3 rounded-lg text-xs cursor-pointer transition-all duration-300 font-['Inter'] ${
                      selectedQuestions.includes(index)
                        ? 'bg-white/20 text-white border border-white/40'
                        : 'bg-white/10 text-white/80 hover:bg-white/15'
                    }`}
                  >
                    {question}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Start Simulation Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={startSimulation}
            size="lg"
            className="gradient-cta text-white px-8 py-4 text-lg"
            disabled={!selectedPersona || !scenario.objective}
          >
            Start Simulation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupHub;
