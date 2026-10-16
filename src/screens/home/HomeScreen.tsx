import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Animated,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { Card } from '../../components/cards/Card';
import { Badge } from '../../components/common/Badge';
import {
  BusIcon,
  LocationPinIcon,
  SwapIcon,
  ClockIcon,
  BusIllustration,
  ShieldIcon,
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

  // Swap Animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleSwap = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

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

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const estDuration = getEstimatedDurationMinutes(origin.id, destination.id);
  const minFare = getFare(origin.id, destination.id, 'Standard');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dark Obsidian Hero Section with Bus Illustration */}
        <View style={styles.heroSection}>
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.greetingText}>Khush Amdeed, {userName}</Text>
              <Text style={styles.heroLogo}>
                Saffar<Text style={{ color: colors.primary }}>PK</Text>
              </Text>
            </View>
            <View style={styles.corridorBadge}>
              <View style={styles.livePulseDot} />
              <Text style={styles.corridorBadgeText}>Sukkur ⇄ Obuaro</Text>
            </View>
          </View>

          {/* Luxury Bus Illustration Header */}
          <View style={styles.heroIllustrationBox}>
            <BusIllustration width={300} height={130} />
            <Text style={styles.heroSlogan}>Sindh's Premier Intercity Coach Service</Text>
          </View>
        </View>

        {/* Floating Route Selector Card */}
        <View style={styles.selectorWrapper}>
          <Card variant="elevated" style={styles.bookingCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.selectorTitle}>Book Your Seat</Text>
                <Text style={styles.selectorSub}>Select journey stops along N-5 Highway</Text>
              </View>
              <Badge label="Direct Route" variant="category" />
            </View>

            {/* Origin & Destination Interactive Box */}
            <View style={styles.routeBox}>
              {/* Origin Picker */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setPickingFor('origin')}
                style={styles.stopButton}
              >
                <View style={styles.pinCircleGreen}>
                  <LocationPinIcon size={18} color="#16A34A" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stopLabel}>FROM (DEPARTURE STOP)</Text>
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
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <SwapIcon size={20} color={colors.primary} />
                  </Animated.View>
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
                  <LocationPinIcon size={18} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stopLabel}>TO (ARRIVAL STOP)</Text>
                  <Text style={styles.stopName}>{destination.name}</Text>
                  <Text style={styles.stopLandmark} numberOfLines={1}>
                    {destination.landmark}
                  </Text>
                </View>
                <Text style={styles.urduName}>{destination.urduName}</Text>
              </TouchableOpacity>
            </View>

            {/* Travel Date & Passenger Count Selection */}
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
                <ClockIcon size={18} color={colors.textSecondary} />
                <Text style={styles.peekText}>Est. ~{estDuration} mins</Text>
              </View>
              <View style={styles.peekDivider} />
              <View style={styles.peekItem}>
                <Text style={styles.peekText}>Fare starting at</Text>
                <Text style={styles.peekFare}>PKR {minFare}</Text>
              </View>
            </View>

            {/* Search Buses CTA */}
            <Button
              title="Search Buses & Timings"
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
              <View style={styles.beaconCircle}>
                <View style={styles.beaconDot} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.trackingBannerTitle}>Live Bus Tracking</Text>
                <Text style={styles.trackingBannerSub}>
                  Track your coach in real-time along the N-5 Highway
                </Text>
              </View>
            </View>
            <Text style={styles.trackingArrow}>➔</Text>
          </TouchableOpacity>
        )}

        {/* Supported Corridor Route Timeline */}
        <View style={styles.corridorSection}>
          <Text style={styles.sectionTitle}>Supported Corridor Stops</Text>
          <Text style={styles.sectionSubtitle}>
            Our dedicated shuttle serves these 6 stops (118 km total):
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
          <Text style={styles.sectionTitle}>SaffarPK Fleet Standards</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.fleetScroll}>
            <View style={styles.fleetCard}>
              <Badge label="Executive Class" variant="primary" />
              <Text style={styles.fleetCardTitle}>Saffar Prime</Text>
              <Text style={styles.fleetCardSpecs}>40 Seats • 2+2 Layout • Fast AC</Text>
              <Text style={styles.fleetCardDesc}>USB Type-C Chargers, Mineral Water, CCTV</Text>
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
              <Text style={styles.fleetCardDesc}>Punctual point-to-point commuter transit</Text>
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
                      <LocationPinIcon size={18} color={colors.primary} />
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
    paddingBottom: spacing.xxxl + 30,
  },
  heroSection: {
    backgroundColor: '#0F172A',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl + 20,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greetingText: {
    ...typography.caption,
    fontSize: 13,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  heroLogo: {
    ...typography.h1,
    fontSize: 34,
    color: colors.textWhite,
  },
  corridorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(249, 115, 22, 0.4)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  corridorBadgeText: {
    ...typography.caption,
    fontSize: 12,
    color: '#FED7AA',
    fontWeight: '800',
  },
  heroIllustrationBox: {
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  heroSlogan: {
    ...typography.caption,
    fontSize: 12,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: spacing.xs,
  },
  selectorWrapper: {
    marginTop: -spacing.xxl - 8,
    paddingHorizontal: spacing.lg,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    ...shadows.lg,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  selectorTitle: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
  },
  selectorSub: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  routeBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.xl,
    padding: spacing.md + 2,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  pinCircleGreen: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  pinCircleOrange: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stopLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  stopName: {
    ...typography.h3,
    fontSize: 19,
    color: colors.textPrimary,
    marginTop: 2,
  },
  stopLandmark: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  urduName: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '800',
  },
  swapDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E2E8F0',
  },
  swapButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
    ...shadows.sm,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: spacing.xs,
    letterSpacing: 0.6,
  },
  dateSelector: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.lg,
    padding: 3,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  dateChip: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  dateChipActive: {
    backgroundColor: colors.primary,
  },
  dateChipText: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  dateChipTextActive: {
    color: colors.textWhite,
  },
  passengerCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.lg,
    padding: 3,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    height: 48,
  },
  counterBtn: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  counterBtnText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  passengerCountText: {
    ...typography.label,
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  tripPeek: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: colors.borderOrange,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    marginVertical: spacing.lg,
  },
  peekItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  peekText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
  },
  peekFare: {
    ...typography.label,
    fontSize: 17,
    color: colors.primaryDark,
    fontWeight: '900',
  },
  peekDivider: {
    width: 1.5,
    height: 20,
    backgroundColor: colors.borderOrange,
  },
  searchButton: {
    marginTop: spacing.xs,
  },
  trackingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    ...shadows.md,
  },
  trackingBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  beaconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beaconDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
  },
  trackingBannerTitle: {
    ...typography.h4,
    fontSize: 16,
    color: colors.textWhite,
  },
  trackingBannerSub: {
    ...typography.caption,
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  trackingArrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '900',
    marginLeft: spacing.sm,
  },
  corridorSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  stopsTimeline: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 52,
  },
  timelineNodeCol: {
    alignItems: 'center',
    width: 28,
    marginRight: spacing.md,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
  },
  timelineDotTerminal: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3.5,
    borderColor: colors.primaryDark,
    backgroundColor: colors.surface,
  },
  timelineLine: {
    width: 2.5,
    flex: 1,
    backgroundColor: colors.borderOrange,
    marginVertical: 2,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  timelineTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineStopName: {
    ...typography.h4,
    fontSize: 16,
    color: colors.textPrimary,
  },
  timelineUrdu: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  timelineLandmark: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  fleetSection: {
    marginTop: spacing.xxl,
    paddingLeft: spacing.lg,
  },
  fleetScroll: {
    gap: spacing.lg,
    paddingRight: spacing.lg,
    paddingVertical: spacing.md,
  },
  fleetCard: {
    width: 230,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  fleetCardTitle: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  fleetCardSpecs: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: colors.textSecondary,
    marginTop: 3,
  },
  fleetCardDesc: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  modalStopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalStopItemSelected: {
    backgroundColor: '#FFF7ED',
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
  },
  modalStopName: {
    ...typography.h4,
    fontSize: 17,
    color: colors.textPrimary,
  },
  modalStopLandmark: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalStopUrdu: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '800',
  },
});
