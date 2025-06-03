
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  reduceMotion: boolean;
  highContrast: boolean;
  announceMessage: (message: string) => void;
  skipToContent: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Check for high contrast preference
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const announceMessage = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    // Clear announcement after a delay
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  const skipToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AccessibilityContext.Provider value={{
      reduceMotion,
      highContrast,
      announceMessage,
      skipToContent
    }}>
      {children}
      
      {/* Skip to content link */}
      <button
        onClick={skipToContent}
        className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 bg-blue-600 text-white px-4 py-2 rounded-br-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        onFocus={(e) => e.target.classList.remove('sr-only')}
        onBlur={(e) => e.target.classList.add('sr-only')}
      >
        Skip to main content
      </button>

      {/* Live region for announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcements.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </AccessibilityContext.Provider>
  );
};
