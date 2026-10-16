import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/cards/Card';
import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/buttons/Button';
import { ShieldIcon, BusIcon } from '../../components/icons/AppIcons';
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

  const serviceFee = 30; // standard ticketing service fee in PKR
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header
        title="Passenger Information"
        subtitle="Step 3 of 4: Booking Details"
        showBack
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Journey Summary Card */}
        <Card variant="orangeSubtle" style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={styles.busBadge}>
              <BusIcon size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.summaryBusName}>{schedule.busName}</Text>
              <Text style={styles.summaryRoute}>
                {origin.name} → {destination.name} ({schedule.departureTime})
              </Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Reserved Seat(s):</Text>
            <Text style={styles.summaryValue}>{selectedSeats.join(', ')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Boarding Point:</Text>
            <Text style={styles.summaryValue}>{origin.landmark}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Drop-off Point:</Text>
            <Text style={styles.summaryValue}>{destination.landmark}</Text>
          </View>
        </Card>

        {/* Lead Passenger Form */}
        <Card variant="elevated" style={styles.formCard}>
          <Text style={styles.sectionHeading}>Lead Passenger</Text>
          <Text style={styles.sectionSub}>
            SMS ticket and QR code will be sent to this number.
          </Text>

          <Input
            label="Full Name (as per CNIC)"
            placeholder="e.g. Tariq Mehmood"
            value={fullName}
            onChangeText={setFullName}
          />

          <Input
            label="Mobile Phone Number"
            placeholder="03001234567"
            keyboardType="phone-pad"
            maxLength={11}
            value={phone}
            onChangeText={setPhone}
          />

          {/* Gender Selector */}
          <Text style={styles.fieldLabel}>Gender (for appropriate seat adjacent)</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
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
                👨 Male
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
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
                👩 Female
              </Text>
            </TouchableOpacity>
          </View>

          <Input
            label="CNIC / B-Form Number (Optional)"
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
            <Text style={styles.fareLabel}>Seat Fare ({selectedSeats.length} seat(s))</Text>
            <Text style={styles.fareValue}>PKR {totalFare}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Service & Terminal Fee</Text>
            <Text style={styles.fareValue}>PKR {serviceFee}</Text>
          </View>
          <View style={styles.fareDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total (PKR):</Text>
            <Text style={styles.totalValue}>PKR {grandTotal}</Text>
          </View>
        </Card>

        {/* Policies Note */}
        <View style={styles.policyRow}>
          <ShieldIcon size={16} color={colors.textSecondary} />
          <Text style={styles.policyText}>
            Free cancellation up to 2 hours prior to departure. 15 kg luggage allowance included.
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
    padding: spacing.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  busBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE8D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryBusName: {
    ...typography.label,
    color: colors.textPrimary,
  },
  summaryRoute: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.borderOrange,
    marginVertical: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  formCard: {
    padding: spacing.lg,
  },
  sectionHeading: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  sectionSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: 2,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  genderRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  genderOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  genderOptionActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF7ED',
  },
  genderOptionText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  genderOptionTextActive: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  fareCard: {
    padding: spacing.lg,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  fareLabel: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  fareValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  fareDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  totalLabel: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  policyText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
  payBtn: {
    marginTop: spacing.xs,
  },
});
