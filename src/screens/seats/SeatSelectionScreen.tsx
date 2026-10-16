import React, { useState, useEffect } from 'react';
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
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/buttons/Button';
import { SteeringWheelIcon, ShieldIcon, ClockIcon } from '../../components/icons/AppIcons';
import { BusSchedule, RouteStop } from '../../types';

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
  // Generate seats grid
  const totalRows = schedule.bus.layout?.rows || 10;
  const isRoyal = schedule.busCategory === 'Royal'; // 1 + 2 seating layout

  // Initialize booked seats for realism
  const [bookedSeats] = useState<string[]>([
    '1A', '2B', '3A', '5B', '6C', '7A', '9D',
  ]);
  const [femaleSeats] = useState<string[]>(['1B', '2A']);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10:00 reservation timer

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
        // Replace or notify
        Alert.alert(
          'Limit Reached',
          `You selected ${passengerCount} passenger(s) earlier. Deselect a seat to choose another, or adjust passenger count.`
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
    let seatBorder = colors.border;
    let textColor = colors.textPrimary;

    if (isBooked) {
      seatBg = '#E5E7EB';
      seatBorder = '#D1D5DB';
      textColor = colors.textMuted;
    } else if (isSelected) {
      seatBg = colors.primary;
      seatBorder = colors.primaryDark;
      textColor = colors.textWhite;
    } else if (isFemale) {
      seatBg = '#FCE7F3'; // light pink
      seatBorder = '#F472B6';
      textColor = '#BE185D';
    }

    return (
      <TouchableOpacity
        key={seatId}
        disabled={isBooked}
        activeOpacity={0.75}
        onPress={() => handleToggleSeat(seatId)}
        style={[
          styles.seatBox,
          { backgroundColor: seatBg, borderColor: seatBorder },
          isSelected ? shadows.glowOrange : null,
        ]}
      >
        <Text style={[styles.seatText, { color: textColor }]}>{seatId}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header
        title="Select Your Seats"
        subtitle={`${schedule.busName} • ${origin.name} → ${destination.name}`}
        showBack
        onBack={onBack}
      />

      {/* Timer Bar */}
      <View style={styles.timerBar}>
        <View style={styles.timerLeft}>
          <ClockIcon size={14} color={colors.warning} />
          <Text style={styles.timerLabel}>Seats held for:</Text>
        </View>
        <Text style={styles.timerDigits}>{formatTimer(timeLeft)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: colors.surface, borderColor: colors.border }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: colors.primary, borderColor: colors.primaryDark }]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#E5E7EB', borderColor: '#D1D5DB' }]} />
            <Text style={styles.legendText}>Booked</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#FCE7F3', borderColor: '#F472B6' }]} />
            <Text style={styles.legendText}>Ladies Only</Text>
          </View>
        </View>

        {/* Bus Cabin Visual Layout */}
        <View style={styles.busCabin}>
          {/* Driver Cabin Row */}
          <View style={styles.driverCabinRow}>
            <View style={styles.frontGlass}>
              <Text style={styles.frontGlassText}>FRONT WINDSHIELD</Text>
            </View>
            <View style={styles.driverSeatBox}>
              <SteeringWheelIcon size={24} color={colors.textSecondary} />
              <Text style={styles.driverText}>Driver</Text>
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
            <Text style={styles.busRearText}>REAR ENGINE</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Booking Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.fareSummaryCol}>
          <Text style={styles.summarySeats}>
            Selected: <Text style={{ fontWeight: '800', color: colors.textPrimary }}>
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
    paddingVertical: spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
  },
  timerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerLabel: {
    ...typography.caption,
    color: '#92400E',
    fontWeight: '600',
  },
  timerDigits: {
    ...typography.label,
    color: '#B45309',
    fontWeight: '800',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 110,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
  },
  legendText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
  busCabin: {
    backgroundColor: colors.surface,
    borderRadius: 36,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.md,
  },
  driverCabinRow: {
    width: '100%',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frontGlass: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceSubtle,
  },
  frontGlassText: {
    ...typography.caption,
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '800',
    letterSpacing: 1,
  },
  driverSeatBox: {
    alignItems: 'center',
  },
  driverText: {
    ...typography.caption,
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  gridContainer: {
    width: '100%',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatPair: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  seatBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatText: {
    fontSize: 12,
    fontWeight: '700',
  },
  aisle: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aisleText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  busRear: {
    width: '100%',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  busRearText: {
    ...typography.caption,
    fontSize: 9,
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.lg,
  },
  fareSummaryCol: {
    flex: 1,
  },
  summarySeats: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  totalFareRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 2,
  },
  totalFareLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  totalFareAmount: {
    ...typography.h3,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  proceedBtn: {
    minWidth: 140,
  },
});
