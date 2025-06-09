
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
    const { type, context, requestedBy } = await req.json();
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Based on the document type, create different prompts
    let systemPrompt = '';
    let userPrompt = '';
    
    if (type === 'reference') {
      systemPrompt = "You are a professional reference letter writer for a portfolio. Write a detailed, positive reference letter based on the provided context.";
      userPrompt = `Write a compelling reference letter highlighting these skills and experiences: ${context}. Make it professional, detailed and positive.`;
    } else if (type === 'skills_summary') {
      systemPrompt = "You are a professional resume writer specializing in skill summaries. Provide a concise, well-structured skills summary based on the context.";
      userPrompt = `Write a concise but comprehensive skills summary covering these areas: ${context}. Format it with bullet points where appropriate.`;
    } else if (type === 'leadership') {
      systemPrompt = "You are an expert in leadership analysis. Create a detailed summary of leadership experiences and skills.";
      userPrompt = `Create a detailed summary of leadership experiences based on this context: ${context}. Highlight key achievements, management approach, and leadership philosophy.`;
    } else {
      throw new Error('Invalid document type');
    }

    // Generate content using OpenAI
    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
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
    const generatedContent = completionData.choices[0].message.content;

    // Store in Supabase
    const supabase = createClient(
      "https://fxyzkgfpdtwcgrrgscgr.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eXprZ2ZwZHR3Y2dycmdzY2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzE4NzUsImV4cCI6MjA2NDU0Nzg3NX0.PjcLoeZiAtLr_GiTRlTlCliITRpC1R-ecpfQ9GcLLsE"
    );

    const { data, error } = await supabase
      .from('generated_letters')
      .insert({
        type: type,
        content: generatedContent,
        requested_by: requestedBy || null
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        document: {
          id: data.id,
          type: data.type,
          content: data.content
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
    console.error('Error in generate-document:', error);
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
