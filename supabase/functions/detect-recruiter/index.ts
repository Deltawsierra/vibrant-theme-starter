
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
    const { ip, userAgent } = await req.json();
    
    // Create Supabase client
    const supabase = createClient(
      "https://fxyzkgfpdtwcgrrgscgr.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eXprZ2ZwZHR3Y2dycmdzY2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NzE4NzUsImV4cCI6MjA2NDU0Nzg3NX0.PjcLoeZiAtLr_GiTRlTlCliITRpC1R-ecpfQ9GcLLsE"
    );

    // Recruiter detection logic
    let isRecruiter = false;
    let detectedCompany = '';
    let notes = '';

    // Check user agent for recruiting platforms
    const recruiterPatterns = [
      'linkedin', 'indeed', 'glassdoor', 'ziprecruiter', 'monster',
      'careerbuilder', 'dice', 'stackoverflow', 'angel', 'hired'
    ];
    
    const lowerUserAgent = userAgent?.toLowerCase() || '';
    for (const pattern of recruiterPatterns) {
      if (lowerUserAgent.includes(pattern)) {
        isRecruiter = true;
        detectedCompany = pattern;
        notes = `Detected via user agent: ${pattern}`;
        break;
      }
    }

    // Check for corporate domains (basic heuristic)
    if (!isRecruiter && ip) {
      const corporateDomains = [
        'google', 'microsoft', 'amazon', 'meta', 'apple', 'netflix',
        'uber', 'airbnb', 'stripe', 'salesforce', 'oracle', 'ibm'
      ];
      
      // This is a simplified check - in production you'd use IP geolocation services
      const suspiciousCorporateActivity = corporateDomains.some(domain => 
        lowerUserAgent.includes(domain)
      );
      
      if (suspiciousCorporateActivity) {
        isRecruiter = true;
        notes = 'Possible corporate recruiter based on patterns';
      }
    }

    // Log the visit
    await supabase.from('recruiter_visits').insert({
      ip: ip || 'unknown',
      user_agent: userAgent || 'unknown',
      detected_company: detectedCompany,
      is_recruiter: isRecruiter,
      notes: notes
    });

    return new Response(
      JSON.stringify({ 
        isRecruiter, 
        detectedCompany: detectedCompany || null,
        notes: notes || null
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error('Error in detect-recruiter:', error);
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
