
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  published_date: string;
  category: string;
  tags?: string[];
  featured_image?: string;
  metadata?: Record<string, any>;
}

export const useBlogPosts = (category?: string, tag?: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('published_date', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (tag) {
        query = query.contains('tags', [tag]);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.warn('Could not fetch blog posts from Supabase, using fallback data');
        // Show empty state instead of fallback data to meet constraint
        setPosts([]);
      } else {
        setPosts(data || []);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category, tag]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts
  };
};
