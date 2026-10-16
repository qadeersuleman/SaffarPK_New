import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { Card } from '../../components/cards/Card';
import { BusIcon, ShieldIcon } from '../../components/icons/AppIcons';

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header Banner */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <BusIcon size={28} color={colors.primary} />
            </View>
            <Text style={styles.title}>Welcome to Saffar<Text style={{ color: colors.primary }}>PK</Text></Text>
            <Text style={styles.subtitle}>Sukkur ⇄ Obuaro Express Corridor</Text>
          </View>

          {/* Form Card */}
          <Card variant="elevated" style={styles.card}>
            {step === 'phone' ? (
              <>
                <Text style={styles.cardHeading}>Sign In or Register</Text>
                <Text style={styles.cardSubheading}>
                  Enter your mobile details to manage your tickets and track bookings.
                </Text>

                <Input
                  label="Full Passenger Name"
                  placeholder="e.g. Ali Raza"
                  value={name}
                  onChangeText={setName}
                />

                <Input
                  label="Pakistani Mobile Number"
                  placeholder="03001234567"
                  keyboardType="phone-pad"
                  maxLength={11}
                  value={phone}
                  onChangeText={setPhone}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.securityNote}>
                  <ShieldIcon size={16} color={colors.textSecondary} />
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
                  Code sent to <Text style={{ fontWeight: '700', color: colors.textPrimary }}>{phone}</Text>
                </Text>

                <Input
                  label="4-Digit OTP Code"
                  placeholder="1234"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={otp}
                  onChangeText={setOtp}
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#262626',
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textWhite,
  },
  subtitle: {
    ...typography.caption,
    color: colors.primaryLight,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  cardHeading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  cardSubheading: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: spacing.sm,
  },
  securityText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  actionBtn: {
    marginTop: spacing.md,
  },
  changePhoneBtn: {
    alignSelf: 'center',
    marginVertical: spacing.sm,
  },
  changePhoneText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    marginHorizontal: spacing.md,
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '700',
  },
  guestBtn: {
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  guestBtnText: {
    ...typography.label,
    color: colors.textPrimary,
  },
});
