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
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'dark':
        return {
          backgroundColor: colors.dark,
          borderWidth: 1,
          borderColor: colors.borderDark,
          ...shadows.md,
        };
      case 'orangeSubtle':
        return {
          backgroundColor: '#FFF7ED',
          borderWidth: 1,
          borderColor: colors.borderOrange,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: colors.surface,
          ...shadows.md,
        };
    }
  };

  const getPadding = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return spacing.sm;
      case 'large':
        return spacing.xl;
      case 'medium':
      default:
        return spacing.lg;
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
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
});

