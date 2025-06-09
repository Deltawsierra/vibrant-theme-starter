
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { detectRecruiter } from '@/utils/ai/recruiters';
import { RecruiterDetectionResponse } from '@/utils/ai/types';
import { useTheme } from '@/context/ThemeContext';
import AIAssistant from './AIAssistant';

interface AIRecruiterDetectorProps {
  children: React.ReactNode;
}

export const AIRecruiterContext = React.createContext<{
  isRecruiter: boolean;
  recruiterInfo: RecruiterDetectionResponse | null;
  isLoading: boolean;
}>({
  isRecruiter: false,
  recruiterInfo: null,
  isLoading: true
});

const AIRecruiterDetector: React.FC<AIRecruiterDetectorProps> = ({ children }) => {
  const [isRecruiter, setIsRecruiter] = useState<boolean>(false);
  const [recruiterInfo, setRecruiterInfo] = useState<RecruiterDetectionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasDetected, setHasDetected] = useState<boolean>(false);
  const { toast } = useToast();
  const { currentTheme } = useTheme();

  // Check local storage first to avoid repeating detection on every page load
  useEffect(() => {
    const storedRecruiterStatus = localStorage.getItem('recruiter_detection');
    
    if (storedRecruiterStatus) {
      try {
        const parsed = JSON.parse(storedRecruiterStatus);
        setIsRecruiter(parsed.isRecruiter);
        setRecruiterInfo(parsed);
        setIsLoading(false);
        setHasDetected(true);
      } catch (e) {
        // Invalid stored data, will re-detect
        localStorage.removeItem('recruiter_detection');
      }
    }
  }, []);

  // Only run detection if it hasn't been done yet
  useEffect(() => {
    const detectVisitor = async () => {
      if (hasDetected) return;
      
      try {
        setIsLoading(true);
        const response = await detectRecruiter();
        
        setIsRecruiter(response.isRecruiter);
        setRecruiterInfo(response);
        
        // Store in localStorage to avoid re-detecting on each page load
        localStorage.setItem('recruiter_detection', JSON.stringify(response));
        
        // Show specialized notification if recruiter detected
        if (response.isRecruiter) {
          // We'll use toast instead of implementing a popup
          toast({
            title: "Welcome, Recruiter!",
            description: "AI assistant is available to help with resume access and scheduling.",
            duration: 5000,
          });
        }
      } catch (error) {
        console.error("Error detecting recruiter:", error);
      } finally {
        setIsLoading(false);
        setHasDetected(true);
      }
    };

    if (!hasDetected) {
      detectVisitor();
    }
  }, [hasDetected, toast]);

  return (
    <AIRecruiterContext.Provider value={{ isRecruiter, recruiterInfo, isLoading }}>
      {children}
    </AIRecruiterContext.Provider>
  );
};

export default AIRecruiterDetector;
