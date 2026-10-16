import { TextStyle } from 'react-native';

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    letterSpacing: -0.6,
  },
  h2: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: -0.4,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  caption: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
};
