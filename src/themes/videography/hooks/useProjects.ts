
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VideoProject {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  category: string;
  featured: boolean;
  client_name?: string;
  completion_date?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export const useProjects = (category?: string, featured?: boolean) => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('video_projects')
        .select('*')
        .order('completion_date', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.warn('Could not fetch projects from Supabase, using fallback data');
        // Fallback projects
        setProjects([
          {
            id: 'proj-1',
            title: 'Wedding Highlights',
            description: 'Beautiful wedding ceremony highlights',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'wedding',
            featured: true,
            client_name: 'Jane & John',
            completion_date: '2024-01-15',
            tags: ['wedding', 'romance', 'celebration']
          },
          {
            id: 'proj-2',
            title: 'Corporate Event',
            description: 'Annual company conference coverage',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            category: 'corporate',
            featured: false,
            client_name: 'Tech Corp',
            completion_date: '2024-02-01',
            tags: ['corporate', 'business', 'conference']
          }
        ]);
      } else {
        setProjects(data || []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [category, featured]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
};
