
import React from 'react';
import { ArcadeProvider } from './context/ArcadeContext';
import ArcadeLayout from './components/ArcadeLayout';

// Import theme pages
import ArcadeAbout from './pages/About';
import ArcadeWork from './pages/Work';
import ArcadeContact from './pages/Contact';
import ArcadeShowcase from './pages/Showcase';
import ArcadeGame from './pages/game';

const RetroArcadeTheme = {
  About: ArcadeAbout,
  Work: ArcadeWork,
  Contact: ArcadeContact,
  Showcase: ArcadeShowcase,
  Game: ArcadeGame,
  Provider: ({ children }: { children: React.ReactNode }) => (
    <ArcadeProvider>
      <ArcadeLayout>
        {children}
      </ArcadeLayout>
    </ArcadeProvider>
  )
};

export default RetroArcadeTheme;
