
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Showcase from './pages/Showcase';
import { StoryProgressProvider } from './context/StoryProgressContext';

export const storytellingTheme = {
  About,
  Work,
  Contact,
  Showcase,
  Provider: StoryProgressProvider,
};

export default storytellingTheme;
