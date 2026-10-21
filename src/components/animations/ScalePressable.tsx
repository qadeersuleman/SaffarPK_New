import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
  GestureResponderEvent,
} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ScalePressableProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  activeScale?: number;
  style?: StyleProp<ViewStyle>;
}

export const ScalePressable: React.FC<ScalePressableProps> = ({
  children,
  onPress,
  activeScale = 0.96,
  disabled = false,
  style,
  onPressIn,
  onPressOut,
  ...rest
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: GestureResponderEvent) => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: activeScale,
      speed: 50,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      speed: 40,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[style, { transform: [{ scale }] }]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
};
