
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StoryChapter {
  id: string;
  chapter_number: number;
  title: string;
  content: string;
  images: any;
  metadata: any;
  created_at: string;
}

export const useStoryChapters = () => {
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('story_chapters')
          .select('*')
          .order('chapter_number', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        setChapters(data || []);
      } catch (err) {
        console.error('Error fetching story chapters:', err);
        setError('Failed to load story chapters');
        
        // Fallback chapters
        setChapters([
          {
            id: 'fallback-1',
            chapter_number: 1,
            title: 'The Beginning',
            content: 'Once upon a time, in a digital realm far away...',
            images: {},
            metadata: { estimated_read_time: 5 },
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  return { chapters, loading, error };
};
