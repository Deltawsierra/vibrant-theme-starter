
import { useState, useEffect } from 'react';

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

      // Using empty array since database table doesn't exist yet
      console.log('Blog posts table not available, showing empty state');
      setPosts([]);
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
