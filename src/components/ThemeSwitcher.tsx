
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, type Theme } from '@/context/ThemeContext';
import { ChevronDown } from 'lucide-react';

/**
 * Global theme switcher component - visually neutral dropdown
 * Can be placed anywhere without clashing with current theme styles
 */
const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'minimalist' as Theme, name: 'Minimalist' },
    { id: 'retro-arcade' as Theme, name: 'Retro Arcade' },
    { id: 'storytelling' as Theme, name: 'Storytelling' },
    { id: '3d-interactive' as Theme, name: '3D Interactive' },
    { id: 'ecommerce' as Theme, name: 'E-commerce' },
    { id: 'videography' as Theme, name: 'Videography' }
  ];

  const currentThemeName = themes.find(t => t.id === currentTheme)?.name || 'Select Theme';

  const handleThemeSelect = (themeId: Theme) => {
    setTheme(themeId);
    setIsOpen(false);
    // Navigate to theme selector to show confirmation, then redirect
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-50">
      {/* Dropdown Button - Minimal neutral styling */}
      <button
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white/90 border border-gray-300 rounded-md shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch theme"
      >
        <span className="text-gray-700 font-medium min-w-0 truncate">
          {currentThemeName}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <div 
            className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20"
            role="listbox"
            aria-label="Theme options"
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md ${
                  theme.id === currentTheme 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700'
                }`}
                role="option"
                aria-selected={theme.id === currentTheme}
              >
                {theme.name}
                {theme.id === currentTheme && (
                  <span className="ml-2 text-blue-500" aria-hidden="true">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
