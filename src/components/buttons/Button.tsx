import React, { useRef } from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Pressable,
  Platform,
} from 'react-native';
import { colors, spacing, shadows } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const getContainerStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.dark,
          ...shadows.glowDark,
        };
      case 'outline':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1.5,
          borderColor: colors.border,
          ...shadows.sm,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'success':
        return {
          backgroundColor: colors.success,
          ...shadows.md,
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
        return {
          color: colors.textPrimary,
          fontWeight: '800',
        };
      case 'ghost':
        return {
          color: colors.primary,
          fontWeight: '800',
        };
      case 'secondary':
      case 'success':
      case 'primary':
      default:
        return {
          color: colors.textWhite,
          fontWeight: '800',
        };
    }
  };

  const getSizeStyle = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'small':
        return {
          container: { minHeight: 40, paddingHorizontal: spacing.lg, borderRadius: 12 },
          text: { fontSize: 13 },
        };
      case 'medium':
        return {
          container: { minHeight: 48, paddingHorizontal: spacing.xl, borderRadius: 14 },
          text: { fontSize: 15 },
        };
      case 'large':
      default:
        return {
          container: { minHeight: 56, paddingHorizontal: spacing.xxl, borderRadius: 16 },
          text: { fontSize: 16 },
        };
    }
  };

  const sizeStyle = getSizeStyle();

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.baseButton,
          getContainerStyle(),
          sizeStyle.container,
          disabled && styles.disabledButton,
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
      </Pressable>
    </Animated.View>
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
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif-medium',
      default: 'sans-serif',
    }),
    letterSpacing: 0.3,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
});
