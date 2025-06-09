
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
    const { email, date, time, notes } = await req.json();
    
    if (!email) {
      throw new Error("Email is required");
    }

    if (!date || !time) {
      throw new Error("Date and time are required");
    }

    // In a real implementation, this would connect to Google Calendar API 
    // or Calendly API to create the actual booking

    // For now, we'll just store the booking request
    const supabase = createClient(
      "https://fxyzkgfpdtwcgrrgscgr.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eXprZ2ZwZHR3Y2dycmdzY2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzE4NzUsImV4cCI6MjA2NDU0Nzg3NX0.PjcLoeZiAtLr_GiTRlTlCliITRpC1R-ecpfQ9GcLLsE"
    );

    // Create a timestamp from date and time
    const bookingTime = new Date(`${date}T${time}`);
    const randomId = crypto.randomUUID();

    const { data, error } = await supabase
      .from('calendar_events')
      .insert({
        recruiter_email: email,
        event_id: randomId,
        time: bookingTime.toISOString(),
        status: 'requested'
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // In a real implementation, we would send email confirmations here

    return new Response(
      JSON.stringify({ 
        success: true, 
        booking: {
          id: data.id,
          email: data.recruiter_email,
          time: data.time,
          status: data.status
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
    console.error('Error in book-calendar:', error);
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
