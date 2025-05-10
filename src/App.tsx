
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
import MedicalHistory from "./pages/MedicalHistory";
import Prescriptions from "./pages/Prescriptions";
import Appointments from "./pages/Appointments";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import DashboardLayout from "./components/layout/DashboardLayout";
import { mockPatients, mockProviders } from "./lib/mockData";
import { User } from "./types";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      if (userRole === 'patient') {
        setUser(mockPatients[0]);
      } else if (userRole === 'provider') {
        setUser(mockProviders[0]);
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            <Route element={<DashboardLayout user={user} onLogout={handleLogout} unreadMessages={2} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<PatientProfile />} />
              <Route path="/medical-history" element={<MedicalHistory />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/messages" element={<Messages />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
