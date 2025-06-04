
import { ComponentType } from 'react';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Showcase from './pages/Showcase';
import { ArcadeProvider } from './context/ArcadeContext';

// Higher-order component to wrap pages with ArcadeProvider
function withArcadeProvider<P extends object>(Component: ComponentType<P>) {
  return (props: P) => (
    <ArcadeProvider>
      <Component {...props} />
    </ArcadeProvider>
  );
}

export const retroArcadeTheme = {
  About: withArcadeProvider(About),
  Work: withArcadeProvider(Work),
  Contact: withArcadeProvider(Contact),
  Showcase: withArcadeProvider(Showcase),
  Provider: ArcadeProvider,
};

export default retroArcadeTheme;
