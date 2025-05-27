
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Showcase from './pages/Showcase';
import { ArcadeProvider } from './context/ArcadeContext';

export const retroArcadeTheme = {
  About,
  Work,
  Contact,
  Showcase,
  Provider: ArcadeProvider,
};

export default retroArcadeTheme;
