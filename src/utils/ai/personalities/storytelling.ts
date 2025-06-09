
import { type ThemePersonality } from '../types';

export const storytellingPersonality: ThemePersonality = {
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
    greetings: ['Greetings, noble one!', 'Well met, traveler!', 'Hail and well met!'],
    encouragement: ['Onward, brave soul!', 'Thy quest continues!', 'Victory awaits!'],
    goodbyes: ['Farewell, noble guest!', 'May thy journey be prosperous!', 'Until we meet again!'],
    jokes: ['What do you call a debugging knight? Sir Logs-a-lot!', 'Why did the knight become a developer? For the code of honor!'],
    idle_prompts: ['Dost thou require assistance?', 'What tale shall we explore?', 'How may I serve thee?'],
  },
};
