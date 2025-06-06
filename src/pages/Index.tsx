
import React, { Suspense } from 'react';
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Analytics } from "@/components/Analytics";
import { withPerformanceTracking } from "@/utils/performance";

// Lazy load ThemeSelector for better performance
const ThemeSelector = React.lazy(() => import("@/components/ThemeSelector"));

const IndexPage = () => {
  React.useEffect(() => {
    // Track page view
    Analytics.getInstance().trackPageView('/', 'landing');
  }, []);

  return (
    <>
      <SEOHead
        title="Multi-Theme Developer Portfolio | Choose Your Experience"
        description="Explore a sophisticated developer portfolio through six distinct themes: Minimalist, Retro Arcade, Storytelling, 3D Interactive, E-commerce, and Videography."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Multi-Theme Developer Portfolio", 
          "url": window.location.origin,
          "description": "A sophisticated developer portfolio showcasing full-stack mastery through six distinct themes",
          "author": {
            "@type": "Person",
            "name": "Developer Portfolio"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.origin}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <Navigation />
        <main id="main-content" className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="w-full">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading theme selector...</p>
                </div>
              </div>
            }>
              <ThemeSelector />
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
};

export default withPerformanceTracking(IndexPage, 'IndexPage');
