
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';
import PageTransition from '@/components/PageTransition';

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
    <ErrorBoundary>
      <ThemeProvider>
        <AIRecruiterDetector>
          <Router>
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <Index />
                  </PageTransition>
                } />
                <Route path="/about" element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                } />
                <Route path="/work" element={
                  <PageTransition>
                    <Work />
                  </PageTransition>
                } />
                <Route path="/contact" element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                } />
                <Route path="/showcase" element={
                  <PageTransition>
                    <Showcase />
                  </PageTransition>
                } />
                <Route path="/game" element={
                  <PageTransition>
                    <Game />
                  </PageTransition>
                } />
                <Route path="/auth" element={
                  <PageTransition>
                    <Auth />
                  </PageTransition>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
          
          {/* Global Toast Notifications */}
          <Toaster />
        </AIRecruiterDetector>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
