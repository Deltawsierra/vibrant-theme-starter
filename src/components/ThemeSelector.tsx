
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, type Theme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const themes = [
    { id: 'minimalist' as Theme, name: 'Minimalist' },
    { id: 'retro-arcade' as Theme, name: 'Retro Arcade' },
    { id: 'storytelling' as Theme, name: 'Storytelling' },
    { id: '3d-interactive' as Theme, name: '3D Interactive' },
    { id: 'ecommerce' as Theme, name: 'E-commerce' },
    { id: 'videography' as Theme, name: 'Videography' }
  ];

  const handleThemeSelect = (themeId: Theme, themeName: string) => {
    console.log('Selecting theme:', themeId);
    setTheme(themeId);
    setSelectedTheme(themeName);
    
    // Show success message briefly then navigate
    setTimeout(() => {
      navigate('/about');
    }, 1500);
  };

  const handleKeepCurrentTheme = () => {
    navigate('/about');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Portfolio Theme</h1>
        <p className="text-lg text-gray-600 mb-6">
          Select from six distinct themes, each showcasing different design approaches and technologies.
        </p>
      </div>

      {currentTheme && !selectedTheme && (
        <div className="text-center mb-8 p-4 bg-blue-50 rounded-lg border">
          <p className="text-blue-800 mb-4">
            You're currently using the <strong>{themes.find(t => t.id === currentTheme)?.name}</strong> theme.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleKeepCurrentTheme}
              variant="default"
              className="px-6 py-2"
            >
              Keep Current Theme
            </Button>
            <Button
              onClick={() => setSelectedTheme('')}
              variant="outline"
              className="px-6 py-2"
            >
              Pick a New Theme
            </Button>
          </div>
        </div>
      )}

      {selectedTheme && (
        <div className="text-center mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800 text-lg">
            ✓ You've selected the <strong>{selectedTheme}</strong> theme. You can change this at any time.
          </p>
        </div>
      )}

      {(!currentTheme || selectedTheme === '') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id, theme.name)}
              variant="outline"
              className="h-24 text-lg font-semibold hover:bg-gray-50 transition-colors border-2 hover:border-gray-400"
              aria-label={`Select ${theme.name} theme`}
            >
              {theme.name}
            </Button>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Each theme will demonstrate different aspects of full-stack development, UI/UX design, and modern web technologies.
        </p>
      </div>
    </div>
  );
};

export default ThemeSelector;
