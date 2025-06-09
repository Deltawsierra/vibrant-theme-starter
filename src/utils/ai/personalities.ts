
import { type Theme } from '@/context/ThemeContext';
import { type ThemePersonality } from './types';
import {
  minimalistPersonality,
  retroArcadePersonality,
  storytellingPersonality,
  threeDInteractivePersonality,
  ecommercePersonality,
  videographyPersonality
} from './personalities/index';

export const getThemePersonality = (theme: Theme): ThemePersonality => {
  const personalities: Record<Theme, ThemePersonality> = {
    minimalist: minimalistPersonality,
    'retro-arcade': retroArcadePersonality,
    storytelling: storytellingPersonality,
    '3d-interactive': threeDInteractivePersonality,
    ecommerce: ecommercePersonality,
    videography: videographyPersonality,
  };

  return personalities[theme];
};
