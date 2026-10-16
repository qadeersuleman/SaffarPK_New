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
        return { bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' };
      case 'warning':
        return { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' };
      case 'dark':
        return { bg: '#1E293B', text: colors.textWhite };
      case 'category':
        return { bg: '#FFF7ED', text: colors.primary, border: colors.borderOrange };
      case 'muted':
        return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
      case 'primary':
      default:
        return { bg: '#FFEDD5', text: '#C2410C', border: '#FED7AA' };
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
