
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useArcade } from '../context/ArcadeContext';

interface ArcadeAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArcadeAuthModal: React.FC<ArcadeAuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { playSFX, settings } = useArcade();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        playSFX('success');
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        playSFX('success');
        onClose();
      }
    } catch (error: any) {
      setError(error.message);
      playSFX('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    playSFX('button-press');
    onClose();
  };

  if (user) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 font-pixel">
        <div className="bg-black border-2 border-arcade-neon-cyan p-6 max-w-md w-full mx-4">
          <div className={`text-xl font-bold text-arcade-neon-yellow mb-4 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            ◆ PLAYER STATUS ◆
          </div>
          
          <div className="space-y-4 text-arcade-neon-green">
            <div className="text-center">
              <div className="text-arcade-neon-cyan">LOGGED IN AS:</div>
              <div className="text-arcade-neon-yellow">{user.user_metadata?.username || user.email}</div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-900 border border-red-500 text-red-300 hover:bg-red-800 transition-colors"
              >
                SIGN OUT
              </button>
              
              <button
                onClick={onClose}
                className="px-4 py-2 bg-arcade-neon-cyan/20 border border-arcade-neon-cyan text-arcade-neon-cyan hover:bg-arcade-neon-cyan/30 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 font-pixel">
      <div className="bg-black border-2 border-arcade-neon-cyan p-6 max-w-md w-full mx-4">
        <div className={`text-xl font-bold text-arcade-neon-yellow mb-4 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          ◆ {isLogin ? 'PLAYER LOGIN' : 'NEW PLAYER'} ◆
        </div>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-arcade-neon-cyan mb-1">
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-arcade-neon-green text-arcade-neon-green focus:border-arcade-neon-yellow focus:outline-none"
                placeholder="ENTER USERNAME"
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm text-arcade-neon-cyan mb-1">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-arcade-neon-green text-arcade-neon-green focus:border-arcade-neon-yellow focus:outline-none"
              placeholder="ENTER EMAIL"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-arcade-neon-cyan mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-arcade-neon-green text-arcade-neon-green focus:border-arcade-neon-yellow focus:outline-none"
              placeholder="ENTER PASSWORD"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-arcade-neon-yellow/20 border border-arcade-neon-yellow text-arcade-neon-yellow hover:bg-arcade-neon-yellow/30 disabled:opacity-50 transition-colors"
          >
            {loading ? 'PROCESSING...' : (isLogin ? 'LOGIN' : 'SIGN UP')}
          </button>

          {error && (
            <div className="text-sm text-red-400 text-center border border-red-500 p-2 bg-red-900/20">
              {error}
            </div>
          )}
        </form>

        <div className="mt-4 text-center space-y-2">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-arcade-neon-magenta hover:text-arcade-neon-yellow transition-colors"
          >
            {isLogin ? "NEW PLAYER? SIGN UP" : "HAVE ACCOUNT? LOGIN"}
          </button>
          
          <div>
            <button
              onClick={onClose}
              className="text-sm text-arcade-neon-cyan hover:text-arcade-neon-yellow transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeAuthModal;
