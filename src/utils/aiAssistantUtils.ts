
import { type Theme } from '@/context/ThemeContext';

// Re-export types and functions from the modular AI utilities
export type { ThemePersonality, ResponseCategory } from './ai/types';
export { getThemePersonality } from './ai/personalities';
export { generateAIResponse } from './ai/responseGenerator';
export { getVocabularyEnding } from './ai/vocabularyEndings';
