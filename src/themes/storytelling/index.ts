
import React from 'react';

// Import all pages with explicit default imports
import StorytellingAbout from './pages/About';
import StorytellingWork from './pages/Work';
import StorytellingContact from './pages/Contact';
import StorytellingShowcase from './pages/Showcase';

export const storytellingTheme = {
  About: StorytellingAbout,
  Work: StorytellingWork,
  Contact: StorytellingContact,
  Showcase: StorytellingShowcase,
  Provider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
};

export default storytellingTheme;
