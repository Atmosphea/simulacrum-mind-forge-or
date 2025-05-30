import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Flag, TrendingUp, AlertTriangle, Heart, Zap } from 'lucide-react';

const AnalysisPortal = () => {
  const [selectedInsight, setSelectedInsight] = useState(null);

  const transcript = [
    {
      timestamp: "0:03",
      thought: "Walking into this coffee aisle, I'm immediately drawn to the organic section. The bright green labels catch my eye first.",
      emotion: "curiosity",
      tags: ["visual_trigger", "organic_preference"]
    },
    {
      timestamp: "0:18", 
      thought: "I pick up this Ethiopian blend... $18.99? That's steep, but if it's really supporting fair trade farmers, maybe it's worth it.",
      emotion: "contemplation",
      tags: ["price_sensitivity", "values_alignment", "fair_trade"]
    },
    {
      timestamp: "0:32",
      thought: "There's this subtle vanilla scent coming from somewhere. Makes me think of Sunday mornings at home. This decision feels important somehow.",
      emotion: "nostalgia",
      tags: ["sensory_trigger", "emotional_connection", "decision_weight"]
    },
    {
      timestamp: "0:47",
      thought: "The packaging says 'woman-owned cooperative.' That resonates with me. I want my purchase to mean something beyond just caffeine.",
      emotion: "connection",
      tags: ["social_impact", "values_driven", "purpose_seeking"]
    }
  ];

  const insights = [
    {
      type: "pain_point",
      title: "Price Sensitivity Conflict",
      description: "Customer experiences tension between budget constraints and values alignment",
      confidence: 0.85,
      evidence: ["Price reaction at 0:18", "Values justification immediately following"],
      icon: AlertTriangle,
      color: "text-orange-400"
    },
    {
      type: "purchase_intent",
      title: "High Purchase Likelihood", 
      description: "Strong emotional connection and values alignment indicate probable purchase",
      confidence: 0.92,
      evidence: ["Values resonance", "Emotional triggers", "Decision importance"],
      icon: TrendingUp,
      color: "text-emerald-400"
    },
    {
      type: "emotional_trigger",
      title: "Sensory Memory Activation",
      description: "Vanilla scent triggered nostalgic memories, increasing emotional investment",
      confidence: 0.78,
      evidence: ["Sensory description at 0:32", "Memory association", "Decision weight increase"],
      icon: Heart,
      color: "text-pink-400"
    },
    {
      type: "optimization",
      title: "Values Messaging Opportunity",
      description: "Emphasize social impact and cooperative ownership in marketing",
      confidence: 0.89,
      evidence: ["Woman-owned resonance", "Purpose beyond product", "Fair trade consideration"],
      icon: Zap,
      color: "text-cyan-400"
    }
  ];

  const exportTranscript = () => {
    const transcriptText = transcript.map(entry => 
      `[${entry.timestamp}] ${entry.thought} (${entry.emotion})`
    ).join('\n\n');
    
    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simulation-transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '15%', left: '5%' }}>
        Analysis Complete
      </div>
      <div className="background-text" style={{ top: '45%', left: '85%' }}>
        Insights Generated
      </div>
      <div className="background-text" style={{ top: '75%', left: '15%' }}>
        Export Ready
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-prismatic mb-2 font-['Sora']">Analysis Portal</h1>
            <p className="text-white/80 font-['Inter'] text-sm">Deep dive into simulation insights and behavioral patterns</p>
          </div>
          <Button onClick={exportTranscript} className="gradient-cta text-white">
            <Download className="mr-2 h-4 w-4" />
            Export Transcript
          </Button>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="glass-card bg-white/10 border-white/20">
            <TabsTrigger value="insights" className="text-white data-[state=active]:bg-white/20">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="transcript" className="text-white data-[state=active]:bg-white/20">
              Full Transcript
            </TabsTrigger>
            <TabsTrigger value="patterns" className="text-white data-[state=active]:bg-white/20">
              Behavioral Patterns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight, index) => (
                <Card 
                  key={index}
                  className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedInsight === index ? 'ring-2 ring-white/40' : ''
                  }`}
                  onClick={() => setSelectedInsight(selectedInsight === index ? null : index)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-white font-['Sora']">
                      <insight.icon className={`h-5 w-5 ${insight.color}`} />
                      <span className="text-sm">{insight.title}</span>
                      <div className="ml-auto">
                        <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                          {Math.round(insight.confidence * 100)}%
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm font-['Inter'] mb-3">
                      {insight.description}
                    </p>
                    
                    {selectedInsight === index && (
                      <div className="space-y-3 animate-fade-in">
                        <div>
                          <h4 className="text-white/90 text-xs font-['Sora'] mb-2">Evidence:</h4>
                          <ul className="space-y-1">
                            {insight.evidence.map((evidence, i) => (
                              <li key={i} className="text-white/70 text-xs font-['Inter'] flex items-center">
                                <div className="w-1 h-1 bg-white/50 rounded-full mr-2" />
                                {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2 border-t border-white/20">
                          <Flag className="h-3 w-3 text-white/60" />
                          <span className="text-xs text-white/60 font-['Inter']">
                            {insight.type.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white font-['Sora']">Complete Simulation Transcript</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transcript.map((entry, index) => (
                  <div key={index} className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-cyan-400 text-sm font-['Inter']">{entry.timestamp}</span>
                      <div className="flex space-x-1">
                        {entry.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-white/90 font-['Inter'] text-sm leading-relaxed mb-2">
                      {entry.thought}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          backgroundColor: entry.emotion === 'curiosity' ? '#60A5FA' :
                                         entry.emotion === 'contemplation' ? '#A78BFA' :
                                         entry.emotion === 'nostalgia' ? '#F9A8D4' : '#34D399'
                        }}
                      />
                      <span className="text-white/70 text-xs capitalize font-['Inter']">
                        {entry.emotion}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] text-sm">Decision Triggers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs font-['Inter']">Visual cues</span>
                      <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-emerald-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs font-['Inter']">Values alignment</span>
                      <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-cyan-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs font-['Inter']">Sensory input</span>
                      <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-purple-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] text-sm">Emotional Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-20 flex items-end space-x-1">
                    {[0.6, 0.7, 0.8, 0.9].map((height, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-gradient-to-t from-pink-400 to-purple-400 rounded-t"
                        style={{ height: `${height * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-white/60 mt-2 font-['Inter']">
                    Emotional intensity increasing
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] text-sm">Purchase Intent</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-emerald-400"
                      style={{ 
                        clipPath: 'polygon(50% 0%, 100% 0%, 100% 92%, 50% 92%)',
                        transform: 'rotate(-90deg)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalysisPortal;
