
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageContent {
  id: string;
  page_name: string;
  title: string;
  content: any;
  updated_at: string;
}

export const usePageContent = (pageName: string) => {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('page_content')
          .select('*')
          .eq('page_name', pageName)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        setContent(data);
      } catch (err) {
        console.error('Error fetching page content:', err);
        setError('Failed to load content');
        
        // Fallback content
        setContent({
          id: 'fallback',
          page_name: pageName,
          title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
          content: { sections: [{ type: 'text', content: `This is the ${pageName} page.` }] },
          updated_at: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageName]);

  return { content, loading, error };
};
