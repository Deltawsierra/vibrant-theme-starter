
import { type Theme } from '@/context/ThemeContext';

export interface ThemePersonality {
  name: string;
  role: string;
  welcomeMessage: string;
  inputPlaceholder: string;
  vocabulary: string[];
  sampleResponses: {
    navigation: string[];
    resume: string[];
    help: string[];
    easter_eggs: string[];
  };
}

export const getThemePersonality = (theme: Theme): ThemePersonality => {
  const personalities: Record<Theme, ThemePersonality> = {
    minimalist: {
      name: 'Assistant',
      role: 'Digital Helper',
      welcomeMessage: 'How may I help you?',
      inputPlaceholder: 'Type your question...',
      vocabulary: ['efficient', 'direct', 'optimal', 'clean', 'precise'],
      sampleResponses: {
        navigation: [
          'You can view my resume here.',
          'Navigation: Home, About, Work, Showcase, Contact.',
          'Please specify your request.',
        ],
        resume: [
          'Skills: React, TypeScript, AWS, Node.js.',
          'Experience: 9+ years full-stack development.',
          'Certifications: AWS Solutions Architect, Meta Frontend.',
        ],
        help: [
          'I assist with navigation and information.',
          'Ask about skills, experience, or projects.',
          'How may I help you efficiently?',
        ],
        easter_eggs: [
          'Simplicity is the ultimate sophistication.',
          'Less is more.',
          'Clean code speaks louder than comments.',
        ],
      },
    },
    'retro-arcade': {
      name: 'Pixel',
      role: 'Arcade Owner',
      welcomeMessage: 'Yo, Player! Ready to level up and explore my dev achievements?',
      inputPlaceholder: 'Type your command, player...',
      vocabulary: ['level up', 'boss battle', '1-up', 'game over', 'bonus stage', 'power-up', 'GG', 'combo'],
      sampleResponses: {
        navigation: [
          'Smash that button if you want to see my work history!',
          'Wanna check out the high-score board? Head to the Portfolio!',
          'Insert coin to unlock resume stats!',
          'Ready Player One? Pick your adventure: About, Work, or Showcase!',
        ],
        resume: [
          'This dev has completed 50K+ user migration missions!',
          'Achievement Unlocked: AWS Cloud Solutions Architect!',
          'Combo move: React + TypeScript + 9 years XP = Boss-level skills!',
          'Power-up inventory: Node.js, Python, Docker, Kubernetes!',
        ],
        help: [
          'Need a walkthrough? I got your back, player!',
          'Stuck on a level? Ask me about navigation or dev stats!',
          'Looking for Easter eggs? Try asking about secret achievements!',
        ],
        easter_eggs: [
          '↑↑↓↓←→←→BA - Unlimited coffee cheat code activated!',
          'Secret area unlocked: This dev once debugged code for 12 hours straight!',
          'Bonus fact: First programming language was BASIC on a Commodore 64!',
          'Hidden achievement: Has beaten Dark Souls while writing TypeScript!',
        ],
      },
    },
    storytelling: {
      name: 'Sir Codealot',
      role: 'Knight of the Code',
      welcomeMessage: 'Hail, noble guest! How may I serve thee upon thy quest for knowledge?',
      inputPlaceholder: 'Speak thy query, noble visitor...',
      vocabulary: ['quest', 'journey', 'tale', 'honor', 'valiant', 'noble', 'chronicle', 'saga'],
      sampleResponses: {
        navigation: [
          'Wouldst thou journey to the Portfolio, or peruse the Gallery of Achievements?',
          'The tome of experience lies within the Work section, good sir!',
          'Perchance thou seekest knowledge of my master\'s deeds?',
        ],
        resume: [
          'Behold! A tale of 9 years spent mastering the arcane arts of code!',
          'The Chronicles speak of great battles fought with AWS and victories won!',
          'In the realm of React and TypeScript, few warriors match this prowess!',
          'Many guilds have sought his wisdom: Digital Systems Forge bears witness!',
        ],
        help: [
          'Ask, and thy request shall be answered in kind, noble traveler!',
          'I am thy humble guide through these digital realms!',
          'What knowledge dost thou seek from the scrolls of experience?',
        ],
        easter_eggs: [
          'Legend tells of a developer who once coded through three sunrises without rest!',
          'In yonder archives lies the tale of the Great Migration of Fifty Thousand Users!',
          'Tis said that this knight can debug code with naught but console.log and determination!',
          'A secret quest: Seek ye the hidden comments in the source code!',
        ],
      },
    },
    '3d-interactive': {
      name: 'Nova',
      role: 'AI Explorer',
      welcomeMessage: 'Greetings, explorer! What would you like to discover in this digital dimension?',
      inputPlaceholder: 'Initialize query protocol...',
      vocabulary: ['scan', 'upload', 'navigate', 'portal', 'node', 'core', 'render', 'matrix', 'dimension'],
      sampleResponses: {
        navigation: [
          'Initiating navigation protocols. Where shall we warp to?',
          'You can zoom, rotate, or jump to any portal—just ask!',
          'Need a quick scan of this 3D workspace, or want to access the Resume Hub?',
        ],
        resume: [
          'Scanning data cores... Delta\'s experience matrix shows 9+ years of evolution!',
          'Node analysis complete: Expertise clusters in React, AWS, and Node.js detected!',
          'Achievement database upload: Multiple certifications and successful migrations logged!',
        ],
        help: [
          'My sensors indicate you\'re exploring. What data do you seek?',
          'I can guide you through any portal or render information on demand!',
          'Curious about Delta\'s mission history? I have the complete database!',
        ],
        easter_eggs: [
          'Hidden subroutine detected: This developer once built a 3D renderer from scratch!',
          'Secret node discovered: There\'s a virtual pet hidden in one of the projects!',
          'Dimensional fact: The source code contains references to 42 different technologies!',
          'Anomaly detected: Coffee consumption spikes correlate directly with bug fix rates!',
        ],
      },
    },
    ecommerce: {
      name: 'Sam',
      role: 'Digital Shopkeeper',
      welcomeMessage: 'Hi there! Looking for something specific, or need help browsing the dev portfolio?',
      inputPlaceholder: 'What can I help you find?',
      vocabulary: ['checkout', 'deal', 'premium', 'featured', 'exclusive', 'trending', 'bestseller', 'cart'],
      sampleResponses: {
        navigation: [
          'Want the inside scoop on Delta\'s experience? Check out our featured Work section!',
          'Need to browse the skill inventory? The About page has everything in stock!',
          'Ready to checkout the portfolio? I\'ve got the premium showcase ready!',
        ],
        resume: [
          'Premium developer package: 9+ years experience, fully stocked with modern skills!',
          'Bestseller alert: AWS + React combo—this dev\'s most popular skill set!',
          'Exclusive deal: Enterprise-level solutions with startup agility included!',
          'Customer reviews: 50K+ users successfully migrated with zero downtime!',
        ],
        help: [
          'Need assistance finding what you\'re looking for? I\'m here to help!',
          'Want recommendations based on your tech stack? Just let me know!',
          'Looking for deals on development services? Let\'s chat!',
        ],
        easter_eggs: [
          'Secret coupon code: COFFEE20 - This dev runs on caffeine!',
          'Hidden feature: Built an e-commerce platform that processes millions in revenue!',
          'Loyalty program perk: Repeat clients get architectural consulting bonuses!',
          'Flash sale fact: Once optimized a checkout flow to increase conversions by 40%!',
        ],
      },
    },
    videography: {
      name: 'Director Blake',
      role: 'Creative Director',
      welcomeMessage: 'Lights, camera, action! What scene can I cue up for you today?',
      inputPlaceholder: 'What\'s your next take?',
      vocabulary: ['action', 'cut', 'scene', 'take', 'wrap', 'premiere', 'reel', 'spotlight', 'director\'s cut'],
      sampleResponses: {
        navigation: [
          'Want the director\'s cut of Delta\'s latest work? Roll camera on the Portfolio!',
          'Ready for a behind-the-scenes look? The About section is pure gold!',
          'Cut to the chase: Pick your scene—About, Work, or the highlight reel!',
        ],
        resume: [
          'And... action! This developer\'s reel shows 9 years of blockbuster projects!',
          'Behind the scenes: Starring in enterprise solutions with supporting AWS!',
          'Critics\' choice: "Masterful performance in full-stack development!"',
          'Box office hit: 50K+ users served with zero downtime—now that\'s a wrap!',
        ],
        help: [
          'Need direction? I\'m here to help you navigate this production!',
          'Want the spotlight on any particular skill or project?',
          'Looking for the blooper reel? Ask me about fun development stories!',
        ],
        easter_eggs: [
          'Blooper reel: Once accidentally deployed to production on a Friday at 5 PM!',
          'Director\'s commentary: This dev can code while directing standup meetings!',
          'Behind the scenes: The portfolio site you\'re viewing was built in record time!',
          'End credits scene: Hidden message in the console logs—check it out!',
        ],
      },
    },
  };

  return personalities[theme];
};

export const generateAIResponse = async (userInput: string, theme: Theme): Promise<string> => {
  const personality = getThemePersonality(theme);
  const input = userInput.toLowerCase();
  
  // Determine response category
  let responseCategory: keyof typeof personality.sampleResponses = 'help';
  
  if (input.includes('navigation') || input.includes('where') || input.includes('go') || input.includes('page')) {
    responseCategory = 'navigation';
  } else if (input.includes('resume') || input.includes('skill') || input.includes('experience') || input.includes('work') || input.includes('project')) {
    responseCategory = 'resume';
  } else if (input.includes('easter') || input.includes('secret') || input.includes('hidden') || input.includes('fun')) {
    responseCategory = 'easter_eggs';
  }
  
  const responses = personality.sampleResponses[responseCategory];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Add some variety with vocabulary
  if (Math.random() > 0.7) {
    const vocab = personality.vocabulary[Math.floor(Math.random() * personality.vocabulary.length)];
    return `${randomResponse} ${getVocabularyEnding(vocab, theme)}`;
  }
  
  return randomResponse;
};

const getVocabularyEnding = (vocab: string, theme: Theme): string => {
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
