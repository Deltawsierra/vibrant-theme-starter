
import React from 'react';

// Import all pages with explicit default imports
import ThreeDInteractiveAbout from './pages/About';
import ThreeDInteractiveWork from './pages/Work';
import ThreeDInteractiveContact from './pages/Contact';
import ThreeDInteractiveShowcase from './pages/Showcase';

export const threeDInteractiveTheme = {
  About: ThreeDInteractiveAbout,
  Work: ThreeDInteractiveWork,
  Contact: ThreeDInteractiveContact,
  Showcase: ThreeDInteractiveShowcase,
  Provider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
};

export default threeDInteractiveTheme;
