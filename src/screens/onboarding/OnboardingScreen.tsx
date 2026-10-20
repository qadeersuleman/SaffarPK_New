import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import {
  BusIllustration,
  ShieldIcon,
  LocationPinIcon,
  BusIcon,
} from '../../components/icons/AppIcons';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    id: '1',
    title: 'Sukkur ⇄ Obuaro Corridor',
    subtitle: 'Direct Express Transit',
    description:
      'Guaranteed seats connecting Sukkur, Pano Aqil, Ghotki, Mirpur Mathelo, Daharki, and Obuaro along the N-5 Highway with punctual departures.',
    renderHero: () => <BusIllustration width={300} height={140} />,
  },
  {
    id: '2',
    title: 'Reserve Your Preferred Seat',
    subtitle: 'Interactive Visual Cabin',
    description:
      'Choose window or aisle seats, executive luxury recliners, and family-dedicated rows with our 10-minute instant seat hold.',
    renderHero: () => (
      <View style={styles.iconHeroBox}>
        <View style={styles.outerShieldRing}>
          <ShieldIcon size={64} color={colors.primary} />
        </View>
        <Text style={styles.heroSubTag}>Guaranteed Reservation • No Overcrowding</Text>
      </View>
    ),
  },
  {
    id: '3',
    title: 'Live Tracking & Instant Pay',
    subtitle: 'Zero Guesswork, 100% Peace of Mind',
    description:
      'Track your bus along the N-5 corridor in real-time and pay seamlessly via Easypaisa, JazzCash, or on-board boarding.',
    renderHero: () => (
      <View style={styles.iconHeroBox}>
        <View style={styles.outerPinRing}>
          <LocationPinIcon size={64} color={colors.primary} />
        </View>
        <Text style={styles.heroSubTag}>Live GPS Speed & Stop Estimates</Text>
      </View>
    ),
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.2, duration: 150, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const slide = SLIDES[currentIndex];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <BusIcon size={26} color={colors.primary} />
          <Text style={styles.brandText}>
            Saffar<Text style={{ color: colors.primary }}>PK</Text>
          </Text>
        </View>
        {currentIndex < SLIDES.length - 1 && (
          <TouchableOpacity activeOpacity={0.7} onPress={onComplete} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Hero Showcase Area */}
      <View style={styles.heroSection}>
        <Animated.View style={[styles.heroCard, { opacity: fadeAnim }]}>
          {slide.renderHero()}
        </Animated.View>
      </View>

      {/* Details Bottom Card */}
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
    backgroundColor: '#0F172A',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textWhite,
    letterSpacing: -0.5,
  },
  skipBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#1E293B',
    borderRadius: borderRadius.full,
  },
  skipText: {
    ...typography.label,
    fontSize: 13,
    color: '#94A3B8',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  heroCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHeroBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerShieldRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(249, 115, 22, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  outerPinRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroSubTag: {
    ...typography.caption,
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  detailsSection: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl,
    ...shadows.lg,
  },
  paginationRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.lg,
  },
  dot: {
    height: 6,
    width: 10,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  dotActive: {
    width: 32,
    backgroundColor: colors.primary,
  },
  subtitle: {
    ...typography.caption,
    fontSize: 13,
    color: colors.primaryDark,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    ...typography.h2,
    fontSize: 26,
    lineHeight: 32,
    color: colors.textPrimary,
    marginTop: 6,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  bottomButtons: {
    marginTop: spacing.xs,
  },
});
