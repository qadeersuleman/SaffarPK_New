import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';

interface AuthSuccessScreenProps {
  userName?: string;
  onBegin: () => void;
}

export const AuthSuccessScreen: React.FC<AuthSuccessScreenProps> = ({
  userName,
  onBegin,
}) => {
  const insets = useSafeAreaInsets();

  // Animations: scale bounce + fade in
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('#FFFFFF');
    }

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Gentle floating loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim, opacityAnim, floatAnim]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.xl,
          paddingBottom: insets.bottom > 0 ? insets.bottom + spacing.lg : spacing.xl,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Main Centered Graphic & Title */}
      <View style={styles.centerSection}>
        <Animated.View
          style={[
            styles.imageWrapper,
            {
              opacity: opacityAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: floatAnim },
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/images/auth_success.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={{ opacity: opacityAnim, alignItems: 'center' }}>
          <Text style={styles.title}>You’re all set!</Text>
          {userName ? (
            <Text style={styles.subtitle}>Welcome aboard, {userName}</Text>
          ) : null}
        </Animated.View>

        {/* CTA Button placed below title as shown in Figma */}
        <Animated.View style={[styles.buttonWrapper, { opacity: opacityAnim }]}>
          <Button
            title="Let’s Begin"
            onPress={onBegin}
            variant="primary"
            size="large"
            style={styles.ctaButton}
            textStyle={styles.ctaButtonText}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  imageWrapper: {
    width: 254,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 36,
  },
  ctaButton: {
    backgroundColor: colors.primary, // #F65D3A
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
