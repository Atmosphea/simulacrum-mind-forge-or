import React from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import StatsOverview from '@/components/dashboard/StatsOverview';
import P5Background from '@/components/dashboard/P5Background';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';

const Dashboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{
           background: 'linear-gradient(135deg, #E6F0FA 0%, #D1FAE5 50%, #F3E8FF 100%)'
         }}>
      <P5Background />
      
      {/* Background floating text */}
      <div className="background-text" style={{ top: '20%', left: '10%' }}>
        Internal Monologue
      </div>
      <div className="background-text" style={{ top: '60%', left: '80%' }}>
        Persona Insight
      </div>
      <div className="background-text" style={{ top: '40%', left: '60%' }}>
        Story Unfolds
      </div>
      <div className="background-text" style={{ top: '80%', left: '20%' }}>
        Thought Emerges
      </div>
      
      <div className="relative z-10 flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6">
            <StatsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProjectGrid />
              </div>
              <div className="space-y-6">
                <QuickActions />
                <RecentActivity />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
