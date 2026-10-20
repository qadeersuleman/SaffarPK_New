import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'dark' | 'category' | 'muted';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const getBadgeStyle = (): { bg: string; text: string; border?: string } => {
    switch (variant) {
      case 'success':
        return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' };
      case 'warning':
        return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' };
      case 'dark':
        return { bg: colors.dark, text: colors.textWhite };
      case 'category':
        return { bg: colors.primaryLight, text: colors.primary, border: colors.borderOrange };
      case 'muted':
        return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
      case 'primary':
      default:
        return { bg: colors.primaryLight, text: colors.primaryDark, border: colors.borderOrange };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: badgeStyle.bg },
        badgeStyle.border ? { borderWidth: 1, borderColor: badgeStyle.border } : null,
        style,
      ]}
    >
      <Text style={[styles.text, { color: badgeStyle.text }, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
