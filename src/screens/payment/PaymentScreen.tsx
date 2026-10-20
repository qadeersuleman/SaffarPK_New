import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/cards/Card';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import {
  ShieldIcon,
  CheckIcon,
  EasypaisaLogo,
  JazzCashLogo,
} from '../../components/icons/AppIcons';
import { PaymentMethod } from '../../types';

interface PaymentScreenProps {
  amount: number;
  passengerPhone: string;
  onBack: () => void;
  onPaymentSuccess: (method: PaymentMethod, transactionId: string) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  amount,
  passengerPhone,
  onBack,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<PaymentMethod>('easypaisa');
  const [walletNumber, setWalletNumber] = useState(passengerPhone);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('Initiating transaction...');

  const handlePay = () => {
    setIsProcessing(true);
    setProcessingStep('Connecting to secure gateway...');

    setTimeout(() => {
      setProcessingStep('Reserving seat hold & verifying MPIN...');
    }, 1000);

    setTimeout(() => {
      setProcessingStep('Generating electronic ticket reference...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      const fakeTxnId = `TXN-PK-${Math.floor(100000 + Math.random() * 900000)}`;
      onPaymentSuccess(method, fakeTxnId);
    }, 2600);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <Header
        title="Payment Gateway"
        subtitle={`Amount: PKR ${amount}`}
        showBack
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Testing Mode Disclaimer */}
        <View style={styles.demoBanner}>
          <ShieldIcon size={20} color="#B45309" />
          <View style={{ flex: 1 }}>
            <Text style={styles.demoTitle}>SECURE DEMO MODE ACTIVE</Text>
            <Text style={styles.demoDesc}>
              Simulated payment pipeline. No real balance will be deducted from your account.
            </Text>
          </View>
        </View>

        {/* Amount Display */}
        <Card variant="elevated" style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total Payable Amount</Text>
          <Text style={styles.amountValue}>PKR {amount}</Text>
          <Text style={styles.amountCurrency}>Pakistan National Rupees</Text>
        </Card>

        {/* Digital Wallets Section */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {/* Easypaisa */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setMethod('easypaisa')}
          style={[
            styles.methodCard,
            method === 'easypaisa' ? styles.methodCardActive : null,
          ]}
        >
          <EasypaisaLogo size={44} />
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>Easypaisa</Text>
            <Text style={styles.methodDesc}>Instant mobile wallet & OTC account</Text>
          </View>
          {method === 'easypaisa' && (
            <View style={styles.checkCircle}>
              <CheckIcon size={14} color={colors.textWhite} />
            </View>
          )}
        </TouchableOpacity>

        {/* JazzCash */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setMethod('jazzcash')}
          style={[
            styles.methodCard,
            method === 'jazzcash' ? styles.methodCardActive : null,
          ]}
        >
          <JazzCashLogo size={44} />
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>JazzCash</Text>
            <Text style={styles.methodDesc}>Pay using JazzCash mobile number</Text>
          </View>
          {method === 'jazzcash' && (
            <View style={styles.checkCircle}>
              <CheckIcon size={14} color={colors.textWhite} />
            </View>
          )}
        </TouchableOpacity>

        {/* 1-Click Instant Demo Pay */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setMethod('demo')}
          style={[
            styles.methodCard,
            method === 'demo' ? styles.methodCardActive : null,
          ]}
        >
          <View style={styles.demoIconCircle}>
            <Text style={{ fontSize: 20 }}>⚡</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>Instant 1-Tap Demo Pay</Text>
            <Text style={styles.methodDesc}>Fast simulate approved transaction</Text>
          </View>
          {method === 'demo' && (
            <View style={styles.checkCircle}>
              <CheckIcon size={14} color={colors.textWhite} />
            </View>
          )}
        </TouchableOpacity>

        {/* Phone Input for Wallets */}
        {method !== 'demo' && (
          <Card variant="outlined" style={styles.walletInputCard}>
            <Input
              label={`${method === 'easypaisa' ? 'EASYPAISA' : 'JAZZCASH'} WALLET MOBILE NUMBER`}
              placeholder="03001234567"
              keyboardType="phone-pad"
              maxLength={11}
              value={walletNumber}
              onChangeText={setWalletNumber}
            />
            <Text style={styles.walletHelpText}>
              A USSD popup or mobile app push approval will be requested.
            </Text>
          </Card>
        )}

        {/* Pay Action Section */}
        <View style={styles.actionSection}>
          {isProcessing ? (
            <View style={styles.processingBox}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.processingText}>{processingStep}</Text>
              <Text style={styles.processingSub}>Please do not close or navigate back</Text>
            </View>
          ) : (
            <Button
              title={`Confirm & Pay PKR ${amount}`}
              onPress={handlePay}
              size="large"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  demoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    padding: spacing.md + 2,
    borderRadius: borderRadius.xl,
  },
  demoTitle: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '900',
    color: '#92400E',
    letterSpacing: 0.6,
  },
  demoDesc: {
    ...typography.caption,
    fontSize: 12,
    color: '#B45309',
    marginTop: 2,
  },
  amountCard: {
    padding: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  amountLabel: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '800',
  },
  amountValue: {
    ...typography.h1,
    fontSize: 42,
    color: colors.primaryDark,
    marginTop: 6,
  },
  amountCurrency: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 19,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    gap: spacing.md,
  },
  methodCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    ...shadows.sm,
  },
  demoIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodTitle: {
    ...typography.h4,
    fontSize: 17,
    color: colors.textPrimary,
  },
  methodDesc: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletInputCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
  },
  walletHelpText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  actionSection: {
    marginTop: spacing.lg,
  },
  processingBox: {
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: colors.borderOrange,
  },
  processingText: {
    ...typography.label,
    fontSize: 16,
    color: colors.primaryDark,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  processingSub: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textMuted,
  },
});
