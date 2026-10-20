import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { Card } from '../../components/cards/Card';
import {
  BusIcon,
  ShieldIcon,
  PhoneIcon,
  UserIcon,
} from '../../components/icons/AppIcons';

interface LoginScreenProps {
  onSuccess: (user: { name: string; phone: string }) => void;
  onSkipGuest: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess, onSkipGuest }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('0300');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (phone.length < 11) {
      setError('Please enter a valid 11-digit mobile number (e.g. 03001234567)');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      setError('Please enter the 4-digit verification code');
      return;
    }
    setError('');
    onSuccess({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header Banner */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <BusIcon size={32} color={colors.primary} />
            </View>
            <Text style={styles.title}>
              Saffar<Text style={{ color: colors.primary }}>PK</Text>
            </Text>
            <Text style={styles.subtitle}>Sukkur ⇄ Obuaro Express Corridor</Text>
          </View>

          {/* Form Card */}
          <Card variant="elevated" style={styles.card}>
            {step === 'phone' ? (
              <>
                <Text style={styles.cardHeading}>Sign In or Register</Text>
                <Text style={styles.cardSubheading}>
                  Enter your details to manage your tickets and track live buses.
                </Text>

                <Input
                  label="FULL PASSENGER NAME"
                  placeholder="e.g. Tariq Mehmood"
                  value={name}
                  onChangeText={setName}
                  icon={<UserIcon size={20} color={colors.textSecondary} />}
                />

                <Input
                  label="PAKISTANI MOBILE NUMBER"
                  placeholder="03001234567"
                  keyboardType="phone-pad"
                  maxLength={11}
                  value={phone}
                  onChangeText={setPhone}
                  icon={<PhoneIcon size={20} color={colors.textSecondary} />}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.securityNote}>
                  <ShieldIcon size={18} color={colors.success} />
                  <Text style={styles.securityText}>We will send a 4-digit SMS OTP</Text>
                </View>

                <Button
                  title="Send Verification Code"
                  onPress={handleSendOtp}
                  style={styles.actionBtn}
                />
              </>
            ) : (
              <>
                <Text style={styles.cardHeading}>Verify Phone Number</Text>
                <Text style={styles.cardSubheading}>
                  Code sent via SMS to <Text style={{ fontWeight: '800', color: colors.textPrimary }}>{phone}</Text>
                </Text>

                <Input
                  label="4-DIGIT SMS CODE"
                  placeholder="1234"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
                  style={{ fontSize: 24, letterSpacing: 8, textAlign: 'center' }}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setStep('phone')}
                  style={styles.changePhoneBtn}
                >
                  <Text style={styles.changePhoneText}>Wrong number? Change phone</Text>
                </TouchableOpacity>

                <Button
                  title="Verify & Continue"
                  onPress={handleVerifyOtp}
                  style={styles.actionBtn}
                />
              </>
            )}

            {/* Guest Browsing */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={onSkipGuest} style={styles.guestBtn}>
              <Text style={styles.guestBtnText}>Browse Schedules as Guest</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  scrollContent: {
    padding: spacing.lg,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.darkElevated,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.glowOrange,
  },
  title: {
    ...typography.h1,
    fontSize: 34,
    color: colors.textWhite,
  },
  subtitle: {
    ...typography.caption,
    fontSize: 13,
    color: '#FED7AA',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    ...shadows.lg,
  },
  cardHeading: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
  },
  cardSubheading: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: spacing.md,
    backgroundColor: '#F0FDF4',
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  securityText: {
    ...typography.caption,
    fontSize: 13,
    color: '#15803D',
    fontWeight: '600',
  },
  errorText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  actionBtn: {
    marginTop: spacing.sm,
  },
  changePhoneBtn: {
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
  changePhoneText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.primary,
    fontWeight: '800',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    marginHorizontal: spacing.md,
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '800',
  },
  guestBtn: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    minHeight: 52,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestBtnText: {
    ...typography.label,
    fontSize: 15,
    color: colors.textPrimary,
  },
});
