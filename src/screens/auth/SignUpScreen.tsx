import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { SaffarLogo } from '../../components/brand/SaffarLogo';
import {
  ArrowBackIcon,
  CheckCircleFilledIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  FacebookIcon,
} from '../../components/icons/AppIcons';
import { ScalePressable } from '../../components/animations';

interface SignUpScreenProps {
  onBack: () => void;
  onGoToLogin: () => void;
  onSendOtp: (phone: string) => void;
  onSocialLogin: (provider: string) => void;
  onContinueGuest: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onBack,
  onGoToLogin,
  onSendOtp,
  onSocialLogin,
  onContinueGuest,
}) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('3001234567');
  const [password, setPassword] = useState('pass123456');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+92');

  const isValid = phone.length >= 7;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Top Header Bar */}
        <View style={styles.topHeader}>
          <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.backBtn}>
            <ArrowBackIcon size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={styles.langPill}>
            <Text style={styles.langText}>English</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Centered SaffarPK Logo */}
          <View style={styles.logoWrap}>
            <SaffarLogo
              variant="horizontal"
              theme="primary"
              size="large"
              tagline="EXPLORE THE WORLD"
              showTagline={true}
            />
          </View>

          {/* Mobile Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter your mobile number</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.countryCodeText}>{countryCode}</Text>
                <Text style={styles.chevronDown}>⌄</Text>
              </View>
              <View style={styles.verticalDivider} />

              <TextInput
                style={styles.phoneInput}
                keyboardType="phone-pad"
                placeholder="300 1234567"
                placeholderTextColor="#9CA3AF"
                value={phone}
                onChangeText={setPhone}
              />

              {isValid && (
                <View style={styles.checkIconWrap}>
                  <CheckCircleFilledIcon size={20} color="#F65D3A" />
                </View>
              )}
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter your password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={!showPassword}
                placeholder="Enter password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <EyeOffIcon size={20} color="#94A3B8" /> : <EyeIcon size={20} color="#94A3B8" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Send OTP Code Primary Button */}
          <Button
            title="Send OTP Code"
            onPress={() => onSendOtp(`${countryCode} ${phone}`)}
            size="large"
            style={styles.submitBtn}
          />

          {/* Switch to Sign In */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onGoToLogin}>
              <Text style={styles.switchHighlight}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* "or" Divider */}
          <View style={styles.orDividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Logins */}
          <ScalePressable
            activeScale={0.96}
            onPress={() => onSocialLogin('Google')}
            style={styles.socialBtn}
          >
            <GoogleIcon size={20} />
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </ScalePressable>

          <ScalePressable
            activeScale={0.96}
            onPress={() => onSocialLogin('Facebook')}
            style={styles.socialBtn}
          >
            <FacebookIcon size={20} />
            <Text style={styles.socialBtnText}>Continue with Facebook</Text>
          </ScalePressable>

          {/* "or" Divider 2 */}
          <View style={styles.orDividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue as Guest */}
          <TouchableOpacity activeOpacity={0.7} onPress={onContinueGuest} style={styles.guestLink}>
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>
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
  langPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: '#F65D3A',
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F65D3A',
  },
  scrollContent: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  logoWrap: {
    marginVertical: spacing.xl,
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: spacing.md,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: borderRadius.xl,
    backgroundColor: '#FFFFFF',
    height: 56,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  eyeBtn: {
    padding: 6,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#F65D3A',
    borderRadius: borderRadius.lg,
    paddingVertical: 14,
    marginTop: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  switchText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
  },
  switchHighlight: {
    fontSize: 13,
    color: '#F65D3A',
    fontWeight: '800',
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginBottom: spacing.sm,
    gap: 10,
    ...shadows.sm,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  guestLink: {
    paddingVertical: 8,
  },
  guestText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
});

