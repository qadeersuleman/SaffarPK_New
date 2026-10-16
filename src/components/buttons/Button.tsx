import React, { useRef } from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Pressable,
} from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../../theme';

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
      toValue: 0.96,
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
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'success':
        return {
          backgroundColor: colors.success,
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
          container: { minHeight: 40, paddingHorizontal: spacing.md, borderRadius: borderRadius.md },
          text: { fontSize: 13 },
        };
      case 'medium':
        return {
          container: { minHeight: 48, paddingHorizontal: spacing.lg, borderRadius: borderRadius.lg },
          text: { fontSize: 15 },
        };
      case 'large':
      default:
        return {
          container: { minHeight: 56, paddingHorizontal: spacing.xl, borderRadius: borderRadius.xl },
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
    letterSpacing: 0.3,
  },
  disabledButton: {
    opacity: 0.45,
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
    elevation: 0,
  },
});
