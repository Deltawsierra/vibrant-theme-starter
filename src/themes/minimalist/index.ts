
import React from 'react';

// Import all pages with explicit default imports
import MinimalistAbout from './pages/About';
import MinimalistWork from './pages/Work';
import MinimalistContact from './pages/Contact';
import MinimalistShowcase from './pages/Showcase';

export const minimalistTheme = {
  About: MinimalistAbout,
  Work: MinimalistWork,
  Contact: MinimalistContact,
  Showcase: MinimalistShowcase,
  Provider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
};

export default minimalistTheme;
