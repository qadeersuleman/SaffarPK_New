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
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { ArrowBackIcon, EyeIcon, EyeOffIcon } from '../../components/icons/AppIcons';

interface ResetPasswordScreenProps {
  onBack: () => void;
  onSubmitSuccess: () => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
  onSubmitSuccess,
}) => {
  const insets = useSafeAreaInsets();
  const [newPassword, setNewPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success 🎉', 'Your password has been successfully reset. Please log in with your new credentials.', [
      { text: 'Log In Now', onPress: onSubmitSuccess },
    ]);
  };

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
          <Text style={styles.headerTitle}>Reset</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Illustration (Two travelers carrying big orange key) */}
          <View style={styles.illustrationWrap}>
            <Image
              source={require('../../assets/images/auth_reset.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* Heading and Subtitle */}
          <View style={styles.textBlock}>
            <Text style={styles.heading}>Reset Your Password</Text>
            <Text style={styles.subheading}>Now you can reset your old password</Text>
          </View>

          {/* New Password Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter a new password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={!showNew}
                placeholder="Enter new password"
                placeholderTextColor="#9CA3AF"
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowNew(!showNew)}
                style={styles.eyeBtn}
              >
                {showNew ? <EyeOffIcon size={20} color="#94A3B8" /> : <EyeIcon size={20} color="#94A3B8" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm new password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={!showConfirm}
                placeholder="Confirm new password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowConfirm(!showConfirm)}
                style={styles.eyeBtn}
              >
                {showConfirm ? <EyeOffIcon size={20} color="#94A3B8" /> : <EyeIcon size={20} color="#94A3B8" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Action Button */}
          <Button
            title="Submit"
            onPress={handleSubmit}
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
  },
  inputGroup: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
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
  actionBtn: {
    width: '100%',
    backgroundColor: '#F65D3A',
    borderRadius: borderRadius.lg,
    paddingVertical: 14,
    marginTop: spacing.md,
  },
});

