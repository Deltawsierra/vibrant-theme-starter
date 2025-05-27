
import { useTheme } from '@/context/ThemeContext';

/**
 * Hook for loading theme-specific assets
 * Provides utilities for accessing theme-specific images, fonts, and other assets
 */

export interface ThemeAssets {
  fonts: {
    primary: string;
    secondary?: string;
    fallback: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  getAssetPath: (fileName: string) => string;
}

/**
 * Hook that provides theme-specific asset utilities
 * @returns Object with theme asset helpers
 */
export const useThemeAssets = (): ThemeAssets => {
  const { currentTheme } = useTheme();

  const themeAssets: Record<string, ThemeAssets> = {
    minimalist: {
      fonts: {
        primary: 'font-magneti',
        fallback: 'font-sans'
      },
      colors: {
        primary: 'text-minimalist-900',
        secondary: 'text-minimalist-600',
        accent: 'text-minimalist-700',
        background: 'bg-minimalist-100'
      },
      getAssetPath: (fileName: string) => `/src/themes/minimalist/assets/${fileName}`
    },
    'retro-arcade': {
      fonts: {
        primary: 'font-orbitron',
        secondary: 'font-pixel',
        fallback: 'font-mono'
      },
      colors: {
        primary: 'text-arcade-neon-green',
        secondary: 'text-arcade-neon-cyan',
        accent: 'text-arcade-neon-yellow',
        background: 'bg-arcade-dark-300'
      },
      getAssetPath: (fileName: string) => `/src/themes/retro-arcade/assets/${fileName}`
    },
    storytelling: {
      fonts: {
        primary: 'font-crimson',
        fallback: 'font-serif'
      },
      colors: {
        primary: 'text-story-ink',
        secondary: 'text-story-warm-600',
        accent: 'text-story-warm-500',
        background: 'bg-story-parchment'
      },
      getAssetPath: (fileName: string) => `/src/themes/storytelling/assets/${fileName}`
    },
    '3d-interactive': {
      fonts: {
        primary: 'font-inter',
        fallback: 'font-sans'
      },
      colors: {
        primary: 'text-white',
        secondary: 'text-threed-blue-400',
        accent: 'text-threed-blue-500',
        background: 'bg-threed-slate-900'
      },
      getAssetPath: (fileName: string) => `/src/themes/3d-interactive/assets/${fileName}`
    },
    ecommerce: {
      fonts: {
        primary: 'font-source-sans',
        fallback: 'font-sans'
      },
      colors: {
        primary: 'text-gray-900',
        secondary: 'text-ecommerce-primary-600',
        accent: 'text-ecommerce-primary-500',
        background: 'bg-gray-50'
      },
      getAssetPath: (fileName: string) => `/src/themes/ecommerce/assets/${fileName}`
    },
    videography: {
      fonts: {
        primary: 'font-montserrat',
        fallback: 'font-sans'
      },
      colors: {
        primary: 'text-white',
        secondary: 'text-video-gold-400',
        accent: 'text-video-gold-500',
        background: 'bg-video-cinematic'
      },
      getAssetPath: (fileName: string) => `/src/themes/videography/assets/${fileName}`
    }
  };

  return themeAssets[currentTheme] || themeAssets.minimalist;
};

/**
 * Get theme-specific CSS classes for common components
 * @param component - Component type (button, card, text, etc.)
 * @returns Object with CSS class combinations
 */
export const useThemeClasses = (component: 'button' | 'card' | 'text' | 'nav' = 'text') => {
  const { currentTheme } = useTheme();
  const assets = useThemeAssets();

  const componentClasses = {
    button: {
      minimalist: 'bg-minimalist-200 text-minimalist-900 hover:bg-minimalist-300 border border-minimalist-400',
      'retro-arcade': 'bg-arcade-dark-100 text-arcade-neon-green border-2 border-arcade-neon-green hover:bg-arcade-neon-green hover:text-arcade-dark-300 arcade-neon-glow',
      storytelling: 'bg-story-warm-100 text-story-ink hover:bg-story-warm-200 border border-story-warm-300',
      '3d-interactive': 'bg-threed-slate-800 text-white hover:bg-threed-blue-600 border border-threed-slate-700',
      ecommerce: 'bg-ecommerce-primary-600 text-white hover:bg-ecommerce-primary-700',
      videography: 'bg-video-gold-500 text-black hover:bg-video-gold-600 font-medium'
    },
    card: {
      minimalist: 'bg-minimalist-100 border border-minimalist-300 shadow-sm',
      'retro-arcade': 'bg-arcade-dark-200 border-2 border-arcade-neon-cyan arcade-scanlines',
      storytelling: 'bg-story-parchment border border-story-warm-300 shadow-md',
      '3d-interactive': 'bg-threed-slate-800 bg-opacity-90 border border-threed-slate-700 backdrop-blur-sm',
      ecommerce: 'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow',
      videography: 'bg-black bg-opacity-80 border border-gray-700 backdrop-blur-sm'
    },
    text: {
      minimalist: `${assets.fonts.primary} ${assets.colors.primary}`,
      'retro-arcade': `${assets.fonts.primary} ${assets.colors.primary} arcade-neon-glow`,
      storytelling: `${assets.fonts.primary} ${assets.colors.primary}`,
      '3d-interactive': `${assets.fonts.primary} ${assets.colors.primary}`,
      ecommerce: `${assets.fonts.primary} ${assets.colors.primary}`,
      videography: `${assets.fonts.primary} ${assets.colors.primary}`
    },
    nav: {
      minimalist: 'bg-minimalist-200 border-minimalist-300',
      'retro-arcade': 'bg-arcade-dark-200 border-arcade-neon-cyan',
      storytelling: 'bg-story-parchment border-story-warm-300',
      '3d-interactive': 'bg-threed-slate-800 bg-opacity-90 border-threed-slate-700 backdrop-blur-sm',
      ecommerce: 'bg-white border-gray-200 shadow-sm',
      videography: 'bg-black bg-opacity-90 border-gray-700 backdrop-blur-sm'
    }
  };

  return componentClasses[component][currentTheme] || componentClasses[component].minimalist;
};
