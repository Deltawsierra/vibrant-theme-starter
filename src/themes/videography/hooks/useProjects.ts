
import { useState, useEffect } from 'react';

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

      // Using fallback projects since database table doesn't exist yet
      console.log('Using fallback projects data');
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
