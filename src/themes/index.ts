
import { minimalistTheme } from './minimalist';
import retroArcadeTheme from './retro-arcade';
import { storytellingTheme } from './storytelling';
import { threeDInteractiveTheme } from './3d-interactive';
import { ecommerceTheme } from './ecommerce';
import { videographyTheme } from './videography';

export const themeRegistry = {
  'minimalist': minimalistTheme,
  'retro-arcade': retroArcadeTheme,
  'storytelling': storytellingTheme,
  '3d-interactive': threeDInteractiveTheme,
  'ecommerce': ecommerceTheme,
  'videography': videographyTheme,
};

export type ThemeName = keyof typeof themeRegistry;

export default themeRegistry;
