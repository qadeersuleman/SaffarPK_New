import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface IconProps {
  size?: number;
  color?: string;
}

export const BusIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>🚌</Text>
  </View>
);

export const LocationPinIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>📍</Text>
  </View>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 20, color = colors.textSecondary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>📅</Text>
  </View>
);

export const UserIcon: React.FC<IconProps> = ({ size = 20, color = colors.textSecondary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>👤</Text>
  </View>
);

export const SwapIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.75, color, fontWeight: 'bold' }}>⇅</Text>
  </View>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 16, color = colors.textSecondary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>🕒</Text>
  </View>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 18, color = colors.success }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color, fontWeight: 'bold' }}>✓</Text>
  </View>
);

export const ArrowBackIcon: React.FC<IconProps> = ({ size = 22, color = colors.dark }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>‹</Text>
  </View>
);

export const ArrowForwardIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size, color, fontWeight: 'bold' }}>›</Text>
  </View>
);

export const QrCodeIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>📱</Text>
  </View>
);

export const StarIcon: React.FC<IconProps> = ({ size = 16, color = '#F59E0B' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>★</Text>
  </View>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 18, color = colors.success }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>🛡️</Text>
  </View>
);

export const SteeringWheelIcon: React.FC<IconProps> = ({ size = 22, color = colors.textMuted }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <Text style={{ fontSize: size * 0.85, color }}>☸</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

