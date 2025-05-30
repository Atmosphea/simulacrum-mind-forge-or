import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User, Mail, Calendar, MapPin, Award, BarChart3, Brain, Clock, Target, Edit, Camera } from 'lucide-react';

const Profile = () => {
  const userStats = [
    { label: 'Simulations Run', value: '247', icon: Brain, color: 'from-cyan-400 to-blue-500' },
    { label: 'Insights Generated', value: '1,249', icon: Target, color: 'from-emerald-400 to-teal-500' },
    { label: 'Total Research Time', value: '89h', icon: Clock, color: 'from-purple-400 to-pink-500' },
    { label: 'Avg. Accuracy', value: '94%', icon: BarChart3, color: 'from-orange-400 to-rose-500' }
  ];

  const achievements = [
    { title: 'Early Adopter', description: 'Joined the beta program', icon: '🚀', earned: true },
    { title: 'Research Pioneer', description: 'Completed 100+ simulations', icon: '🔬', earned: true },
    { title: 'Insight Hunter', description: 'Generated 1000+ insights', icon: '💡', earned: true },
    { title: 'Deep Diver', description: '50+ hours of research time', icon: '🏊‍♂️', earned: true },
    { title: 'Persona Master', description: 'Used all available personas', icon: '🎭', earned: false },
    { title: 'Marathon Runner', description: '100+ hours of research time', icon: '🏃‍♀️', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed simulation', project: 'E-commerce Checkout Analysis', time: '2 hours ago' },
    { action: 'Created new project', project: 'Banking App Redesign', time: '1 day ago' },
    { action: 'Generated insight', project: 'CPG Product Launch', time: '2 days ago' },
    { action: 'Updated persona', project: 'Tech-Savvy Parent', time: '3 days ago' },
    { action: 'Exported data', project: 'Retail Experience Study', time: '1 week ago' }
  ];

  const researchAreas = [
    { area: 'E-commerce UX', percentage: 35, count: 87 },
    { area: 'Consumer Behavior', percentage: 28, count: 69 },
    { area: 'Product Innovation', percentage: 22, count: 54 },
    { area: 'User Psychology', percentage: 15, count: 37 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Research Profile
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Achievement Progress
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Personal Analytics
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-prismatic font-['Sora'] mb-2">Profile</h1>
          <p className="text-teal-700 font-['Inter']">Your research journey and achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center text-3xl">
                    👩‍🔬
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold text-white font-['Sora'] mb-2">Dr. Sarah Chen</h2>
                <p className="text-teal-600 font-['Inter'] mb-4">Senior UX Researcher</p>
                
                <div className="space-y-3 text-sm text-teal-600 font-['Inter']">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>sarah.chen@company.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined December 2023</span>
                  </div>
                </div>
                
                <Button className="gradient-cta text-white w-full mt-4 font-['Inter']">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Research Areas */}
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white font-['Sora']">Research Focus Areas</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {researchAreas.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-teal-700 text-sm font-['Inter']">{area.area}</span>
                      <span className="text-xs text-teal-500 font-['Inter']">{area.count} projects</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-1000"
                        style={{ width: `${area.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Stats and Activity */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-xl font-bold text-white mb-1 text-glow font-['Sora']">{stat.value}</p>
                    <p className="text-xs text-teal-600 font-['Inter']">{stat.label}</p>
                    <div className="micro-viz mt-2" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white font-['Sora']">Recent Activity</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-['Inter']">
                        <span className="font-medium">{activity.action}</span> - {activity.project}
                      </p>
                      <p className="text-xs text-teal-500 font-['Inter']">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Achievements */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white font-['Sora'] flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  Achievements
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      achievement.earned
                        ? 'border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20'
                        : 'border-white/10 bg-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className={`font-medium font-['Inter'] ${
                          achievement.earned ? 'text-emerald-300' : 'text-white/60'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-xs font-['Inter'] ${
                          achievement.earned ? 'text-emerald-400' : 'text-teal-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress to Next Level */}
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white font-['Sora']">Progress to Expert</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1 font-['Sora']">Level 8</div>
                    <div className="text-sm text-teal-600 font-['Inter']">Research Specialist</div>
                  </div>
                  
                  <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 w-3/4 transition-all duration-1000"></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-teal-500 font-['Inter']">
                    <span>2,450 XP</span>
                    <span>3,000 XP to Level 9</span>
                  </div>
                  
                  <div className="text-xs text-teal-600 text-center font-['Inter']">
                    Complete 3 more simulations to reach the next level
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
