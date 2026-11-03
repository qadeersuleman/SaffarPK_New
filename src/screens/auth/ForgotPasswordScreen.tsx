import React, { useState } from 'react';
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
import { colors, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { ArrowBackIcon, CheckCircleFilledIcon } from '../../components/icons/AppIcons';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSendOtp: (phone: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onSendOtp,
}) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('3001234567');
  const [countryCode, setCountryCode] = useState('+92');

  const isValid = phone.length >= 7;

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
          <Text style={styles.headerTitle}>Forgot</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Illustration (Confused man with question marks) */}
          <View style={styles.illustrationWrap}>
            <Image
              source={require('../../assets/images/auth_forgot.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Heading and Subtitle */}
          <View style={styles.textBlock}>
            <Text style={styles.heading}>Forgot Password?</Text>
            <Text style={styles.subheading}>
              Don’t worry! it happens. Please enter phone number associated with your account
            </Text>
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter your mobile number</Text>
            <View style={styles.phoneInputContainer}>
              {/* Country Code Pill */}
              <View style={styles.countryCodeBox}>
                <Text style={styles.countryCodeText}>{countryCode}</Text>
                <Text style={styles.chevronDown}>⌄</Text>
              </View>
              <View style={styles.verticalDivider} />

              {/* Number Input */}
              <TextInput
                style={styles.phoneInput}
                keyboardType="phone-pad"
                placeholder="300 1234567"
                placeholderTextColor="#9CA3AF"
                value={phone}
                onChangeText={setPhone}
              />

              {/* Verified Checkmark Badge */}
              {isValid && (
                <View style={styles.checkIconWrap}>
                  <CheckCircleFilledIcon size={20} color="#F65D3A" />
                </View>
              )}
            </View>
          </View>

          {/* Send OTP Code Action Button */}
          <Button
            title="Send OTP Code"
            onPress={() => onSendOtp(`${countryCode} ${phone}`)}
            size="large"
            style={styles.actionBtn}
          />
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
    marginBottom: spacing.xxl,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  inputGroup: {
    width: '100%',
    marginBottom: spacing.xxl,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: borderRadius.xl,
    backgroundColor: '#FFFFFF',
    height: 56,
    paddingHorizontal: 12,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 8,
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  chevronDown: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: -2,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  checkIconWrap: {
    paddingRight: 4,
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#F65D3A',
    borderRadius: borderRadius.lg,
    paddingVertical: 14,
  },
});

