import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, borderRadius, spacing, typography } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputRow,
          isFocused ? styles.inputFocused : null,
          error ? styles.inputError : null,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          placeholderTextColor={colors.textMuted}
          onFocus={e => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, style]}
          {...rest}
        />
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  label: {
    ...typography.label,
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: spacing.xs + 2,
    letterSpacing: 0.2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: '#FFFDF9',
  },
  inputError: {
    borderColor: colors.error,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  rightIconContainer: {
    marginLeft: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: spacing.sm,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
