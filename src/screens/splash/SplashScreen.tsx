import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { BusIllustration } from '../../components/icons/AppIcons';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const busTranslateX = useRef(new Animated.Value(-120)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(busTranslateX, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2200,
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, busTranslateX, progressAnim, onFinish]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Ambient Radial Glow */}
      <View style={styles.glowCircle} />
      <View style={styles.glowCircle2} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Animated Luxury Bus Illustration */}
        <Animated.View style={{ transform: [{ translateX: busTranslateX }] }}>
          <View style={styles.illustrationCard}>
            <BusIllustration width={300} height={140} />
          </View>
        </Animated.View>

        <Text style={styles.logoTitle}>
          Saffar<Text style={styles.logoHighlight}>PK</Text>
        </Text>
        <Text style={styles.tagline}>Your journey, just a tap away.</Text>

        <View style={styles.routePill}>
          <View style={styles.routePulseDot} />
          <Text style={styles.routeText}>Sukkur ⇄ Obuaro Express Corridor</Text>
        </View>
      </Animated.View>

      {/* Bottom Loading Progress Bar */}
      <View style={styles.footer}>
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>
        <Text style={styles.footerNote}>Premium Intercity Transit • Sindh, Pakistan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep modern obsidian
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  glowCircle: {
    position: 'absolute',
    top: '25%',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#F97316',
    opacity: 0.15,
  },
  glowCircle2: {
    position: 'absolute',
    bottom: '20%',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#38BDF8',
    opacity: 0.08,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  illustrationCard: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTitle: {
    ...typography.h1,
    fontSize: 48,
    lineHeight: 54,
    color: colors.textWhite,
    letterSpacing: -1.2,
    marginTop: spacing.md,
  },
  logoHighlight: {
    color: colors.primary,
  },
  tagline: {
    ...typography.bodyLarge,
    fontSize: 17,
    color: '#94A3B8',
    marginTop: spacing.sm,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  routePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(249, 115, 22, 0.14)',
    borderWidth: 1.5,
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  routePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  routeText: {
    color: '#FED7AA',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    alignItems: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#1E293B',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  footerNote: {
    ...typography.caption,
    fontSize: 12,
    color: '#64748B',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
