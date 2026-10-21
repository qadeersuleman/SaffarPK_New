import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface PulseBeaconProps {
  size?: number;
  color?: string;
  pulseSize?: number;
}

export const PulseBeacon: React.FC<PulseBeaconProps> = ({
  size = 12,
  color = '#22C55E',
  pulseSize = 28,
}) => {
  const pulseAnim1 = useRef(new Animated.Value(0)).current;
  const pulseAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createLoop = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const loop1 = createLoop(pulseAnim1, 0);
    const loop2 = createLoop(pulseAnim2, 900);

    loop1.start();
    loop2.start();

    return () => {
      loop1.stop();
      loop2.stop();
    };
  }, [pulseAnim1, pulseAnim2]);

  const scale1 = pulseAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, pulseSize / size],
  });

  const opacity1 = pulseAnim1.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.65, 0.25, 0],
  });

  const scale2 = pulseAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, pulseSize / size],
  });

  const opacity2 = pulseAnim2.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.65, 0.25, 0],
  });

  return (
    <View style={[styles.container, { width: pulseSize, height: pulseSize }]}>
      {/* Outer Ring 1 */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            opacity: opacity1,
            transform: [{ scale: scale1 }],
          },
        ]}
      />

      {/* Outer Ring 2 */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            opacity: opacity2,
            transform: [{ scale: scale2 }],
          },
        ]}
      />

      {/* Center Solid Dot */}
      <View
        style={[
          styles.centerDot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ring: {
    position: 'absolute',
  },
  centerDot: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
});

