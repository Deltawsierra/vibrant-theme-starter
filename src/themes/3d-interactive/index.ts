
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Showcase from './pages/Showcase';
import { ThreeDProvider } from './context/ThreeDContext';

export const threeDInteractiveTheme = {
  About,
  Work,
  Contact,
  Showcase,
  Provider: ThreeDProvider,
};

export default threeDInteractiveTheme;
