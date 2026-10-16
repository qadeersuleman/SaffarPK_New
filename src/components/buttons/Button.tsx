import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, borderRadius, typography, spacing, shadows } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.dark,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.primary,
          ...shadows.glowOrange,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return {
          color: colors.primary,
          fontWeight: '700',
        };
      case 'secondary':
      case 'primary':
      default:
        return {
          color: colors.textWhite,
          fontWeight: '700',
        };
    }
  };

  const getSizeStyle = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'small':
        return {
          container: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: borderRadius.md },
          text: { fontSize: 13 },
        };
      case 'medium':
        return {
          container: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: borderRadius.lg },
          text: { fontSize: 15 },
        };
      case 'large':
      default:
        return {
          container: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, borderRadius: borderRadius.xl },
          text: { fontSize: 16 },
        };
    }
  };

  const sizeStyle = getSizeStyle();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseButton,
        getContainerStyle(),
        sizeStyle.container,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textWhite} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.baseText, getTextStyle(), sizeStyle.text, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  baseText: {
    letterSpacing: 0.3,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
});

