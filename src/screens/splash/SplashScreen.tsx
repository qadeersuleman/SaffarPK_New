import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { SaffarLogo } from '../../components/brand/SaffarLogo';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const insets = useSafeAreaInsets();

  // Entrance & Breathing Animations
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const rippleScale = useRef(new Animated.Value(0.95)).current;
  const rippleOpacity = useRef(new Animated.Value(0.6)).current;
  const bottomDotScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('#F65D3A');
      (StatusBar as any).setTranslucent?.(true);
    }

    // 1. Initial Logo Entrance
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(bottomDotScale, {
        toValue: 1,
        duration: 900,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Continuous Organic Ripple Beacon Loop
    const rippleLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rippleScale, {
            toValue: 1.05,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rippleScale, {
            toValue: 0.96,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0.65,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    rippleLoop.start();

    // 3. Navigation Timer
    const timer = setTimeout(() => {
      // Gentle fade out exit
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2400);

    return () => {
      clearTimeout(timer);
      rippleLoop.stop();
    };
  }, [logoOpacity, logoScale, rippleScale, rippleOpacity, bottomDotScale, onFinish]);

  return (
    <View style={styles.container}>
      {/* Full Screen Edge-to-Edge Figma Sunset Coral Orange Background */}
      <StatusBar barStyle="light-content" />

      {/* Subtle Ambient Radial Backlight */}
      <Animated.View
        style={[
          styles.ambientBacklight,
          {
            opacity: rippleOpacity,
            transform: [{ scale: rippleScale }],
          },
        ]}
      />

      {/* Centered SaffarPK Figma-Style Logo Lockup */}
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <SaffarLogo
          variant="horizontal"
          theme="white"
          size="large"
          tagline="YOUR JOURNEY, JUST A TAP AWAY"
          showTagline={true}
        />
      </Animated.View>

      {/* Elegant Minimal Bottom Loading Indicator */}
      <Animated.View
        style={[
          styles.bottomIndicator,
          {
            bottom: insets.bottom > 0 ? insets.bottom + 28 : 44,
            opacity: bottomDotScale,
          },
        ]}
      >
        <View style={styles.dotRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F65D3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ambientBacklight: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bottomIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    width: 22,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
});
