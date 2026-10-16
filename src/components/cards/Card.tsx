import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'dark' | 'orangeSubtle';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  padding = 'medium',
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1.5,
          borderColor: '#E2E8F0',
        };
      case 'dark':
        return {
          backgroundColor: '#1E1E24',
          borderWidth: 1,
          borderColor: '#2D3139',
          ...shadows.md,
        };
      case 'orangeSubtle':
        return {
          backgroundColor: '#FFF7ED',
          borderWidth: 1.5,
          borderColor: colors.borderOrange,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: '#F1F5F9',
          ...shadows.md,
        };
    }
  };

  const getPadding = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return spacing.md;
      case 'large':
        return spacing.xxl;
      case 'medium':
      default:
        return spacing.xl;
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyle(),
        { padding: getPadding() },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
  },
});
