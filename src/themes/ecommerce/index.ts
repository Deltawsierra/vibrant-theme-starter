
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Showcase from './pages/Showcase';
import { ShoppingProvider } from './context/ShoppingContext';

export const ecommerceTheme = {
  About,
  Work,
  Contact,
  Showcase,
  Provider: ShoppingProvider,
};

export default ecommerceTheme;
