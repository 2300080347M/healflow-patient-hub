
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  FileText,
  User,
  Calendar,
  MessageSquare,
  Pill,
  Clock,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  isProvider?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ isProvider = false }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  const patientLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'My Profile' },
    { to: '/medical-history', icon: FileText, label: 'Medical History' },
    { to: '/prescriptions', icon: Pill, label: 'Prescriptions' },
    { to: '/appointments', icon: Calendar, label: 'Appointments' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
  ];

  const providerLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'My Profile' },
    { to: '/patients', icon: User, label: 'Patients' },
    { to: '/appointments', icon: Calendar, label: 'Appointments' },
    { to: '/recent-records', icon: Clock, label: 'Recent Records' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
  ];

  const links = isProvider ? providerLinks : patientLinks;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    cn(
      "flex items-center space-x-2 w-full px-2 py-2 rounded-md",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
        : "hover:bg-sidebar-accent/50"
    );

  return (
    <Sidebar
      className={cn(
        "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-sidebar transition-width duration-300",
        collapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end lg:hidden" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.to}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink to={link.to} className={getNavLinkClass}>
                      <link.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
                      {!collapsed && <span>{link.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
