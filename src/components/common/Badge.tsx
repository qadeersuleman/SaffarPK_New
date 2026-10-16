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
        return { bg: colors.successLight, text: colors.success };
      case 'warning':
        return { bg: colors.warningLight, text: colors.warning };
      case 'dark':
        return { bg: colors.dark, text: colors.textWhite };
      case 'category':
        return { bg: '#FFF7ED', text: colors.primary, border: colors.borderOrange };
      case 'muted':
        return { bg: '#F3F4F6', text: colors.textSecondary };
      case 'primary':
      default:
        return { bg: colors.primaryLight, text: colors.primaryDark };
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
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

