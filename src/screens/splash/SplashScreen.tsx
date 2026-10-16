import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { BusIcon } from '../../components/icons/AppIcons';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const busMoveAnim = useRef(new Animated.Value(-60)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(busMoveAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2400);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, busMoveAnim, onFinish]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Glow Backdrop */}
      <View style={styles.glowCircle} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View style={{ transform: [{ translateY: busMoveAnim }] }}>
          <View style={styles.iconCircle}>
            <BusIcon size={56} color={colors.primary} />
          </View>
        </Animated.View>

        <Text style={styles.logoTitle}>
          Saffar<Text style={styles.logoHighlight}>PK</Text>
        </Text>
        <Text style={styles.tagline}>Your journey, just a tap away.</Text>

        <View style={styles.routeTag}>
          <Text style={styles.routeText}>Sukkur ⇄ Obuaro Express Corridor</Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.dotRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.footerText}>Reliable • Comfortable • Punctual</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  glowCircle: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#F97316',
    opacity: 0.12,
  },
  content: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#262626',
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  logoTitle: {
    ...typography.h1,
    fontSize: 42,
    lineHeight: 48,
    color: colors.textWhite,
    letterSpacing: -1,
  },
  logoHighlight: {
    color: colors.primary,
  },
  tagline: {
    ...typography.bodyMedium,
    color: colors.textMuted,
    marginTop: spacing.sm,
    letterSpacing: 0.5,
  },
  routeTag: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  routeText: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  dotRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#374151',
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 18,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
