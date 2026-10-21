import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FloatingElementProps {
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  style?: ViewStyle;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  distance = 6,
  duration = 2000,
  style,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -distance,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [translateY, distance, duration]);

  return (
    <Animated.View style={[style, { transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};

