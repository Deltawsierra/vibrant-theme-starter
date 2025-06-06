
import React, { Suspense } from 'react';
import { useTheme } from '@/context/ThemeContext';
import themeRegistry from '@/themes';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ThemePageLoaderProps {
  pageName: 'About' | 'Work' | 'Contact' | 'Showcase';
}

const ThemePageLoader: React.FC<ThemePageLoaderProps> = ({ pageName }) => {
  const { currentTheme } = useTheme();

  try {
    console.log('ThemePageLoader - Loading:', { currentTheme, pageName });
    console.log('Available themes:', Object.keys(themeRegistry));
    
    const themeComponents = themeRegistry[currentTheme];
    
    if (!themeComponents) {
      console.error('Theme not found:', currentTheme);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Theme Not Found</h1>
            <p className="text-gray-600">Theme "{currentTheme}" is not available.</p>
            <p className="text-sm text-gray-500 mt-2">Available themes: {Object.keys(themeRegistry).join(', ')}</p>
          </div>
        </div>
      );
    }

    console.log('Theme components available:', Object.keys(themeComponents));
    const PageComponent = themeComponents[pageName];
    const ThemeProvider = themeComponents.Provider;
    
    if (!PageComponent) {
      console.error('Page component not found:', { theme: currentTheme, page: pageName });
      console.log('Available pages for theme:', Object.keys(themeComponents));
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Page Not Found</h1>
            <p className="text-gray-600">
              {pageName} page is not available for the {currentTheme} theme.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Available pages: {Object.keys(themeComponents).join(', ')}
            </p>
          </div>
        </div>
      );
    }

    console.log('Successfully loaded page component:', PageComponent.name || 'Anonymous');

    return (
      <ErrorBoundary>
        <Suspense 
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading {currentTheme} - {pageName} page...</p>
              </div>
            </div>
          }
        >
          {ThemeProvider ? (
            <ThemeProvider>
              <PageComponent />
            </ThemeProvider>
          ) : (
            <PageComponent />
          )}
        </Suspense>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error loading theme page:', error);
    console.error('Theme:', currentTheme, 'Page:', pageName);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Page</h1>
          <p className="text-gray-600">
            There was an error loading the {pageName} page for the {currentTheme} theme.
          </p>
          <p className="text-sm text-gray-500 mt-2">Check console for details.</p>
        </div>
      </div>
    );
  }
};

export default ThemePageLoader;
