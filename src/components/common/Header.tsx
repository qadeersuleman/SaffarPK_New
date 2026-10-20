import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ArrowBackIcon } from '../icons/AppIcons';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  dark?: boolean;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  rightAction,
  dark = false,
  style,
}) => {
  return (
    <View style={[styles.container, dark && styles.darkContainer, style]}>
      <View style={styles.leftRow}>
        {showBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={[styles.backButton, dark && styles.darkBackButton]}
          >
            <ArrowBackIcon color={dark ? colors.textWhite : colors.dark} size={22} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, dark && styles.darkTitle]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.subtitle, dark && styles.darkSubtitle]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  darkContainer: {
    backgroundColor: colors.dark,
    borderBottomColor: '#1E293B',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  darkBackButton: {
    backgroundColor: colors.darkElevated,
    borderColor: colors.darkBorder,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.h3,
    fontSize: 20,
    color: colors.textPrimary,
  },
  darkTitle: {
    color: colors.textWhite,
  },
  subtitle: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  darkSubtitle: {
    color: colors.textMuted,
  },
  rightAction: {
    marginLeft: spacing.md,
  },
});
