
import { type Theme } from '@/context/ThemeContext';

export const getAIThemeStyles = (currentTheme: Theme) => {
  const styles = {
    minimalist: {
      container: 'bg-white border-gray-300 text-gray-900 shadow-xl',
      speechBubble: 'bg-white border-2 border-gray-300 text-gray-900',
      bubblePointer: 'border-t-gray-300',
      button: 'bg-gray-800 hover:bg-gray-700 text-white',
      input: 'border-gray-300 focus:border-gray-500 bg-white',
      avatar: 'bg-gradient-to-br from-gray-100 to-gray-200'
    },
    'retro-arcade': {
      container: 'bg-arcade-dark-300 border-2 border-arcade-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.5)]',
      speechBubble: 'bg-arcade-dark-200 border-2 border-arcade-neon-green text-arcade-neon-green shadow-[0_0_10px_rgba(0,255,0,0.3)]',
      bubblePointer: 'border-t-arcade-neon-green',
      button: 'bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-arcade-dark-300',
      input: 'bg-arcade-dark-100 border-arcade-neon-cyan text-arcade-neon-green placeholder-arcade-neon-cyan/50',
      avatar: 'bg-gradient-to-br from-amber-200 to-amber-300'
    },
    storytelling: {
      container: 'bg-story-parchment border-2 border-story-warm-400 shadow-xl',
      speechBubble: 'bg-story-parchment border-2 border-story-warm-300 text-story-ink shadow-lg',
      bubblePointer: 'border-t-story-warm-300',
      button: 'bg-story-warm-600 hover:bg-story-warm-700 text-white',
      input: 'border-story-warm-300 focus:border-story-warm-500 bg-story-warm-50',
      avatar: 'bg-gradient-to-br from-blue-300 to-blue-500'
    },
    '3d-interactive': {
      container: 'bg-threed-slate-900/95 border-2 border-threed-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] backdrop-blur-sm',
      speechBubble: 'bg-threed-slate-800/90 border-2 border-threed-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm',
      bubblePointer: 'border-t-threed-blue-400',
      button: 'bg-threed-blue-600 hover:bg-threed-blue-700 text-white',
      input: 'bg-threed-slate-700 border-threed-blue-500 text-white placeholder-white/50',
      avatar: 'bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400'
    },
    ecommerce: {
      container: 'bg-white border-2 border-ecommerce-primary-300 shadow-xl',
      speechBubble: 'bg-white border-2 border-ecommerce-primary-200 text-gray-900 shadow-lg',
      bubblePointer: 'border-t-ecommerce-primary-200',
      button: 'bg-ecommerce-primary-600 hover:bg-ecommerce-primary-700 text-white',
      input: 'border-ecommerce-primary-300 focus:border-ecommerce-primary-500 bg-white',
      avatar: 'bg-gradient-to-br from-amber-200 to-amber-300'
    },
    videography: {
      container: 'bg-black/95 border-2 border-video-gold-500 shadow-[0_0_25px_rgba(251,191,36,0.4)] backdrop-blur-sm',
      speechBubble: 'bg-gray-900/90 border-2 border-video-gold-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.2)] backdrop-blur-sm',
      bubblePointer: 'border-t-video-gold-400',
      button: 'bg-video-gold-500 hover:bg-video-gold-600 text-black',
      input: 'bg-gray-800 border-video-gold-500 text-white placeholder-white/50',
      avatar: 'bg-gradient-to-br from-amber-200 to-amber-300'
    }
  };

  return styles[currentTheme] || styles.minimalist;
};
