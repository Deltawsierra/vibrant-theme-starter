
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';

// Common pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Work from '@/pages/Work';
import Contact from '@/pages/Contact';
import Showcase from '@/pages/Showcase';
import Game from '@/pages/Game';
import NotFound from '@/pages/NotFound';
import Auth from '@/pages/Auth';

// Add the new recruiter detector
import AIRecruiterDetector from '@/components/AIRecruiterDetector';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <ThemeProvider>
            <AIRecruiterDetector>
              <Router>
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/showcase" element={<Showcase />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Router>
              
              {/* Global Toast Notifications */}
              <Toaster />
            </AIRecruiterDetector>
          </ThemeProvider>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
