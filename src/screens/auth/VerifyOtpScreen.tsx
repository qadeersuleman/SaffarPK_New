import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { ArrowBackIcon } from '../../components/icons/AppIcons';

interface VerifyOtpScreenProps {
  phoneNumber?: string;
  onBack: () => void;
  onVerifySuccess: () => void;
}

export const VerifyOtpScreen: React.FC<VerifyOtpScreenProps> = ({
  phoneNumber = '+92 300 1234567',
  onBack,
  onVerifySuccess,
}) => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(12);

  const inputRefs = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
  ];

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-advance
    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const isComplete = otp.every(digit => digit.length > 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.backBtn}>
            <ArrowBackIcon size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verify</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Illustration (Phone with lock & woman with key) */}
          <View style={styles.illustrationWrap}>
            <Image
              source={require('../../assets/images/auth_otp.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Heading and Subtitle */}
          <View style={styles.textBlock}>
            <Text style={styles.heading}>Enter OTP</Text>
            <Text style={styles.subheading}>
              An 4 digit OTP has been sent to{'\n'}
              <Text style={styles.phoneHighlight}>{phoneNumber}</Text>
            </Text>
          </View>

          {/* 4-Box PIN Input */}
          <View style={styles.otpBoxesRow}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={inputRefs[idx]}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={text => handleOtpChange(text, idx)}
                onKeyPress={e => handleKeyPress(e, idx)}
                textAlign="center"
              />
            ))}
          </View>

          {/* Verify Action Button */}
          <Button
            title="Verify"
            onPress={onVerifySuccess}
            size="large"
            style={styles.verifyBtn}
          />

          {/* Resend Timer Footer */}
          <View style={styles.resendRow}>
            {secondsLeft > 0 ? (
              <Text style={styles.resendText}>
                Resend OTP <Text style={styles.timerText}>({String(secondsLeft).padStart(2, '0')}:00)</Text>
              </Text>
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={() => setSecondsLeft(30)}>
                <Text style={styles.resendAction}>Resend OTP Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    height: 52,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  scrollContent: {
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
  },
  illustrationWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  heroImage: {
    width: 250,
    height: 230,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneHighlight: {
    fontWeight: '800',
    color: '#111827',
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: spacing.xxl,
    width: '100%',
  },
  otpBox: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  otpBoxFilled: {
    borderColor: '#F65D3A',
    backgroundColor: '#FFF7ED',
  },
  verifyBtn: {
    width: '100%',
    backgroundColor: '#F65D3A',
    borderRadius: borderRadius.lg,
    paddingVertical: 14,
  },
  resendRow: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  timerText: {
    color: '#9CA3AF',
  },
  resendAction: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F65D3A',
  },
});
