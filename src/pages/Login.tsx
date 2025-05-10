
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers } from '@/lib/mockData';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent, role: 'patient' | 'provider') => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // For demo purposes, use mock data to simulate login
    let mockEmail = '';
    if (role === 'patient') {
      mockEmail = 'john.doe@example.com'; // Mock patient
    } else {
      mockEmail = 'dr.johnson@healthsystem.com'; // Mock provider
    }

    if (email === mockEmail && password === 'password') {
      // In a real app, you would get a token from the server
      // and store it in localStorage or a secure cookie
      localStorage.setItem('userRole', role);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try the demo account shown below the form.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-health-600 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-health-900">Welcome to HealthRecord</h2>
          <p className="mt-2 text-gray-600">Sign in to access your health information</p>
        </div>

        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="patient">Patient</TabsTrigger>
            <TabsTrigger value="provider">Healthcare Provider</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patient">
            <Card>
              <CardHeader>
                <CardTitle>Patient Login</CardTitle>
                <CardDescription>
                  Access your medical records and manage your health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'patient')}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <Input 
                        id="patient-email" 
                        type="email" 
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="patient-password">Password</Label>
                        <a href="#" className="text-sm text-health-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="patient-password" 
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full">Sign In</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Demo Patient Account:</p>
                  <p>Email: john.doe@example.com</p>
                  <p>Password: password</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="provider">
            <Card>
              <CardHeader>
                <CardTitle>Provider Login</CardTitle>
                <CardDescription>
                  Access patient records and manage healthcare services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'provider')}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="provider-email">Email</Label>
                      <Input 
                        id="provider-email" 
                        type="email" 
                        placeholder="dr.johnson@healthsystem.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="provider-password">Password</Label>
                        <a href="#" className="text-sm text-health-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="provider-password" 
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full">Sign In</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Demo Provider Account:</p>
                  <p>Email: dr.johnson@healthsystem.com</p>
                  <p>Password: password</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="text-health-600 hover:underline">
              Contact your healthcare provider
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
