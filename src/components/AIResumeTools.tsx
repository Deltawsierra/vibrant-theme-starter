
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, FileText, Award, Clock, Upload } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { type Theme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { analyzeJobDescription, generateDocument, bookCalendarMeeting } from '@/utils/ai/recruiters';

interface AIResumeToolsProps {
  theme: Theme;
}

const AIResumeTools: React.FC<AIResumeToolsProps> = ({ theme }) => {
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resume');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [bookingTime, setBookingTime] = useState('');
  const [skillsPrompt, setSkillsPrompt] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const { toast } = useToast();

  // Styling based on theme
  const getButtonClass = () => {
    switch (theme) {
      case 'retro-arcade':
        return 'bg-arcade-neon-yellow hover:bg-arcade-neon-cyan text-arcade-dark-300 font-pixel border-2 border-arcade-dark-300 w-full mb-2 text-sm';
      case 'minimalist':
        return 'bg-gray-800 hover:bg-gray-700 text-white w-full mb-2 text-sm';
      case 'storytelling':
        return 'bg-story-warm-600 hover:bg-story-warm-700 text-white w-full mb-2 text-sm';
      case '3d-interactive':
        return 'bg-threed-blue-600 hover:bg-threed-blue-700 text-white w-full mb-2 text-sm';
      case 'ecommerce':
        return 'bg-ecommerce-primary-600 hover:bg-ecommerce-primary-700 text-white w-full mb-2 text-sm';
      case 'videography':
        return 'bg-video-gold-500 hover:bg-video-gold-600 text-black w-full mb-2 text-sm';
      default:
        return 'bg-gray-800 hover:bg-gray-700 text-white w-full mb-2 text-sm';
    }
  };

  const getIconClass = () => {
    switch (theme) {
      case 'retro-arcade':
        return 'text-arcade-neon-yellow';
      case 'minimalist':
        return 'text-gray-300';
      case 'storytelling':
        return 'text-story-warm-300';
      case '3d-interactive':
        return 'text-threed-blue-300';
      case 'ecommerce':
        return 'text-ecommerce-primary-300';
      case 'videography':
        return 'text-video-gold-300';
      default:
        return 'text-gray-300';
    }
  };

  const getLabelClass = () => {
    switch (theme) {
      case 'retro-arcade':
        return 'text-arcade-neon-green font-pixel';
      case 'minimalist':
        return 'text-gray-700';
      case 'storytelling':
        return 'text-story-warm-600';
      case '3d-interactive':
        return 'text-threed-blue-300';
      case 'ecommerce':
        return 'text-ecommerce-primary-600';
      case 'videography':
        return 'text-video-gold-500';
      default:
        return 'text-gray-700';
    }
  };

  const getDialogTitleClass = () => {
    switch (theme) {
      case 'retro-arcade':
        return 'text-arcade-neon-cyan font-pixel text-xl';
      case 'minimalist':
        return 'text-gray-900 text-xl font-semibold';
      default:
        return 'text-xl font-semibold';
    }
  };

  // Handle downloading resume
  const handleDownloadResume = () => {
    // In a real implementation, we'd generate and provide a link to the resume
    toast({
      title: "Resume Ready",
      description: "Your resume PDF is downloading now...",
    });
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '/sample-resume.pdf'; // You'd use a real URL in production
    link.download = 'Portfolio_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle booking a meeting
  const handleBookMeeting = async () => {
    if (!bookingEmail || !bookingDate || !bookingTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const formattedDate = format(bookingDate, 'yyyy-MM-dd');
      const result = await bookCalendarMeeting(bookingEmail, formattedDate, bookingTime);

      if (result) {
        toast({
          title: "Meeting Scheduled",
          description: `Your meeting has been booked for ${format(bookingDate, 'MMMM d, yyyy')} at ${bookingTime}.`,
        });
        setBookingEmail('');
        setBookingDate(undefined);
        setBookingTime('');
      } else {
        throw new Error("Failed to schedule meeting");
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Could not schedule the meeting. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle generating a document
  const handleGenerateDocument = async (type: 'skills_summary' | 'reference' | 'leadership') => {
    if (!skillsPrompt) {
      toast({
        title: "Missing Information",
        description: "Please provide context for the document generation.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const document = await generateDocument(type, skillsPrompt, bookingEmail || undefined);
      
      if (document) {
        setGeneratedContent(document.content);
        toast({
          title: "Document Generated",
          description: `Your ${type.replace('_', ' ')} has been created successfully.`,
        });
      } else {
        throw new Error("Failed to generate document");
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate the document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle analyzing a job description
  const handleAnalyzeJobDescription = async () => {
    if (!jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide a job description for analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const analysis = await analyzeJobDescription(jobDescription, bookingEmail || undefined);
      
      if (analysis) {
        setGeneratedContent(analysis.report);
        toast({
          title: "Analysis Complete",
          description: "Job description analysis has been completed successfully.",
        });
      } else {
        throw new Error("Failed to analyze job description");
      }
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the job description. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Button 
          className={getButtonClass()}
          onClick={() => setResumeDialogOpen(true)}
        >
          <FileText className={`w-4 h-4 mr-2 ${getIconClass()}`}/>
          Resume & Tools
        </Button>
      </div>

      <Dialog open={resumeDialogOpen} onOpenChange={setResumeDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className={getDialogTitleClass()}>
              Portfolio Tools for Recruiters
            </DialogTitle>
            <DialogDescription>
              Access resume, book meetings, generate custom documents, or analyze job fit.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="resume" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="meeting">Meeting</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="analyze">Job Fit</TabsTrigger>
            </TabsList>
            
            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Download Resume</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Get the latest version of the portfolio resume in PDF format.
                </p>
                <Button onClick={handleDownloadResume}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download Resume PDF
                </Button>
              </div>
            </TabsContent>
            
            {/* Meeting Tab */}
            <TabsContent value="meeting" className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Schedule a Meeting</h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block mb-1 ${getLabelClass()}`}>Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="your-email@company.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className={`block mb-1 ${getLabelClass()}`}>Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !bookingDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {bookingDate ? format(bookingDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={bookingDate}
                          onSelect={setBookingDate}
                          initialFocus
                          disabled={(date) => 
                            date < new Date() || 
                            date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className={`block mb-1 ${getLabelClass()}`}>Select Time</label>
                    <select 
                      className="w-full p-2 border rounded-md bg-white"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleBookMeeting}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Book Meeting
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Generate Custom Document</h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block mb-1 ${getLabelClass()}`}>Your Context/Request</label>
                    <Textarea 
                      placeholder="Describe what you'd like to generate. For example: 'A summary of full-stack development skills' or 'A reference highlighting leadership abilities in tech teams'"
                      className="min-h-[100px]"
                      value={skillsPrompt}
                      onChange={(e) => setSkillsPrompt(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleGenerateDocument('skills_summary')}
                      disabled={isGenerating}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Skills Summary
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => handleGenerateDocument('reference')}
                      disabled={isGenerating}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Reference Letter
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => handleGenerateDocument('leadership')}
                      disabled={isGenerating}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Leadership Profile
                    </Button>
                  </div>
                </div>
                
                {generatedContent && activeTab === 'documents' && (
                  <div className="mt-4 p-4 border bg-white rounded">
                    <h4 className="font-semibold mb-2">Generated Document</h4>
                    <div className="whitespace-pre-line text-sm">
                      {generatedContent}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" onClick={() => {
                        // Implementation would create a real PDF
                        toast({
                          title: "Document Downloaded",
                          description: "Your document has been downloaded as PDF.",
                        });
                      }}>
                        Download as PDF
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Analyze Tab */}
            <TabsContent value="analyze" className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Job Description Analysis</h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block mb-1 ${getLabelClass()}`}>Job Description</label>
                    <Textarea 
                      placeholder="Paste the job description here for AI analysis of skills alignment..."
                      className="min-h-[150px]"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button 
                      className="w-full"
                      onClick={handleAnalyzeJobDescription}
                      disabled={isGenerating}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Analyze Job Fit
                    </Button>
                  </div>
                </div>
                
                {generatedContent && activeTab === 'analyze' && (
                  <div className="mt-4 p-4 border bg-white rounded">
                    <h4 className="font-semibold mb-2">Skills Alignment Analysis</h4>
                    <div className="whitespace-pre-line text-sm">
                      {generatedContent}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIResumeTools;
