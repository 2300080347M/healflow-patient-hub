
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-health-600 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-health-800">
              HealthRecord
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Sign up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-health-900 mb-6">
              Secure Health Records Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-10">
              Access and manage your medical records securely. Connect with healthcare providers 
              and take control of your health information in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Provider Login</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Secure Medical Records",
                  description: "Access your complete medical history securely from anywhere, anytime.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586" />
                    </svg>
                  )
                },
                {
                  title: "Prescription Management",
                  description: "Track medications, dosages, and refill schedules to ensure you never miss a dose.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082c.067.005.149.01.225.015M9.75 3.104c.183.015.366.029.549.044M5 14.5v5.125c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V14.5m-9.75 0h9.75m-9.75 0-3.543 3.75A1.125 1.125 0 0 0 4.5 19.5v2.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V14.5m1.5 2.25a1.125 1.125 0 0 0-1.5-1.06l-3 .75a1.125 1.125 0 0 0-.81 1.08V20.25" />
                    </svg>
                  )
                },
                {
                  title: "Provider Communication",
                  description: "Securely message your healthcare team and receive quick responses to your questions.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm border flex flex-col items-center text-center">
                  <div className="text-health-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-blue-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Patients and Providers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "This platform has transformed how I manage my healthcare. I can access all my records, prescriptions, and communicate with my doctors all in one place.",
                  name: "Sarah J.",
                  role: "Patient"
                },
                {
                  quote: "As a healthcare provider, this system streamlines communication with my patients and provides easy access to their full medical history for more informed care.",
                  name: "Dr. Michael R.",
                  role: "Cardiologist"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm border">
                  <div className="text-3xl text-health-300 mb-4">"</div>
                  <p className="italic mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-health-700 text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take control of your health information?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of patients and healthcare providers who are already using HealthRecord to streamline healthcare management.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">HealthRecord</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-health-600 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-white"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <span className="font-bold text-health-800">
                HealthRecord
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Secure health records management for patients and healthcare providers.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Medical Records</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Prescriptions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Appointments</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Secure Messaging</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-health-600">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">HIPAA Compliance</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-health-600">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HealthRecord. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
