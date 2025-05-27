
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available themes
export type Theme = 'minimalist' | 'retro-arcade' | 'storytelling' | '3d-interactive' | 'ecommerce' | 'videography';

// Context type definition
interface ThemeContextType {
  currentTheme: Theme;
  getTheme: () => Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

// Create context with undefined default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Constants
const THEME_STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME: Theme = 'minimalist';

// Provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
      if (savedTheme && isValidTheme(savedTheme)) {
        setCurrentTheme(savedTheme);
        console.log('Loaded theme from localStorage:', savedTheme);
      } else {
        console.log('No valid saved theme found, using default:', DEFAULT_THEME);
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
      setCurrentTheme(DEFAULT_THEME);
    }
  }, []);

  // Validate theme
  const isValidTheme = (theme: string): theme is Theme => {
    const validThemes: Theme[] = ['minimalist', 'retro-arcade', 'storytelling', '3d-interactive', 'ecommerce', 'videography'];
    return validThemes.includes(theme as Theme);
  };

  // Get current theme
  const getTheme = (): Theme => {
    return currentTheme;
  };

  // Set new theme and persist to localStorage
  const setTheme = (theme: Theme): void => {
    if (!isValidTheme(theme)) {
      console.error('Invalid theme provided:', theme);
      return;
    }

    try {
      setCurrentTheme(theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      console.log('Theme updated and saved:', theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  };

  // Reset to default theme
  const resetTheme = (): void => {
    try {
      setCurrentTheme(DEFAULT_THEME);
      localStorage.removeItem(THEME_STORAGE_KEY);
      console.log('Theme reset to default:', DEFAULT_THEME);
    } catch (error) {
      console.error('Error resetting theme:', error);
    }
  };

  const contextValue: ThemeContextType = {
    currentTheme,
    getTheme,
    setTheme,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
