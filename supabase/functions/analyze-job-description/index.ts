
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobDescription, recruiterEmail } = await req.json();
    
    if (!jobDescription) {
      throw new Error('Job description is required');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Generate alignment report using OpenAI
    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert portfolio alignment analyst. You assess how well a candidate\'s portfolio and experience match a given job description. Focus on highlighting strengths, relevant experience, and skills that align well with the requirements. Format your analysis with bullet points for clarity. Do not mention any weaknesses or gaps unless explicitly asked.' 
          },
          { 
            role: 'user', 
            content: `Analyze this job description and create an alignment report showing how well my portfolio matches the requirements. Job Description: ${jobDescription}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!completionResponse.ok) {
      const error = await completionResponse.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const completionData = await completionResponse.json();
    const alignmentReport = completionData.choices[0].message.content;

    // Store in Supabase
    const supabase = createClient(
      "https://fxyzkgfpdtwcgrrgscgr.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eXprZ2ZwZHR3Y2dycmdzY2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzE4NzUsImV4cCI6MjA2NDU0Nzg3NX0.PjcLoeZiAtLr_GiTRlTlCliITRpC1R-ecpfQ9GcLLsE"
    );

    const { data, error } = await supabase
      .from('portfolio_submissions')
      .insert({
        recruiter_email: recruiterEmail,
        job_description: jobDescription,
        ai_alignment_report: alignmentReport
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        submission: {
          id: data.id,
          report: data.ai_alignment_report
        }
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error('Error in analyze-job-description:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
});
