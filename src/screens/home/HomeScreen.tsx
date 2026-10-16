import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { Card } from '../../components/cards/Card';
import { Badge } from '../../components/common/Badge';
import {
  BusIcon,
  LocationPinIcon,
  CalendarIcon,
  UserIcon,
  SwapIcon,
  ClockIcon,
  StarIcon,
} from '../../components/icons/AppIcons';
import { ALL_STOPS, getFare, getEstimatedDurationMinutes } from '../../utils/routeUtils';
import { RouteStop } from '../../types';

interface HomeScreenProps {
  onSearch: (params: {
    origin: RouteStop;
    destination: RouteStop;
    date: string;
    passengers: number;
  }) => void;
  onNavigateToTracking?: () => void;
  userName?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearch,
  onNavigateToTracking,
  userName = 'Passenger',
}) => {
  const [origin, setOrigin] = useState<RouteStop>(ALL_STOPS[0]); // Sukkur
  const [destination, setDestination] = useState<RouteStop>(ALL_STOPS[ALL_STOPS.length - 1]); // Obuaro
  const [selectedDate, setSelectedDate] = useState<'Today' | 'Tomorrow'>('Today');
  const [passengers, setPassengers] = useState<number>(1);
  const [pickingFor, setPickingFor] = useState<'origin' | 'destination' | null>(null);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSelectStop = (stop: RouteStop) => {
    if (pickingFor === 'origin') {
      if (stop.id === destination.id) {
        setDestination(origin);
      }
      setOrigin(stop);
    } else if (pickingFor === 'destination') {
      if (stop.id === origin.id) {
        setOrigin(destination);
      }
      setDestination(stop);
    }
    setPickingFor(null);
  };

  const estDuration = getEstimatedDurationMinutes(origin.id, destination.id);
  const minFare = getFare(origin.id, destination.id, 'Standard');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dark Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.greetingText}>Khush Amdeed, {userName}</Text>
              <Text style={styles.heroLogo}>
                Saffar<Text style={{ color: colors.primary }}>PK</Text>
              </Text>
            </View>
            <View style={styles.corridorBadge}>
              <Text style={styles.corridorBadgeText}>Sukkur ⇄ Obuaro</Text>
            </View>
          </View>

          {/* Hero Subtitle Banner */}
          <View style={styles.heroBanner}>
            <View style={styles.heroIconBox}>
              <BusIcon size={32} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroBannerTitle}>Intercity Luxury Shuttle</Text>
              <Text style={styles.heroBannerSub}>
                Guaranteed seats & punctual departures every hour
              </Text>
            </View>
          </View>
        </View>

        {/* Route Selector Floating Card */}
        <View style={styles.selectorWrapper}>
          <Card variant="elevated" style={styles.bookingCard}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.selectorTitle}>Select Your Journey</Text>
              <Badge label="N-5 Corridor" variant="category" />
            </View>

            {/* Origin & Destination Section */}
            <View style={styles.routeBox}>
              {/* Origin Picker */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setPickingFor('origin')}
                style={styles.stopButton}
              >
                <View style={styles.pinCircleGreen}>
                  <LocationPinIcon size={14} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stopLabel}>FROM (ORIGIN)</Text>
                  <Text style={styles.stopName}>{origin.name}</Text>
                  <Text style={styles.stopLandmark} numberOfLines={1}>
                    {origin.landmark}
                  </Text>
                </View>
                <Text style={styles.urduName}>{origin.urduName}</Text>
              </TouchableOpacity>

              {/* Swap Button Divider */}
              <View style={styles.swapDividerRow}>
                <View style={styles.dividerLine} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSwap}
                  style={styles.swapButton}
                >
                  <SwapIcon size={18} color={colors.primary} />
                </TouchableOpacity>
                <View style={styles.dividerLine} />
              </View>

              {/* Destination Picker */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setPickingFor('destination')}
                style={styles.stopButton}
              >
                <View style={styles.pinCircleOrange}>
                  <LocationPinIcon size={14} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stopLabel}>TO (DESTINATION)</Text>
                  <Text style={styles.stopName}>{destination.name}</Text>
                  <Text style={styles.stopLandmark} numberOfLines={1}>
                    {destination.landmark}
                  </Text>
                </View>
                <Text style={styles.urduName}>{destination.urduName}</Text>
              </TouchableOpacity>
            </View>

            {/* Travel Date & Passengers Row */}
            <View style={styles.metaRow}>
              {/* Date Selector */}
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>JOURNEY DATE</Text>
                <View style={styles.dateSelector}>
                  {(['Today', 'Tomorrow'] as const).map(d => (
                    <TouchableOpacity
                      key={d}
                      onPress={() => setSelectedDate(d)}
                      style={[
                        styles.dateChip,
                        selectedDate === d ? styles.dateChipActive : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dateChipText,
                          selectedDate === d ? styles.dateChipTextActive : null,
                        ]}
                      >
                        {d}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Passengers Count */}
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>PASSENGERS</Text>
                <View style={styles.passengerCounter}>
                  <TouchableOpacity
                    onPress={() => setPassengers(Math.max(1, passengers - 1))}
                    style={styles.counterBtn}
                  >
                    <Text style={styles.counterBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.passengerCountText}>{passengers}</Text>
                  <TouchableOpacity
                    onPress={() => setPassengers(Math.min(4, passengers + 1))}
                    style={styles.counterBtn}
                  >
                    <Text style={styles.counterBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Estimated Fare & Duration Peek */}
            <View style={styles.tripPeek}>
              <View style={styles.peekItem}>
                <ClockIcon size={14} color={colors.textSecondary} />
                <Text style={styles.peekText}>~{estDuration} mins</Text>
              </View>
              <View style={styles.peekDivider} />
              <View style={styles.peekItem}>
                <Text style={styles.peekText}>Fares from</Text>
                <Text style={styles.peekFare}>PKR {minFare}</Text>
              </View>
            </View>

            {/* Search Buses CTA */}
            <Button
              title="Search Buses & Schedules"
              onPress={() =>
                onSearch({
                  origin,
                  destination,
                  date: selectedDate,
                  passengers,
                })
              }
              size="large"
              style={styles.searchButton}
            />
          </Card>
        </View>

        {/* Live Bus Tracking Banner */}
        {onNavigateToTracking && (
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={onNavigateToTracking}
            style={styles.trackingBanner}
          >
            <View style={styles.trackingBannerLeft}>
              <View style={styles.trackingLiveDot} />
              <View>
                <Text style={styles.trackingBannerTitle}>Live Bus Tracking</Text>
                <Text style={styles.trackingBannerSub}>
                  View active buses moving on the N-5 Highway in real-time
                </Text>
              </View>
            </View>
            <Text style={styles.trackingArrow}>›</Text>
          </TouchableOpacity>
        )}

        {/* Corridor Stops Overview */}
        <View style={styles.corridorSection}>
          <Text style={styles.sectionTitle}>Supported Corridor Stops</Text>
          <Text style={styles.sectionSubtitle}>
            Our service runs exclusively on this 118 km route:
          </Text>

          <View style={styles.stopsTimeline}>
            {ALL_STOPS.map((stop, index) => (
              <View key={stop.id} style={styles.timelineRow}>
                <View style={styles.timelineNodeCol}>
                  <View
                    style={[
                      styles.timelineDot,
                      index === 0 || index === ALL_STOPS.length - 1
                        ? styles.timelineDotTerminal
                        : null,
                    ]}
                  />
                  {index < ALL_STOPS.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineTitleRow}>
                    <Text style={styles.timelineStopName}>{stop.name}</Text>
                    <Text style={styles.timelineUrdu}>{stop.urduName}</Text>
                  </View>
                  <Text style={styles.timelineLandmark}>{stop.landmark}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Fleet Highlights */}
        <View style={styles.fleetSection}>
          <Text style={styles.sectionTitle}>SaffarPK Fleet Standard</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.fleetScroll}>
            <View style={styles.fleetCard}>
              <Badge label="Executive Class" variant="primary" />
              <Text style={styles.fleetCardTitle}>Saffar Prime</Text>
              <Text style={styles.fleetCardSpecs}>40 Seats • 2+2 Layout • Fast AC</Text>
              <Text style={styles.fleetCardDesc}>USB Chargers, Mineral Water, CCTV</Text>
            </View>

            <View style={styles.fleetCard}>
              <Badge label="VIP Sleeper" variant="warning" />
              <Text style={styles.fleetCardTitle}>Royal Business</Text>
              <Text style={styles.fleetCardSpecs}>28 Seats • 2+1 Layout • Recliners</Text>
              <Text style={styles.fleetCardDesc}>Ultra-wide seats, Snacks & Chai</Text>
            </View>

            <View style={styles.fleetCard}>
              <Badge label="Economical" variant="success" />
              <Text style={styles.fleetCardTitle}>Standard Express</Text>
              <Text style={styles.fleetCardSpecs}>44 Seats • 2+2 Layout • AC</Text>
              <Text style={styles.fleetCardDesc}>Fast point-to-point commuter bus</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Stop Picker Modal */}
      <Modal visible={pickingFor !== null} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {pickingFor === 'origin' ? 'Boarding Stop' : 'Destination Stop'}
              </Text>
              <TouchableOpacity onPress={() => setPickingFor(null)} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 420 }}>
              {ALL_STOPS.map(stop => {
                const isSelected =
                  (pickingFor === 'origin' && stop.id === origin.id) ||
                  (pickingFor === 'destination' && stop.id === destination.id);

                return (
                  <TouchableOpacity
                    key={stop.id}
                    onPress={() => handleSelectStop(stop)}
                    style={[
                      styles.modalStopItem,
                      isSelected ? styles.modalStopItemSelected : null,
                    ]}
                  >
                    <View style={styles.pinCircleOrange}>
                      <LocationPinIcon size={16} color={colors.primary} />
                    </View>
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.modalStopName}>{stop.name}</Text>
                      <Text style={styles.modalStopLandmark}>{stop.landmark}</Text>
                    </View>
                    <Text style={styles.modalStopUrdu}>{stop.urduName}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  heroSection: {
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl + spacing.md,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greetingText: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  heroLogo: {
    ...typography.h1,
    color: colors.textWhite,
  },
  corridorBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.4)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  corridorBadgeText: {
    ...typography.caption,
    color: colors.primaryLight,
    fontWeight: '700',
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#333',
    gap: spacing.md,
  },
  heroIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBannerTitle: {
    ...typography.label,
    color: colors.textWhite,
  },
  heroBannerSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  selectorWrapper: {
    marginTop: -spacing.xxl - 8,
    paddingHorizontal: spacing.lg,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    ...shadows.lg,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  selectorTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  routeBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  pinCircleGreen: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  pinCircleOrange: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stopLabel: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  stopName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  stopLandmark: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  urduName: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  swapDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  swapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
    ...shadows.sm,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  dateSelector: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateChip: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  dateChipActive: {
    backgroundColor: colors.primary,
  },
  dateChipText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  dateChipTextActive: {
    color: colors.textWhite,
  },
  passengerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: colors.border,
    height: 40,
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  counterBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  passengerCountText: {
    ...typography.label,
    color: colors.textPrimary,
  },
  tripPeek: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: colors.borderOrange,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    marginVertical: spacing.md,
  },
  peekItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  peekText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  peekFare: {
    ...typography.label,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  peekDivider: {
    width: 1,
    height: 16,
    backgroundColor: colors.borderOrange,
  },
  searchButton: {
    marginTop: spacing.xs,
  },
  trackingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: '#333',
    ...shadows.md,
  },
  trackingBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  trackingLiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
  },
  trackingBannerTitle: {
    ...typography.label,
    color: colors.textWhite,
  },
  trackingBannerSub: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  trackingArrow: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  corridorSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  stopsTimeline: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 48,
  },
  timelineNodeCol: {
    alignItems: 'center',
    width: 24,
    marginRight: spacing.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  timelineDotTerminal: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: colors.primaryDark,
    backgroundColor: colors.surface,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.borderOrange,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: spacing.sm,
  },
  timelineTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineStopName: {
    ...typography.label,
    color: colors.textPrimary,
  },
  timelineUrdu: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  timelineLandmark: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  fleetSection: {
    marginTop: spacing.xl,
    paddingLeft: spacing.lg,
  },
  fleetScroll: {
    gap: spacing.md,
    paddingRight: spacing.lg,
    paddingVertical: spacing.md,
  },
  fleetCard: {
    width: 200,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  fleetCardTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  fleetCardSpecs: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 2,
  },
  fleetCardDesc: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  modalCloseBtn: {
    padding: spacing.xs,
  },
  modalCloseText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  modalStopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalStopItemSelected: {
    backgroundColor: '#FFF7ED',
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  modalStopName: {
    ...typography.label,
    color: colors.textPrimary,
  },
  modalStopLandmark: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  modalStopUrdu: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
  },
});
