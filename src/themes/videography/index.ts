
import React from 'react';

// Import all pages with explicit default imports
import VideographyAbout from './pages/About';
import VideographyWork from './pages/Work';
import VideographyContact from './pages/Contact';
import VideographyShowcase from './pages/Showcase';

export const videographyTheme = {
  About: VideographyAbout,
  Work: VideographyWork,
  Contact: VideographyContact,
  Showcase: VideographyShowcase,
  Provider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
};

export default videographyTheme;
