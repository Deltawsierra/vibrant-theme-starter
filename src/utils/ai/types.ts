
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
    greetings: string[];
    encouragement: string[];
    goodbyes: string[];
    jokes: string[];
    idle_prompts: string[];
    fun_facts?: string[];
    project_inquiries?: string[];
    achievements?: string[];
    banter?: string[];
  };
}

export type ResponseCategory = keyof ThemePersonality['sampleResponses'];
