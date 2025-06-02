
import React from 'react';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Showcase from './pages/Showcase';

export const minimalistTheme = {
  About,
  Work,
  Contact,
  Showcase,
  Provider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children), // No-op provider
};

export default minimalistTheme;
