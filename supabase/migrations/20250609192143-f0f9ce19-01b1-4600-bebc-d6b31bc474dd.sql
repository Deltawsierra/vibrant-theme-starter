
-- Recruiter Visits Table
CREATE TABLE IF NOT EXISTS public.recruiter_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip TEXT,
  user_agent TEXT,
  detected_company TEXT,
  is_recruiter BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  notes TEXT
);

-- Resume Embeddings Table (using pgvector extension)
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS public.resume_vectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_text TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI embedding dimension
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Calendar Events Table
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_email TEXT NOT NULL,
  event_id TEXT,
  time TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Reference Letters / Skills Summaries Table
CREATE TABLE IF NOT EXISTS public.generated_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'reference' or 'summary'
  content TEXT NOT NULL,
  requested_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- AI Chat Sessions/Transcripts Table
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id TEXT,
  type TEXT DEFAULT 'general', -- e.g., 'recruiter', 'general', 'mock-interview'
  transcript TEXT,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- JD Submissions and Fit Analysis Table
CREATE TABLE IF NOT EXISTS public.portfolio_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_email TEXT,
  job_description TEXT,
  ai_alignment_report TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.recruiter_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_vectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since these are for recruiters who may not be authenticated)
CREATE POLICY "Allow public read access to recruiter_visits" 
  ON public.recruiter_visits FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to recruiter_visits" 
  ON public.recruiter_visits FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to resume_vectors" 
  ON public.resume_vectors FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to calendar_events" 
  ON public.calendar_events FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to calendar_events" 
  ON public.calendar_events FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to generated_letters" 
  ON public.generated_letters FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to generated_letters" 
  ON public.generated_letters FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to ai_conversations" 
  ON public.ai_conversations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to ai_conversations" 
  ON public.ai_conversations FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to portfolio_submissions" 
  ON public.portfolio_submissions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to portfolio_submissions" 
  ON public.portfolio_submissions FOR SELECT 
  USING (true);
