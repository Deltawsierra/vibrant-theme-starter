
import { type ThemePersonality } from '../types';

export const minimalistPersonality: ThemePersonality = {
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
    greetings: ['Hello.', 'Good day.', 'How may I assist?'],
    encouragement: ['Proceed efficiently.', 'Optimal approach.', 'Well executed.'],
    goodbyes: ['Goodbye.', 'Task completed.', 'Until next time.'],
    jokes: ['Error 404: Humor not found.', 'Why debug when you can rewrite?', 'Clean code is readable code.'],
    idle_prompts: ['Need assistance?', 'Ready to help.', 'Standing by.'],
  },
};
