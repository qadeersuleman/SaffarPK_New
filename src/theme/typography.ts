import { TextStyle, Platform } from 'react-native';

const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  default: 'sans-serif',
});

const FONT_REGULAR = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily: FONT_FAMILY,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    letterSpacing: -0.8,
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: FONT_FAMILY,
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  bodyLarge: {
    fontFamily: FONT_REGULAR,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: FONT_REGULAR,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: FONT_REGULAR,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  label: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
    letterSpacing: 0.4,
  },
  caption: {
    fontFamily: FONT_REGULAR,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
};
