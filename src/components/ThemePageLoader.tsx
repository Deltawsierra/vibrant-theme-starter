
import React, { Suspense } from 'react';
import { useTheme } from '@/context/ThemeContext';
import themeRegistry from '@/themes';

interface ThemePageLoaderProps {
  pageName: 'About' | 'Work' | 'Contact' | 'Showcase';
}

const ThemePageLoader: React.FC<ThemePageLoaderProps> = ({ pageName }) => {
  const { currentTheme } = useTheme();

  try {
    const themeComponents = themeRegistry[currentTheme];
    
    if (!themeComponents) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Theme Not Found</h1>
            <p className="text-gray-600">Theme "{currentTheme}" is not available.</p>
          </div>
        </div>
      );
    }

    const PageComponent = themeComponents[pageName];
    
    if (!PageComponent) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Page Not Found</h1>
            <p className="text-gray-600">
              {pageName} page is not available for the {currentTheme} theme.
            </p>
          </div>
        </div>
      );
    }

    return (
      <Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading page...</p>
            </div>
          </div>
        }
      >
        <PageComponent />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading theme page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Page</h1>
          <p className="text-gray-600">
            There was an error loading the {pageName} page for the {currentTheme} theme.
          </p>
        </div>
      </div>
    );
  }
};

export default ThemePageLoader;
