
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
    recruiter_messages?: {
      welcome: string[];
      resume_offer: string[];
      schedule_offer: string[];
      jd_analysis: string[];
    };
  };
}

export type ResponseCategory = keyof ThemePersonality['sampleResponses'];

export interface RecruiterDetectionResponse {
  isRecruiter: boolean;
  detectedCompany: string | null;
  notes: string | null;
}

export interface ResumeVectorMatch {
  id: string;
  chunk_text: string;
  metadata: any;
  similarity: number;
}

export interface JobDescriptionAnalysis {
  id: string;
  report: string;
}

export interface GeneratedDocument {
  id: string;
  type: string;
  content: string;
}

export interface CalendarBooking {
  id: string;
  email: string;
  time: string;
  status: string;
}
