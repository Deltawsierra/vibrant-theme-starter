
import { type ThemePersonality } from '../types';

export const threeDInteractivePersonality: ThemePersonality = {
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
    greetings: ['Welcome, explorer!', 'Dimensional portal activated!', 'Systems online!'],
    encouragement: ['Navigation successful!', 'Data stream optimal!', 'Portal access granted!'],
    goodbyes: ['Portal closing!', 'Safe travels, explorer!', 'Until next dimension!'],
    jokes: ['Why do 3D developers never get lost? They always know their coordinates!', 'What\'s a 3D artist\'s favorite type of music? Depth metal!'],
    idle_prompts: ['Awaiting next command...', 'Ready to explore?', 'What dimension shall we visit?'],
  },
};
