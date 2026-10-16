import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { BusIcon, LocationPinIcon, ShieldIcon } from '../../components/icons/AppIcons';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    id: '1',
    title: 'Sukkur ⇄ Obuaro Corridor',
    subtitle: 'Direct & Guaranteed Travel',
    description:
      'Seamless intercity travel connecting Sukkur, Pano Aqil, Ghotki, Mirpur Mathelo, Daharki, and Obuaro with guaranteed seat reservations.',
    icon: (size: number) => <BusIcon size={size} color={colors.primary} />,
  },
  {
    id: '2',
    title: 'Reserve Your Preferred Seat',
    subtitle: 'Interactive Visual Layout',
    description:
      'Pick window or aisle seats, family-friendly spaces, and executive luxury recliners with a 10-minute instant hold.',
    icon: (size: number) => <ShieldIcon size={size} color={colors.primary} />,
  },
  {
    id: '3',
    title: 'Live Tracking & Instant Pay',
    subtitle: 'Zero Guesswork, 100% Peace of Mind',
    description:
      'Track your bus along the N-5 Highway in real-time and pay seamlessly via Easypaisa, JazzCash, or on-board boarding.',
    icon: (size: number) => <LocationPinIcon size={size} color={colors.primary} />,
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const slide = SLIDES[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={styles.brandBadge}>
          <Text style={styles.brandText}>Saffar<Text style={{ color: colors.primary }}>PK</Text></Text>
        </View>
        {currentIndex < SLIDES.length - 1 && (
          <TouchableOpacity activeOpacity={0.7} onPress={onComplete} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Hero Illustration / Icon Card */}
      <View style={styles.heroSection}>
        <View style={styles.cardIllustration}>
          <View style={styles.circleBg}>
            {slide.icon(72)}
          </View>
          <View style={styles.corridorTag}>
            <Text style={styles.corridorTagText}>N-5 Highway Route</Text>
          </View>
        </View>
      </View>

      {/* Slide Details */}
      <View style={styles.detailsSection}>
        {/* Pagination Dots */}
        <View style={styles.paginationRow}>
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx ? styles.dotActive : null,
              ]}
            />
          ))}
        </View>

        <Text style={styles.subtitle}>{slide.subtitle}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        {/* Action Button */}
        <View style={styles.bottomButtons}>
          <Button
            title={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
            onPress={handleNext}
            variant="primary"
            size="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  brandBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    backgroundColor: '#262626',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textWhite,
  },
  skipBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  skipText: {
    ...typography.label,
    color: colors.textMuted,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  cardIllustration: {
    width: '100%',
    height: 240,
    borderRadius: borderRadius.xxl,
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#2F2F2F',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  circleBg: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  corridorTag: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
  },
  corridorTagText: {
    ...typography.caption,
    color: colors.primaryLight,
    fontWeight: '700',
  },
  detailsSection: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  paginationRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  dot: {
    height: 6,
    width: 8,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.primary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.primaryDark,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  bottomButtons: {
    marginTop: spacing.sm,
  },
});
