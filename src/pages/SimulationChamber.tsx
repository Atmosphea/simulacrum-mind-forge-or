import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, Pause, SkipForward, Save, Eye, Heart, Zap } from 'lucide-react';

const SimulationChamber = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentThought, setCurrentThought] = useState(0);
  const [notes, setNotes] = useState('');
  const [timelinePosition, setTimelinePosition] = useState(0);

  const thoughtStream = [
    {
      text: "Walking into this coffee aisle, I'm immediately drawn to the organic section. The bright green labels catch my eye first.",
      emotion: "curiosity",
      timestamp: "0:03",
      intensity: 0.6
    },
    {
      text: "I pick up this Ethiopian blend... $18.99? That's steep, but if it's really supporting fair trade farmers, maybe it's worth it.",
      emotion: "contemplation",
      timestamp: "0:18",
      intensity: 0.7
    },
    {
      text: "There's this subtle vanilla scent coming from somewhere. Makes me think of Sunday mornings at home. This decision feels important somehow.",
      emotion: "nostalgia",
      timestamp: "0:32",
      intensity: 0.8
    },
    {
      text: "The packaging says 'woman-owned cooperative.' That resonates with me. I want my purchase to mean something beyond just caffeine.",
      emotion: "connection",
      timestamp: "0:47",
      intensity: 0.9
    }
  ];

  const sensoryData = [
    { cue: "Vanilla scent detected", timestamp: "0:28", type: "olfactory" },
    { cue: "Bright fluorescent lighting", timestamp: "0:05", type: "visual" },
    { cue: "Soft jazz background music", timestamp: "0:12", type: "auditory" },
    { cue: "Cool air conditioning", timestamp: "0:20", type: "tactile" }
  ];

  const timelineMarkers = thoughtStream.map((thought, index) => ({
    position: (index + 1) * 25,
    emotion: thought.emotion,
    intensity: thought.intensity
  }));

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelinePosition(prev => {
          const newPos = prev + 1;
          if (newPos >= 100) {
            setIsPlaying(false);
            return 100;
          }
          
          // Update current thought based on timeline position
          const thoughtIndex = Math.floor(newPos / 25);
          if (thoughtIndex < thoughtStream.length && thoughtIndex !== currentThought) {
            setCurrentThought(thoughtIndex);
          }
          
          return newPos;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentThought]);

  const getEmotionColor = (emotion) => {
    const colors = {
      curiosity: '#60A5FA',
      contemplation: '#A78BFA',
      nostalgia: '#F9A8D4',
      connection: '#34D399'
    };
    return colors[emotion] || '#E5E7EB';
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Thought Stream
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Emotional Cadence
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Sensory Input
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Main Simulation Area */}
        <div className="flex-1 flex flex-col p-6">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-prismatic font-['Sora']">Simulation Chamber</h1>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="gradient-cta text-white"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Thought Stream Display */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-3xl text-center">
              <div 
                className={`text-lg text-white leading-relaxed font-['Inter'] transition-all duration-1000 ${
                  isPlaying ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                }`}
                style={{ 
                  textShadow: '0 0 10px rgba(230, 240, 250, 0.4)',
                  fontSize: '18px',
                  fontWeight: 300
                }}
              >
                {thoughtStream[currentThought]?.text}
              </div>
              
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getEmotionColor(thoughtStream[currentThought]?.emotion) }}
                  />
                  <span className="text-white/70 text-sm capitalize font-['Inter']">
                    {thoughtStream[currentThought]?.emotion}
                  </span>
                </div>
                <span className="text-white/50 text-sm font-['Inter']">
                  {thoughtStream[currentThought]?.timestamp}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8">
            <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-200"
                style={{ width: `${timelinePosition}%` }}
              />
              
              {/* Timeline markers */}
              {timelineMarkers.map((marker, index) => (
                <div
                  key={index}
                  className="absolute top-0 w-4 h-4 rounded-full border-2 border-white transform -translate-y-1 cursor-pointer hover:scale-110 transition-transform"
                  style={{ 
                    left: `${marker.position}%`,
                    backgroundColor: getEmotionColor(thoughtStream[index]?.emotion),
                    opacity: marker.intensity
                  }}
                  onClick={() => {
                    setCurrentThought(index);
                    setTimelinePosition(marker.position);
                  }}
                />
              ))}
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-white/60 font-['Inter']">
              <span>0:00</span>
              <span>1:00</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-4 p-4">
          {/* Sensory Cues */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="flex items-center space-x-2 text-white font-['Sora'] text-sm mb-3">
                <Eye className="h-4 w-4 text-cyan-400" />
                <span>Sensory Environment</span>
              </h3>
              <div className="space-y-2">
                {sensoryData.map((cue, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-xs transition-opacity duration-2000 font-['Inter'] ${
                      parseFloat(cue.timestamp.replace(':', '.')) * 10 <= timelinePosition 
                        ? 'opacity-100 bg-white/10 text-white' 
                        : 'opacity-30 text-white/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span>{cue.cue}</span>
                    </div>
                    <div className="text-white/50 ml-4">{cue.timestamp}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes Panel */}
          <Card className="glass-card flex-1">
            <CardContent className="p-4 h-full">
              <h3 className="flex items-center space-x-2 text-white font-['Sora'] text-sm mb-3">
                <Heart className="h-4 w-4 text-pink-400" />
                <span>Research Notes</span>
              </h3>
              <Textarea
                placeholder="Capture insights, pain points, and observations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="glass-card text-white placeholder-white/60 h-48 text-sm resize-none font-['Inter']"
              />
              <div className="mt-2 text-xs text-white/50 font-['Inter']">
                Synced to timeline: {thoughtStream[currentThought]?.timestamp}
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <h3 className="flex items-center space-x-2 text-white font-['Sora'] text-sm mb-3">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Live Insights</span>
              </h3>
              <div className="space-y-2 text-xs font-['Inter']">
                <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded">
                  High purchase intent detected
                </div>
                <div className="p-2 bg-purple-500/20 text-purple-300 rounded">
                  Values-driven decision making
                </div>
                <div className="p-2 bg-cyan-500/20 text-cyan-300 rounded">
                  Sensory trigger: vanilla scent
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimulationChamber;
