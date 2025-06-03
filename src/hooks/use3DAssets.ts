
import { useState, useEffect } from 'react';

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
    const loadAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using fallback assets since database tables don't exist yet
        console.log('Using fallback 3D assets data');
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
      } catch (err) {
        console.error('Error loading 3D assets:', err);
        setError('Failed to load 3D assets');
        setAssets([]);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  return { assets, loading, error };
};
