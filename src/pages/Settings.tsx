import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Key, Download, Trash2, Save } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    insights: true,
    weekly: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    research: false
  });

  const settingsSections = [
    {
      title: 'Account Settings',
      icon: User,
      items: [
        { label: 'Profile Information', description: 'Update your name, email, and profile picture' },
        { label: 'Password', description: 'Change your password and security settings' },
        { label: 'Billing', description: 'Manage subscription and payment methods' },
        { label: 'Account Activity', description: 'View recent login activity and sessions' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Simulation completions and insights' },
        { label: 'Push Notifications', description: 'Real-time updates and alerts' },
        { label: 'Insight Alerts', description: 'High-confidence findings and discoveries' },
        { label: 'Weekly Summary', description: 'Weekly research progress reports' }
      ]
    },
    {
      title: 'Privacy & Data',
      icon: Shield,
      items: [
        { label: 'Data Sharing', description: 'Share anonymized data for research' },
        { label: 'Usage Analytics', description: 'Help improve Simulacrum with usage data' },
        { label: 'Research Participation', description: 'Participate in product research studies' },
        { label: 'Data Export', description: 'Download all your simulation data' }
      ]
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        { label: 'Interface Theme', description: 'Customize appearance and animations' },
        { label: 'Default Persona', description: 'Set preferred persona for quick starts' },
        { label: 'Simulation Duration', description: 'Default length for new simulations' },
        { label: 'Auto-save Frequency', description: 'How often to save simulation progress' }
      ]
    }
  ];

  const dangerZone = [
    { label: 'Export All Data', description: 'Download a complete copy of your research data', icon: Download, action: 'export' },
    { label: 'Delete Account', description: 'Permanently delete your account and all data', icon: Trash2, action: 'delete' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      
      {/* Background effects */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Configuration
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Preferences
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Privacy Controls
      </div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-prismatic font-['Sora'] mb-2">Settings</h1>
          <p className="text-teal-700 font-['Inter']">Customize your Simulacrum experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white font-['Sora'] flex items-center gap-3">
                  <section.icon className="h-5 w-5 text-cyan-400" />
                  {section.title}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-white font-['Inter'] mb-1">{item.label}</h4>
                      <p className="text-sm text-teal-600 font-['Inter']">{item.description}</p>
                    </div>
                    <div className="ml-4">
                      {section.title === 'Notifications' ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.label.toLowerCase().replace(' ', '') as keyof typeof notifications] || false}
                            onChange={() => {}}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                      ) : section.title === 'Privacy & Data' ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy[item.label.toLowerCase().replace(' ', '') as keyof typeof privacy] || false}
                            onChange={() => {}}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                      ) : (
                        <Button variant="outline" size="sm" className="text-teal-700 border-teal-300 hover:bg-teal-50 font-['Inter']">
                          Configure
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Keys Section */}
        <Card className="glass-card mt-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white font-['Sora'] flex items-center gap-3">
              <Key className="h-5 w-5 text-yellow-400" />
              API Keys & Integrations
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white font-['Inter']">Research API Key</h4>
                <Button variant="outline" size="sm" className="text-teal-700 border-teal-300 hover:bg-teal-50 font-['Inter']">
                  Regenerate
                </Button>
              </div>
              <p className="text-sm text-teal-600 mb-3 font-['Inter']">Use this key to access Simulacrum data programmatically</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-black/20 text-cyan-300 rounded text-sm font-mono">
                  sim_key_****************************
                </code>
                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-white hover:bg-white/10 font-['Inter']">
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white font-['Inter']">Webhook URL</h4>
                <Button variant="outline" size="sm" className="text-teal-700 border-teal-300 hover:bg-teal-50 font-['Inter']">
                  Test
                </Button>
              </div>
              <p className="text-sm text-teal-600 mb-3 font-['Inter']">Receive real-time notifications when simulations complete</p>
              <input
                type="url"
                placeholder="https://your-app.com/webhooks/simulacrum"
                className="w-full p-2 glass-card text-teal-700 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 font-['Inter']"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="glass-card mt-6 border-red-500/30">
          <CardHeader>
            <h3 className="text-lg font-semibold text-red-400 font-['Sora'] flex items-center gap-3">
              <Shield className="h-5 w-5" />
              Danger Zone
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {dangerZone.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-red-400" />
                  <div>
                    <h4 className="font-medium text-white font-['Inter']">{item.label}</h4>
                    <p className="text-sm text-teal-600 font-['Inter']">{item.description}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`font-['Inter'] ${
                    item.action === 'delete' 
                      ? 'text-red-400 border-red-400 hover:bg-red-500/20' 
                      : 'text-teal-700 border-teal-300 hover:bg-teal-50'
                  }`}
                >
                  {item.label.split(' ')[0]}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button className="gradient-cta text-white font-['Inter'] flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
