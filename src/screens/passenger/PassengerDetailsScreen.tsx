import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/cards/Card';
import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/buttons/Button';
import {
  ShieldIcon,
  UserIcon,
  PhoneIcon,
} from '../../components/icons/AppIcons';
import { BusSchedule, RouteStop, PassengerInfo } from '../../types';

interface PassengerDetailsScreenProps {
  schedule: BusSchedule;
  origin: RouteStop;
  destination: RouteStop;
  selectedSeats: string[];
  totalFare: number;
  initialPassenger?: { name: string; phone: string };
  onBack: () => void;
  onProceedToPayment: (passenger: PassengerInfo) => void;
}

export const PassengerDetailsScreen: React.FC<PassengerDetailsScreenProps> = ({
  schedule,
  origin,
  destination,
  selectedSeats,
  totalFare,
  initialPassenger,
  onBack,
  onProceedToPayment,
}) => {
  const [fullName, setFullName] = useState(initialPassenger?.name || '');
  const [phone, setPhone] = useState(initialPassenger?.phone || '0300');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [cnic, setCnic] = useState('');
  const [error, setError] = useState('');

  const serviceFee = 30; // PKR
  const grandTotal = totalFare + serviceFee;

  const handleSubmit = () => {
    if (!fullName.trim()) {
      setError('Please provide the lead passenger full name.');
      return;
    }
    if (phone.length < 11) {
      setError('Please enter a valid 11-digit mobile number.');
      return;
    }
    setError('');

    onProceedToPayment({
      fullName: fullName.trim(),
      phoneNumber: phone.trim(),
      gender,
      cnic: cnic.trim() || undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <Header
        title="Passenger Details"
        subtitle="Step 3 of 4: Booking Confirmation"
        showBack
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Journey Summary Card with Coach Photo */}
        <Card variant="elevated" style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Image
              source={{
                uri:
                  schedule.bus.imageUrl ||
                  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
              }}
              style={styles.busThumbnail}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.summaryBusName}>{schedule.busName}</Text>
              <Text style={styles.summaryRoute}>
                {origin.name} → {destination.name} ({schedule.departureTime})
              </Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>RESERVED SEATS:</Text>
            <Text style={styles.summaryValueSeats}>{selectedSeats.join(', ')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>BOARDING TERMINAL:</Text>
            <Text style={styles.summaryValue}>{origin.landmark}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>ARRIVAL TERMINAL:</Text>
            <Text style={styles.summaryValue}>{destination.landmark}</Text>
          </View>
        </Card>

        {/* Lead Passenger Form */}
        <Card variant="elevated" style={styles.formCard}>
          <Text style={styles.sectionHeading}>Lead Passenger Information</Text>
          <Text style={styles.sectionSub}>
            Your digital e-ticket and boarding alerts will be sent here.
          </Text>

          <Input
            label="FULL PASSENGER NAME"
            placeholder="e.g. Tariq Mehmood"
            value={fullName}
            onChangeText={setFullName}
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

          {/* Gender Selector */}
          <Text style={styles.fieldLabel}>GENDER (FOR SEAT ALLOCATION RESPECT)</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setGender('male')}
              style={[
                styles.genderOption,
                gender === 'male' ? styles.genderOptionActive : null,
              ]}
            >
              <Text
                style={[
                  styles.genderOptionText,
                  gender === 'male' ? styles.genderOptionTextActive : null,
                ]}
              >
                👨 Male Passenger
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setGender('female')}
              style={[
                styles.genderOption,
                gender === 'female' ? styles.genderOptionActive : null,
              ]}
            >
              <Text
                style={[
                  styles.genderOptionText,
                  gender === 'female' ? styles.genderOptionTextActive : null,
                ]}
              >
                👩 Female Passenger
              </Text>
            </TouchableOpacity>
          </View>

          <Input
            label="CNIC NUMBER (OPTIONAL)"
            placeholder="42201-XXXXXXX-X"
            keyboardType="number-pad"
            value={cnic}
            onChangeText={setCnic}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </Card>

        {/* Fare Breakdown Card */}
        <Card variant="elevated" style={styles.fareCard}>
          <Text style={styles.sectionHeading}>Fare Breakdown</Text>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base Fare ({selectedSeats.length} seat(s))</Text>
            <Text style={styles.fareValue}>PKR {totalFare}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Terminal & Toll Fee</Text>
            <Text style={styles.fareValue}>PKR {serviceFee}</Text>
          </View>
          <View style={styles.fareDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Payable (PKR):</Text>
            <Text style={styles.totalValue}>PKR {grandTotal}</Text>
          </View>
        </Card>

        {/* Policies Note */}
        <View style={styles.policyRow}>
          <ShieldIcon size={18} color={colors.success} />
          <Text style={styles.policyText}>
            Guaranteed departure • Free cancellation up to 2 hours before trip • 15 kg luggage allowance
          </Text>
        </View>

        <Button
          title={`Proceed to Payment • PKR ${grandTotal}`}
          onPress={handleSubmit}
          size="large"
          style={styles.payBtn}
        />
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
    gap: spacing.lg,
  },
  summaryCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  busThumbnail: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    backgroundColor: '#1E293B',
  },
  summaryBusName: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textPrimary,
  },
  summaryRoute: {
    ...typography.caption,
    fontSize: 13,
    color: colors.primaryDark,
    fontWeight: '800',
    marginTop: 2,
  },
  summaryDivider: {
    height: 1.5,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  summaryLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  summaryValue: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  summaryValueSeats: {
    ...typography.label,
    fontSize: 15,
    color: colors.primaryDark,
    fontWeight: '900',
  },
  formCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  sectionHeading: {
    ...typography.h3,
    fontSize: 19,
    color: colors.textPrimary,
  },
  sectionSub: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    marginTop: 2,
  },
  fieldLabel: {
    ...typography.label,
    fontSize: 11,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs + 2,
    letterSpacing: 0.6,
  },
  genderRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  genderOption: {
    flex: 1,
    minHeight: 52,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  genderOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  genderOptionText: {
    ...typography.label,
    fontSize: 14,
    color: colors.textSecondary,
  },
  genderOptionTextActive: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  errorText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.error,
    marginTop: spacing.xs,
  },
  fareCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  fareLabel: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  },
  fareValue: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  fareDivider: {
    height: 1.5,
    backgroundColor: '#E2E8F0',
    marginVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.h2,
    fontSize: 26,
    color: colors.primaryDark,
    fontWeight: '900',
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#F0FDF4',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  policyText: {
    ...typography.caption,
    fontSize: 12,
    color: '#15803D',
    flex: 1,
    lineHeight: 18,
    fontWeight: '600',
  },
  payBtn: {
    marginTop: spacing.xs,
  },
});
