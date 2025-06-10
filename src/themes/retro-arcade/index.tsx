
import React from 'react';
import { ArcadeProvider } from './context/ArcadeContext';

// Import all pages with explicit default imports
import RetroArcadeAbout from './pages/About';
import RetroArcadeWork from './pages/Work';
import RetroArcadeContact from './pages/Contact';
import RetroArcadeShowcase from './pages/Showcase';
import RetroArcadeGame from './pages/game';

const retroArcadeTheme = {
  About: RetroArcadeAbout,
  Work: RetroArcadeWork,
  Contact: RetroArcadeContact,
  Showcase: RetroArcadeShowcase,
  Game: RetroArcadeGame,
  Provider: ArcadeProvider,
};

export default retroArcadeTheme;
