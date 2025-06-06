
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { AnalyticsProvider } from "@/components/Analytics";
import { ErrorTrackerProvider } from "@/components/ErrorTracker";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Showcase from "./pages/Showcase";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Create a Game page component
const Game = () => {
  const { currentTheme } = useTheme();
  return <ThemePageLoader pageName="Game" />;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <ErrorTrackerProvider>
        <AnalyticsProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider>
                <AccessibilityProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/showcase" element={<Showcase />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/auth" element={<AuthPage />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </AccessibilityProvider>
              </ThemeProvider>
            </AuthProvider>
          </QueryClientProvider>
        </AnalyticsProvider>
      </ErrorTrackerProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
