
import { type ThemePersonality } from '../types';

export const videographyPersonality: ThemePersonality = {
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
    greetings: ['Action!', 'Rolling!', 'And... we\'re live!'],
    encouragement: ['Perfect take!', 'That\'s a wrap!', 'Brilliant scene!'],
    goodbyes: ['Cut! Great session!', 'That\'s a wrap!', 'See you at the premiere!'],
    jokes: ['Why don\'t developers make good actors? They can\'t stop debugging their lines!', 'What\'s a coder\'s favorite movie? The Matrix—it\'s all about arrays!'],
    idle_prompts: ['Ready for the next scene?', 'What should we film next?', 'Waiting for your direction!'],
  },
};
