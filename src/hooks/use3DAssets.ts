
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AssetData {
  id: string;
  name: string;
  type: 'card' | 'pod' | 'island';
  model_url?: string;
  image_url?: string;
  metadata?: Record<string, any>;
}

interface UseAssetsReturn {
  assets: AssetData[];
  loading: boolean;
  error: string | null;
}

export const use3DAssets = (): UseAssetsReturn => {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from Supabase first
        const { data, error: fetchError } = await supabase
          .from('3d_assets')
          .select('*');

        if (fetchError) {
          console.warn('Could not fetch 3D assets from Supabase, using fallback data');
          // Fallback to hardcoded assets
          setAssets([
            {
              id: 'card-1',
              name: 'Portfolio Card',
              type: 'card',
              metadata: { color: '#3b82f6', position: [-5, 0, 0] }
            },
            {
              id: 'pod-1',
              name: 'Interactive Pod',
              type: 'pod',
              metadata: { color: '#10b981', position: [0, 2, -3] }
            },
            {
              id: 'island-1',
              name: 'Content Island',
              type: 'island',
              metadata: { color: '#f59e0b', position: [5, -1, 2] }
            }
          ]);
        } else {
          setAssets(data || []);
        }
      } catch (err) {
        console.error('Error loading 3D assets:', err);
        setError('Failed to load 3D assets');
        // Fallback assets
        setAssets([
          {
            id: 'card-fallback',
            name: 'Portfolio Card',
            type: 'card',
            metadata: { color: '#3b82f6', position: [-5, 0, 0] }
          },
          {
            id: 'pod-fallback',
            name: 'Interactive Pod',
            type: 'pod',
            metadata: { color: '#10b981', position: [0, 2, -3] }
          },
          {
            id: 'island-fallback',
            name: 'Content Island',
            type: 'island',
            metadata: { color: '#f59e0b', position: [5, -1, 2] }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return { assets, loading, error };
};
