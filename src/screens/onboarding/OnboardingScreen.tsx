import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { ScalePressable } from '../../components/animations';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const SLIDES = [
  {
    id: '1',
    image: require('../../assets/images/onboarding_1.png'),
    title: 'Explore The World With\nSaffarPK',
    description:
      'Discover seamless intercity journeys across the Sukkur to Obuaro corridor. Guaranteed seats, luxury coaches, and live tracking at your fingertips.',
  },
  {
    id: '2',
    image: require('../../assets/images/onboarding_2.png'),
    title: 'Make Memories That Last\na Lifetime',
    description:
      'Experience VIP reclining seats, onboard climate control, high-speed WiFi, and 24/7 highway safety for your family and solo trips.',
  },
  {
    id: '3',
    image: require('../../assets/images/onboarding_3.png'),
    title: 'Plan Your Dream Trip\nWith SaffarPK',
    description:
      'Reserve your seat in seconds, track your coach in real-time with live GPS, and pay effortlessly via Easypaisa, JazzCash, or on-board.',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transition animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideTranslateX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 0.15, duration: 160, useNativeDriver: true }),
          Animated.timing(slideTranslateX, { toValue: -30, duration: 160, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 240, useNativeDriver: true }),
          Animated.spring(slideTranslateX, { toValue: 0, friction: 7, tension: 45, useNativeDriver: true }),
        ]),
      ]).start();
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const slide = SLIDES[currentIndex];

  // Circular progress calculations for the right action button
  const progressSize = 58;
  const strokeWidth = 3.2;
  const radius = (progressSize - strokeWidth * 2) / 2; // 25.8
  const circumference = 2 * Math.PI * radius; // ~162.1
  const progressRatio = (currentIndex + 1) / SLIDES.length;
  const strokeDashoffset = circumference - circumference * progressRatio;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 24 }]}>
      <StatusBar barStyle="dark-content" />

      {/* Top Bar with Skip Button */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity activeOpacity={0.7} onPress={onComplete} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        {/* Animated Hero Illustration with Baseline Divider */}
        <Animated.View
          style={[
            styles.heroArea,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideTranslateX }],
            },
          ]}
        >
          <Image source={slide.image} style={styles.heroImage} resizeMode="contain" />
          <View style={styles.horizontalDivider} />
        </Animated.View>

        {/* Text Area (Headings and Description) */}
        <Animated.View
          style={[
            styles.textArea,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideTranslateX }],
            },
          ]}
        >
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </Animated.View>
      </View>

      {/* Bottom Controls Row: Pagination Dots on Left, Circular Progress Button on Right */}
      <View style={styles.bottomControlsRow}>
        {/* Left Pagination Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, idx) => {
            const isActive = currentIndex === idx;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => {
                  if (idx !== currentIndex) {
                    setCurrentIndex(idx);
                  }
                }}
                style={[
                  styles.dot,
                  isActive ? styles.dotActive : styles.dotInactive,
                ]}
              />
            );
          })}
        </View>

        {/* Right Circular Progress Action Button */}
        <ScalePressable
          activeScale={0.9}
          onPress={handleNext}
          style={styles.progressBtnWrapper}
        >
          <Svg width={progressSize} height={progressSize} style={styles.progressSvg}>
            {/* Background Track Circle */}
            <Circle
              cx={progressSize / 2}
              cy={progressSize / 2}
              r={radius}
              stroke="#FED7AA"
              strokeWidth={strokeWidth}
              fill="none"
              opacity={0.4}
            />
            {/* Active Coral Orange Progress Arc */}
            <Circle
              cx={progressSize / 2}
              cy={progressSize / 2}
              r={radius}
              stroke="#F65D3A"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              transform={`rotate(-90 ${progressSize / 2} ${progressSize / 2})`}
            />
          </Svg>

          {/* Inner Solid Coral-Orange Button with White Arrow */}
          <View style={styles.innerOrangeBtn}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 5L16 12L9 19"
                stroke="#FFFFFF"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </ScalePressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
    height: 48,
  },
  skipBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heroArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  heroImage: {
    width: width * 0.78,
    height: width * 0.72,
    maxHeight: 290,
  },
  horizontalDivider: {
    width: '92%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: spacing.md,
  },
  textArea: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginTop: 12,
  },
  bottomControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 7,
    borderRadius: 3.5,
  },
  dotActive: {
    width: 26,
    backgroundColor: '#F65D3A',
  },
  dotInactive: {
    width: 7,
    backgroundColor: '#FED7AA',
  },
  progressBtnWrapper: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  innerOrangeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F65D3A',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
});
