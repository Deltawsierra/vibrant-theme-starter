
import { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

/**
 * Optimized theme utility hook with memoized calculations
 */
export const useThemeOptimized = () => {
  const { currentTheme, setTheme, getTheme, resetTheme } = useTheme();

  const themeClasses = useMemo(() => {
    const baseClasses = {
      minimalist: {
        background: 'bg-white dark:bg-gray-900',
        text: 'text-gray-900 dark:text-gray-100',
        accent: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-700'
      },
      'retro-arcade': {
        background: 'bg-black',
        text: 'text-green-400',
        accent: 'text-yellow-400',
        border: 'border-cyan-400'
      },
      'storytelling': {
        background: 'bg-amber-50',
        text: 'text-amber-900',
        accent: 'text-amber-700',
        border: 'border-amber-200'
      },
      '3d-interactive': {
        background: 'bg-slate-900',
        text: 'text-white',
        accent: 'text-blue-400',
        border: 'border-slate-700'
      },
      'ecommerce': {
        background: 'bg-gray-50',
        text: 'text-gray-900',
        accent: 'text-blue-600',
        border: 'border-gray-200'
      },
      'videography': {
        background: 'bg-black',
        text: 'text-white',
        accent: 'text-amber-400',
        border: 'border-gray-700'
      }
    };

    return baseClasses[currentTheme as keyof typeof baseClasses] || baseClasses.minimalist;
  }, [currentTheme]);

  const isTheme = useMemo(() => (theme: string) => currentTheme === theme, [currentTheme]);

  return {
    currentTheme,
    setTheme,
    getTheme,
    resetTheme,
    isTheme,
    themeClasses
  };
};
