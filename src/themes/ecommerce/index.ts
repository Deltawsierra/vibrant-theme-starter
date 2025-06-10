
import React from 'react';

// Import all pages with explicit default imports
import EcommerceAbout from './pages/About';
import EcommerceWork from './pages/Work';
import EcommerceContact from './pages/Contact';
import EcommerceShowcase from './pages/Showcase';

export const ecommerceTheme = {
  About: EcommerceAbout,
  Work: EcommerceWork,
  Contact: EcommerceContact,
  Showcase: EcommerceShowcase,
  Provider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
};

export default ecommerceTheme;
