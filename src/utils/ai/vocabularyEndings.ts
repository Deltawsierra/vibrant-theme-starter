
import { type Theme } from '@/context/ThemeContext';

export const getVocabularyEnding = (vocab: string, theme: Theme): string => {
  const endings: Record<Theme, Record<string, string>> = {
    minimalist: {
      efficient: 'Efficiency optimized.',
      direct: 'Direct approach confirmed.',
      optimal: 'Optimal solution provided.',
      clean: 'Clean interface maintained.',
      precise: 'Precision achieved.',
    },
    'retro-arcade': {
      'level up': 'Time to level up!',
      'boss battle': 'Boss battle incoming!',
      '1-up': 'You earned a 1-up!',
      'game over': 'Game on, player!',
      'bonus stage': 'Bonus stage unlocked!',
      'power-up': 'Power-up collected!',
      GG: 'GG, well played!',
      combo: 'Combo multiplier activated!',
      'high score': 'New high score achieved!',
      player: 'Player One ready!',
    },
    storytelling: {
      quest: 'May thy quest be fruitful!',
      journey: 'Safe journeys, noble one!',
      tale: 'Thus ends this tale.',
      honor: 'Honor be unto thee!',
      valiant: 'Most valiant indeed!',
      noble: 'Nobility befits thee!',
      chronicle: 'Let the chronicles record this!',
      saga: 'The saga continues!',
    },
    '3d-interactive': {
      scan: 'Scan complete.',
      upload: 'Data uploaded successfully.',
      navigate: 'Navigation systems online.',
      portal: 'Portal access granted.',
      node: 'Node connection established.',
      core: 'Core systems operational.',
      render: 'Rendering complete.',
      matrix: 'Matrix synchronized.',
      dimension: 'Dimensional shift detected.',
    },
    ecommerce: {
      checkout: 'Ready to checkout!',
      deal: 'What a deal!',
      premium: 'Premium experience delivered!',
      featured: 'Featured recommendation!',
      exclusive: 'Exclusive access granted!',
      trending: 'Trending now!',
      bestseller: 'Bestseller status!',
      cart: 'Added to cart!',
    },
    videography: {
      action: 'And... action!',
      cut: 'Cut! Perfect take!',
      scene: 'Scene completed!',
      take: 'That\'s a wrap on this take!',
      wrap: 'And that\'s a wrap!',
      premiere: 'Ready for premiere!',
      reel: 'Rolling the highlight reel!',
      spotlight: 'You\'re in the spotlight!',
      'director\'s cut': 'Director\'s cut approved!',
    },
  };
  
  return endings[theme]?.[vocab] || '';
};
