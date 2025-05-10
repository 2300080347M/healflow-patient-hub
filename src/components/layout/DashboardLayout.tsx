
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from './Navbar';
import SidebarNav from './Sidebar';
import { User } from '@/types';

interface DashboardLayoutProps {
  user?: User;
  onLogout?: () => void;
  unreadMessages?: number;
  unreadNotifications?: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  user, 
  onLogout,
  unreadMessages = 0,
  unreadNotifications = 0
}) => {
  const isProvider = user?.role === 'provider';

  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar 
          user={user} 
          onLogout={onLogout}
          unreadMessages={unreadMessages}
          unreadNotifications={unreadNotifications}
        />
        
        <div className="flex flex-1 w-full">
          <SidebarNav isProvider={isProvider} />
          
          <main className="flex-1 overflow-auto pt-16 lg:pt-0 pb-10 pl-14 lg:pl-64">
            <div className="container py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
