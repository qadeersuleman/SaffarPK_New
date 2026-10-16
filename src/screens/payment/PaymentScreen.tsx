import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/cards/Card';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { ShieldIcon, CheckIcon } from '../../components/icons/AppIcons';
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

  const handlePay = () => {
    setIsProcessing(true);

    // Simulate payment API transaction with webhook confirmation
    setTimeout(() => {
      setIsProcessing(false);
      const fakeTxnId = `TXN-PK-${Math.floor(100000 + Math.random() * 900000)}`;
      onPaymentSuccess(method, fakeTxnId);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header
        title="Payment Method"
        subtitle={`Amount Payable: PKR ${amount}`}
        showBack
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Demo Mode Notice */}
        <View style={styles.demoBanner}>
          <ShieldIcon size={16} color="#B45309" />
          <View style={{ flex: 1 }}>
            <Text style={styles.demoTitle}>TESTING / DEMO MODE</Text>
            <Text style={styles.demoDesc}>
              Real wallet APIs (Easypaisa/JazzCash) will be connected in production. No real money will be charged.
            </Text>
          </View>
        </View>

        {/* Payment Amount Card */}
        <Card variant="elevated" style={styles.amountCard}>
          <Text style={styles.amountLabel}>Total Payable Amount</Text>
          <Text style={styles.amountValue}>PKR {amount}</Text>
          <Text style={styles.amountCurrency}>Pakistan Rupees</Text>
        </Card>

        {/* Method Selectors */}
        <Text style={styles.sectionTitle}>Select Digital Wallet</Text>

        {/* Easypaisa */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setMethod('easypaisa')}
          style={[
            styles.methodCard,
            method === 'easypaisa' ? styles.methodCardActive : null,
          ]}
        >
          <View style={styles.methodIconBoxGreen}>
            <Text style={styles.walletIconText}>EP</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>Easypaisa</Text>
            <Text style={styles.methodDesc}>Instant mobile wallet or debit card</Text>
          </View>
          {method === 'easypaisa' && (
            <View style={styles.checkCircle}>
              <CheckIcon size={14} color={colors.textWhite} />
            </View>
          )}
        </TouchableOpacity>

        {/* JazzCash */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setMethod('jazzcash')}
          style={[
            styles.methodCard,
            method === 'jazzcash' ? styles.methodCardActive : null,
          ]}
        >
          <View style={styles.methodIconBoxRed}>
            <Text style={styles.walletIconText}>JC</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>JazzCash</Text>
            <Text style={styles.methodDesc}>Pay using JazzCash mobile account</Text>
          </View>
          {method === 'jazzcash' && (
            <View style={styles.checkCircle}>
              <CheckIcon size={14} color={colors.textWhite} />
            </View>
          )}
        </TouchableOpacity>

        {/* Quick Demo Pay */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setMethod('demo')}
          style={[
            styles.methodCard,
            method === 'demo' ? styles.methodCardActive : null,
          ]}
        >
          <View style={styles.methodIconBoxOrange}>
            <Text style={styles.walletIconText}>⚡</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>1-Click Demo Pay</Text>
            <Text style={styles.methodDesc}>Simulate instant verified transaction</Text>
          </View>
          {method === 'demo' && (
            <View style={styles.checkCircle}>
              <CheckIcon size={14} color={colors.textWhite} />
            </View>
          )}
        </TouchableOpacity>

        {/* Wallet Number Input */}
        {method !== 'demo' && (
          <Card variant="outlined" style={styles.walletInputCard}>
            <Input
              label={`${method === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} Account Mobile Number`}
              placeholder="03001234567"
              keyboardType="phone-pad"
              maxLength={11}
              value={walletNumber}
              onChangeText={setWalletNumber}
            />
            <Text style={styles.walletHelpText}>
              You will receive an approval MPIN prompt on your phone.
            </Text>
          </Card>
        )}

        {/* Pay Button / Loading State */}
        <View style={styles.actionSection}>
          {isProcessing ? (
            <View style={styles.processingBox}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.processingText}>Securing seats & verifying transaction...</Text>
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
    gap: spacing.sm,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  demoTitle: {
    ...typography.caption,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  demoDesc: {
    ...typography.caption,
    color: '#B45309',
    fontSize: 11,
    marginTop: 2,
  },
  amountCard: {
    padding: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  amountLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  amountValue: {
    ...typography.h1,
    fontSize: 36,
    color: colors.primaryDark,
    marginTop: 4,
  },
  amountCurrency: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: spacing.md,
  },
  methodCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF7ED',
    ...shadows.sm,
  },
  methodIconBoxGreen: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIconBoxRed: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIconBoxOrange: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletIconText: {
    color: colors.textWhite,
    fontWeight: '900',
    fontSize: 16,
  },
  methodTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  methodDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletInputCard: {
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  walletHelpText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionSection: {
    marginTop: spacing.lg,
  },
  processingBox: {
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  processingText: {
    ...typography.bodyMedium,
    color: colors.primaryDark,
    fontWeight: '700',
  },
});
