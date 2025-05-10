
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { User } from "./types";
import { authService } from "./lib/api/authService";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in via API
    const checkAuthStatus = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);
  
  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    window.location.href = '/';
  };

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            <Route 
              element={
                user ? (
                  <DashboardLayout user={user} onLogout={handleLogout} unreadMessages={2} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
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
