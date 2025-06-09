
import { supabase } from "@/integrations/supabase/client";
import { RecruiterDetectionResponse, ResumeVectorMatch, JobDescriptionAnalysis, GeneratedDocument, CalendarBooking } from "./types";

// Detect if visitor is a recruiter
export const detectRecruiter = async (): Promise<RecruiterDetectionResponse> => {
  try {
    // Get IP and user agent
    const ip = await fetch('https://api.ipify.org').then(res => res.text());
    const userAgent = navigator.userAgent;

    const response = await fetch('https://fxyzkgfpdtwcgrrgscgr.functions.supabase.co/detect-recruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip, userAgent }),
    });

    if (!response.ok) {
      throw new Error('Failed to detect recruiter');
    }

    return await response.json();
  } catch (error) {
    console.error('Error detecting recruiter:', error);
    return {
      isRecruiter: false,
      detectedCompany: null,
      notes: `Detection failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

// Search resume vectors with semantic search
export const searchResumeWithQuery = async (query: string, limit: number = 5): Promise<ResumeVectorMatch[]> => {
  try {
    const response = await fetch('https://fxyzkgfpdtwcgrrgscgr.functions.supabase.co/search-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, limit }),
    });

    if (!response.ok) {
      throw new Error('Failed to search resume');
    }

    const { matches } = await response.json();
    return matches;
  } catch (error) {
    console.error('Error searching resume:', error);
    return [];
  }
};

// Upload and analyze a job description
export const analyzeJobDescription = async (
  jobDescription: string,
  recruiterEmail?: string
): Promise<JobDescriptionAnalysis | null> => {
  try {
    const response = await fetch('https://fxyzkgfpdtwcgrrgscgr.functions.supabase.co/analyze-job-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        jobDescription, 
        recruiterEmail 
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze job description');
    }

    const { submission } = await response.json();
    return submission;
  } catch (error) {
    console.error('Error analyzing job description:', error);
    return null;
  }
};

// Generate a reference letter or skills summary
export const generateDocument = async (
  type: 'reference' | 'skills_summary' | 'leadership',
  context: string,
  requestedBy?: string
): Promise<GeneratedDocument | null> => {
  try {
    const response = await fetch('https://fxyzkgfpdtwcgrrgscgr.functions.supabase.co/generate-document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        type,
        context,
        requestedBy
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate document');
    }

    const { document } = await response.json();
    return document;
  } catch (error) {
    console.error('Error generating document:', error);
    return null;
  }
};

// Book a calendar meeting
export const bookCalendarMeeting = async (
  email: string,
  date: string,
  time: string,
  notes?: string
): Promise<CalendarBooking | null> => {
  try {
    const response = await fetch('https://fxyzkgfpdtwcgrrgscgr.functions.supabase.co/book-calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        date,
        time,
        notes
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to book calendar meeting');
    }

    const { booking } = await response.json();
    return booking;
  } catch (error) {
    console.error('Error booking calendar meeting:', error);
    return null;
  }
};

// Log AI conversation
export const logAIConversation = async (
  sessionId: string,
  transcript: string,
  type: string = 'general',
  userId?: string
): Promise<{ id: string, summary: string } | null> => {
  try {
    const response = await fetch('https://fxyzkgfpdtwcgrrgscgr.functions.supabase.co/log-conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        sessionId,
        userId,
        type,
        transcript
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to log conversation');
    }

    const { conversation } = await response.json();
    return conversation;
  } catch (error) {
    console.error('Error logging conversation:', error);
    return null;
  }
};
