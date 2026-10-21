import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/buttons/Button';
import { SteeringWheelIcon, ClockIcon } from '../../components/icons/AppIcons';
import { BusSchedule, RouteStop } from '../../types';
import { FadeInUp, ScalePressable } from '../../components/animations';

interface SeatSelectionScreenProps {
  schedule: BusSchedule;
  origin: RouteStop;
  destination: RouteStop;
  farePerSeat: number;
  passengerCount: number;
  onBack: () => void;
  onProceed: (selectedSeats: string[], totalFare: number) => void;
}

export const SeatSelectionScreen: React.FC<SeatSelectionScreenProps> = ({
  schedule,
  origin,
  destination,
  farePerSeat,
  passengerCount,
  onBack,
  onProceed,
}) => {
  const insets = useSafeAreaInsets();
  const totalRows = schedule.bus.layout?.rows || 10;
  const isRoyal = schedule.busCategory === 'Royal';

  const [bookedSeats] = useState<string[]>([
    '1A', '2B', '3A', '5B', '6C', '7A', '9D',
  ]);
  const [femaleSeats] = useState<string[]>(['1B', '2A']);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleToggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= passengerCount) {
        Alert.alert(
          'Passenger Limit',
          `You selected ${passengerCount} passenger(s). Deselect a seat to choose another.`
        );
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalFare = selectedSeats.length * farePerSeat;

  const renderSeat = (seatId: string) => {
    const isBooked = bookedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);
    const isFemale = femaleSeats.includes(seatId);

    let seatBg = colors.surface;
    let seatBorder = '#CBD5E1';
    let textColor = colors.textPrimary;

    if (isBooked) {
      seatBg = '#E2E8F0';
      seatBorder = '#CBD5E1';
      textColor = '#94A3B8';
    } else if (isSelected) {
      seatBg = colors.primary;
      seatBorder = colors.primaryDark;
      textColor = colors.textWhite;
    } else if (isFemale) {
      seatBg = '#FCE7F3';
      seatBorder = '#F472B6';
      textColor = '#BE185D';
    }

    return (
      <ScalePressable
        key={seatId}
        disabled={isBooked}
        activeScale={0.84}
        onPress={() => handleToggleSeat(seatId)}
        style={[
          styles.seatBox,
          { backgroundColor: seatBg, borderColor: seatBorder },
          isSelected ? shadows.glowOrange : null,
        ]}
      >
        <Text style={[styles.seatText, { color: textColor }]}>{seatId}</Text>
      </ScalePressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <Header
        title="Select Your Seats"
        subtitle={`${schedule.busName} • ${origin.name} → ${destination.name}`}
        showBack
        onBack={onBack}
      />

      {/* Reservation Hold Timer Banner */}
      <View style={styles.timerBar}>
        <View style={styles.timerLeft}>
          <ClockIcon size={16} color="#B45309" />
          <Text style={styles.timerLabel}>Seats held temporarily for:</Text>
        </View>
        <Text style={styles.timerDigits}>{formatTimer(timeLeft)}</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 160 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Luxury Coach Interior Photo Showcase */}
        <FadeInUp delay={60} distance={18}>
          <View style={styles.coachHeroCard}>
            <Image
              source={{
                uri:
                  schedule.bus.interiorImageUrl ||
                  schedule.bus.imageUrl ||
                  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
              }}
              style={styles.coachHeroImage}
            />
            <View style={styles.coachHeroOverlay} />
            <View style={styles.coachHeroContent}>
              <Text style={styles.coachHeroTitle}>{schedule.bus.name}</Text>
              <Text style={styles.coachHeroSub}>
                {schedule.busCategory} Class • Fully Air-Conditioned • USB Charging
              </Text>
            </View>
          </View>
        </FadeInUp>

        {/* Legend & Bus Cabin Visual Layout */}
        <FadeInUp delay={140} distance={24}>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: colors.surface, borderColor: '#CBD5E1' }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: colors.primary, borderColor: colors.primaryDark }]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#E2E8F0', borderColor: '#CBD5E1' }]} />
              <Text style={styles.legendText}>Booked</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: '#FCE7F3', borderColor: '#F472B6' }]} />
              <Text style={styles.legendText}>Ladies Only</Text>
            </View>
          </View>

          <View style={styles.busCabin}>
          {/* Driver Cabin Row */}
          <View style={styles.driverCabinRow}>
            <View style={styles.frontGlass}>
              <Text style={styles.frontGlassText}>FRONT WINDSHIELD</Text>
            </View>
            <View style={styles.driverSeatBox}>
              <SteeringWheelIcon size={26} color={colors.textSecondary} />
              <Text style={styles.driverText}>Captain</Text>
            </View>
          </View>

          {/* Seat Grid */}
          <View style={styles.gridContainer}>
            {Array.from({ length: totalRows }).map((_, rowIdx) => {
              const rowNum = rowIdx + 1;
              return (
                <View key={rowNum} style={styles.seatRow}>
                  {/* Left Column(s) */}
                  <View style={styles.seatPair}>
                    {renderSeat(`${rowNum}A`)}
                    {!isRoyal && renderSeat(`${rowNum}B`)}
                  </View>

                  {/* Aisle */}
                  <View style={styles.aisle}>
                    <Text style={styles.aisleText}>{rowNum}</Text>
                  </View>

                  {/* Right Column(s) */}
                  <View style={styles.seatPair}>
                    {renderSeat(isRoyal ? `${rowNum}B` : `${rowNum}C`)}
                    {renderSeat(isRoyal ? `${rowNum}C` : `${rowNum}D`)}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Rear Bus Base */}
          <View style={styles.busRear}>
            <Text style={styles.busRearText}>REAR ENGINE & LUGGAGE</Text>
          </View>
        </View>
        </FadeInUp>
      </ScrollView>

      {/* Floating Bottom Booking Action Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : spacing.xl,
          },
        ]}
      >
        <View style={styles.fareSummaryCol}>
          <Text style={styles.summarySeats}>
            Selected Seats: <Text style={{ fontWeight: '800', color: colors.textPrimary }}>
              {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
            </Text>
          </Text>
          <View style={styles.totalFareRow}>
            <Text style={styles.totalFareLabel}>Total Fare:</Text>
            <Text style={styles.totalFareAmount}>PKR {totalFare}</Text>
          </View>
        </View>

        <Button
          title={
            selectedSeats.length === 0
              ? `Select ${passengerCount} Seat(s)`
              : `Proceed (${selectedSeats.length})`
          }
          disabled={selectedSeats.length === 0}
          onPress={() => onProceed(selectedSeats, totalFare)}
          size="medium"
          style={styles.proceedBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  timerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1.5,
    borderBottomColor: '#FDE68A',
  },
  timerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerLabel: {
    ...typography.caption,
    fontSize: 13,
    color: '#92400E',
    fontWeight: '700',
  },
  timerDigits: {
    ...typography.label,
    fontSize: 15,
    color: '#B45309',
    fontWeight: '900',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 120,
  },
  coachHeroCard: {
    height: 120,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    position: 'relative',
    ...shadows.md,
  },
  coachHeroImage: {
    width: '100%',
    height: '100%',
  },
  coachHeroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 15, 25, 0.65)',
  },
  coachHeroContent: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.lg,
    right: spacing.lg,
  },
  coachHeroTitle: {
    ...typography.h3,
    fontSize: 19,
    color: colors.textWhite,
  },
  coachHeroSub: {
    ...typography.caption,
    fontSize: 12,
    color: '#FFD4C2',
    marginTop: 2,
    fontWeight: '700',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    padding: spacing.md + 2,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
  },
  legendText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  busCabin: {
    backgroundColor: colors.surface,
    borderRadius: 40,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    ...shadows.lg,
  },
  driverCabinRow: {
    width: '100%',
    paddingBottom: spacing.lg,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frontGlass: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
    backgroundColor: '#F1F5F9',
  },
  frontGlassText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  driverSeatBox: {
    alignItems: 'center',
  },
  driverText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '800',
    marginTop: 2,
  },
  gridContainer: {
    width: '100%',
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatPair: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  seatBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatText: {
    fontSize: 14,
    fontWeight: '800',
  },
  aisle: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aisleText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  busRear: {
    width: '100%',
    paddingTop: spacing.lg,
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
  },
  busRearText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    ...shadows.lg,
  },
  fareSummaryCol: {
    flex: 1,
    marginRight: spacing.md,
  },
  summarySeats: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
  },
  totalFareRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 3,
  },
  totalFareLabel: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '700',
  },
  totalFareAmount: {
    ...typography.h2,
    fontSize: 24,
    color: colors.primaryDark,
    fontWeight: '900',
  },
  proceedBtn: {
    minWidth: 130,
    flexShrink: 0,
  },
});
