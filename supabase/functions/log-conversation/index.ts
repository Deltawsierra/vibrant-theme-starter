
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
    const { sessionId, userId, type, transcript } = await req.json();
    
    if (!sessionId || !transcript) {
      throw new Error('Session ID and transcript are required');
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Generate summary using OpenAI
    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: 'You are a conversation summarizer. Create a brief summary of the key points and requests from the conversation.'
          },
          { 
            role: 'user', 
            content: `Summarize this conversation transcript: ${transcript.length > 8000 ? transcript.substring(0, 8000) + '...' : transcript}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!completionResponse.ok) {
      const error = await completionResponse.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const completionData = await completionResponse.json();
    const summary = completionData.choices[0].message.content;

    // Store in Supabase
    const supabase = createClient(
      "https://fxyzkgfpdtwcgrrgscgr.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eXprZ2ZwZHR3Y2dycmdzY2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzE4NzUsImV4cCI6MjA2NDU0Nzg3NX0.PjcLoeZiAtLr_GiTRlTlCliITRpC1R-ecpfQ9GcLLsE"
    );

    const { data, error } = await supabase
      .from('ai_conversations')
      .insert({
        session_id: sessionId,
        user_id: userId,
        type: type || 'general',
        transcript: transcript,
        summary: summary
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        conversation: {
          id: data.id,
          summary: data.summary
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
    console.error('Error in log-conversation:', error);
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
