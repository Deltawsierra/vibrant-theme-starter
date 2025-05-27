
import { useTheme } from '@/context/ThemeContext';

/**
 * Theme utility hooks and helpers
 * Extended utilities for working with the theme system
 */

/**
 * Hook that provides theme-specific utilities and helpers
 * @returns Object with theme utilities
 */
export const useThemeUtils = () => {
  const { currentTheme, setTheme, getTheme, resetTheme } = useTheme();

  /**
   * Check if current theme matches a specific theme
   * @param theme - Theme to check against
   * @returns boolean
   */
  const isTheme = (theme: string): boolean => {
    return currentTheme === theme;
  };

  /**
   * Get theme-specific CSS classes for common elements
   * @returns Object with CSS class strings
   */
  const getThemeClasses = () => {
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
  };

  /**
   * Get all available themes with metadata
   * @returns Array of theme objects
   */
  const getAvailableThemes = () => {
    return [
      { id: 'minimalist', name: 'Minimalist', description: 'Clean, typography-focused design' },
      { id: 'retro-arcade', name: 'Retro Arcade', description: 'Vibrant, pixel-art inspired aesthetics' },
      { id: 'storytelling', name: 'Storytelling', description: 'Narrative-driven, immersive experience' },
      { id: '3d-interactive', name: '3D Interactive', description: 'Three-dimensional elements with depth' },
      { id: 'ecommerce', name: 'E-commerce', description: 'Product showcase with shopping features' },
      { id: 'videography', name: 'Videography', description: 'Media-rich, cinematic presentation' }
    ];
  };

  return {
    currentTheme,
    setTheme,
    getTheme,
    resetTheme,
    isTheme,
    getThemeClasses,
    getAvailableThemes
  };
};

/**
 * Hook for theme-aware conditional rendering
 * @param themeMap - Object mapping themes to values
 * @param fallback - Default value if theme not found
 * @returns Value for current theme or fallback
 */
export const useThemeValue = <T>(themeMap: Partial<Record<string, T>>, fallback: T): T => {
  const { currentTheme } = useTheme();
  return themeMap[currentTheme] || fallback;
};
