import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, typography } from '../../theme';

export type LogoVariant = 'horizontal' | 'stacked' | 'icon-only' | 'badge' | 'header';
export type LogoTheme = 'white' | 'primary' | 'dark' | 'colored';
export type LogoSize = 'small' | 'medium' | 'large' | 'hero';

interface SaffarLogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  tagline?: string;
  showTagline?: boolean;
  style?: ViewStyle;
}

/**
 * Signature SaffarPK Pin with Concentric Radar Ripples
 * Inspired by the modern Figma travel prototype reference
 */
export const SaffarPinIcon: React.FC<{
  size?: number;
  color?: string;
}> = ({ size = 48, color = colors.primary }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Location Pin with Center Cutout (evenodd fill rule) */}
      <Path
        d="M32 4C20.954 4 12 12.954 12 24C12 37.5 32 50 32 50C32 50 52 37.5 52 24C52 12.954 43.046 4 32 4ZM32 17C35.866 17 39 20.134 39 24C39 27.866 35.866 31 32 31C28.134 31 25 27.866 25 24C25 20.134 28.134 17 32 17Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />

      {/* Inner Ground Ripple Wave */}
      <Path
        d="M20 53C24 56.5 40 56.5 44 53"
        stroke={color}
        strokeWidth={3.2}
        strokeLinecap="round"
      />

      {/* Outer Ground Ripple Wave */}
      <Path
        d="M13 59C19 63.5 45 63.5 51 59"
        stroke={color}
        strokeWidth={3.2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const SaffarLogo: React.FC<SaffarLogoProps> = ({
  variant = 'horizontal',
  theme = 'white',
  size = 'medium',
  tagline = 'YOUR JOURNEY, JUST A TAP AWAY',
  showTagline = true,
  style,
}) => {
  // Sizing map
  const sizeConfig = {
    small: { icon: 28, titleSize: 18, pkSize: 13, tagSize: 7.5, gap: 8 },
    medium: { icon: 42, titleSize: 26, pkSize: 18, tagSize: 9.5, gap: 10 },
    large: { icon: 54, titleSize: 34, pkSize: 24, tagSize: 11, gap: 14 },
    hero: { icon: 68, titleSize: 44, pkSize: 30, tagSize: 13, gap: 16 },
  }[size];

  // Theme colors
  const getColor = () => {
    switch (theme) {
      case 'white':
        return {
          icon: '#FFFFFF',
          text: '#FFFFFF',
          pk: '#FFFFFF',
          tagline: 'rgba(255, 255, 255, 0.92)',
          badgeBg: 'rgba(255, 255, 255, 0.18)',
        };
      case 'primary':
        return {
          icon: colors.primary,
          text: colors.primary,
          pk: colors.primary,
          tagline: colors.textSecondary,
          badgeBg: colors.primaryLight,
        };
      case 'dark':
        return {
          icon: colors.dark,
          text: colors.dark,
          pk: colors.primary,
          tagline: colors.textSecondary,
          badgeBg: '#F1F5F9',
        };
      case 'colored':
      default:
        return {
          icon: colors.primary,
          text: colors.dark,
          pk: colors.primary,
          tagline: colors.textSecondary,
          badgeBg: colors.primaryLight,
        };
    }
  };

  const currentColors = getColor();

  // 1. Icon-only variant
  if (variant === 'icon-only') {
    return (
      <View style={[styles.iconWrap, style]}>
        <SaffarPinIcon size={sizeConfig.icon} color={currentColors.icon} />
      </View>
    );
  }

  // 2. Badge variant (Squircle container with Pin)
  if (variant === 'badge') {
    const badgeSize = sizeConfig.icon * 1.5;
    return (
      <View
        style={[
          styles.badgeContainer,
          {
            width: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize * 0.28,
            backgroundColor: currentColors.badgeBg,
          },
          style,
        ]}
      >
        <SaffarPinIcon size={sizeConfig.icon} color={currentColors.icon} />
      </View>
    );
  }

  // 3. Compact Header variant
  if (variant === 'header') {
    return (
      <View style={[styles.headerContainer, style]}>
        <SaffarPinIcon size={26} color={currentColors.icon} />
        <View style={{ marginLeft: 6 }}>
          <Text style={[styles.brandTitle, { fontSize: 20, color: currentColors.text }]}>
            Saffar<Text style={{ color: currentColors.pk }}>PK</Text>
          </Text>
        </View>
      </View>
    );
  }

  // 4. Stacked / Vertical variant
  if (variant === 'stacked') {
    return (
      <View style={[styles.stackedContainer, style]}>
        <SaffarPinIcon size={sizeConfig.icon * 1.15} color={currentColors.icon} />

        <View style={{ alignItems: 'center', marginTop: sizeConfig.gap }}>
          <Text
            style={[
              styles.brandTitle,
              {
                fontSize: sizeConfig.titleSize,
                color: currentColors.text,
              },
            ]}
          >
            Saffar
            <Text style={{ color: currentColors.pk }}>PK</Text>
          </Text>

          {showTagline && (
            <Text
              style={[
                styles.brandTagline,
                {
                  fontSize: sizeConfig.tagSize,
                  color: currentColors.tagline,
                  marginTop: 3,
                },
              ]}
            >
              {tagline}
            </Text>
          )}
        </View>
      </View>
    );
  }

  // 5. Horizontal variant (matches the Figma screenshot lockup: Icon on left, Title + Tagline on right)
  return (
    <View style={[styles.horizontalContainer, { gap: sizeConfig.gap }, style]}>
      <SaffarPinIcon size={sizeConfig.icon} color={currentColors.icon} />

      <View style={styles.textColumn}>
        <Text
          style={[
            styles.brandTitle,
            {
              fontSize: sizeConfig.titleSize,
              color: currentColors.text,
            },
          ]}
        >
          Saffar
          <Text style={{ color: currentColors.pk }}>PK</Text>
        </Text>

        {showTagline && (
          <Text
            style={[
              styles.brandTagline,
              {
                fontSize: sizeConfig.tagSize,
                color: currentColors.tagline,
              },
            ]}
            numberOfLines={1}
          >
            {tagline}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  textColumn: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontWeight: '900',
    letterSpacing: -0.5,
    lineHeight: undefined,
  },
  brandTagline: {
    fontWeight: '800',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});

