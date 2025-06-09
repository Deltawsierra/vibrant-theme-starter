
import { type Theme } from '@/context/ThemeContext';
import { type ResponseCategory } from './types';
import { getThemePersonality } from './personalities';
import { getVocabularyEnding } from './vocabularyEndings';

export const generateAIResponse = async (userInput: string, theme: Theme): Promise<string> => {
  const personality = getThemePersonality(theme);
  const input = userInput.toLowerCase();
  
  // Determine response category with more variety
  let responseCategory: ResponseCategory = 'help';
  
  // Greeting detection
  if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('sup')) {
    responseCategory = 'greetings';
  }
  // Navigation detection
  else if (input.includes('navigation') || input.includes('where') || input.includes('go') || input.includes('page') || input.includes('menu')) {
    responseCategory = 'navigation';
  }
  // Resume/work detection
  else if (input.includes('resume') || input.includes('skill') || input.includes('experience') || input.includes('work') || input.includes('project') || input.includes('achievement')) {
    responseCategory = 'resume';
  }
  // Easter egg detection
  else if (input.includes('easter') || input.includes('secret') || input.includes('hidden') || input.includes('fun') || input.includes('joke') || input.includes('fact')) {
    responseCategory = 'easter_eggs';
  }
  // Goodbye detection
  else if (input.includes('bye') || input.includes('goodbye') || input.includes('see you') || input.includes('thanks')) {
    responseCategory = 'goodbyes';
  }
  // Encouragement detection
  else if (input.includes('help') || input.includes('encourage') || input.includes('motivate') || input.includes('good job')) {
    responseCategory = 'encouragement';
  }
  // Joke detection
  else if (input.includes('joke') || input.includes('funny') || input.includes('laugh')) {
    responseCategory = 'jokes';
  }
  
  const responses = personality.sampleResponses[responseCategory];
  let randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  // Add some variety with vocabulary (30% chance)
  if (Math.random() > 0.7) {
    const vocab = personality.vocabulary[Math.floor(Math.random() * personality.vocabulary.length)];
    const ending = getVocabularyEnding(vocab, theme);
    if (ending) {
      randomResponse = `${randomResponse} ${ending}`;
    }
  }
  
  // Add idle prompts occasionally for engagement (20% chance)
  if (Math.random() > 0.8 && personality.sampleResponses.idle_prompts) {
    const idlePrompt = personality.sampleResponses.idle_prompts[Math.floor(Math.random() * personality.sampleResponses.idle_prompts.length)];
    randomResponse = `${randomResponse} ${idlePrompt}`;
  }
  
  return randomResponse;
};
