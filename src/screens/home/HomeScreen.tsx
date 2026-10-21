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
  Image,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { Card } from '../../components/cards/Card';
import { Badge } from '../../components/common/Badge';
import {
  LocationPinIcon,
  SwapIcon,
  ClockIcon,
  StarIcon,
  ShieldIcon,
  ArrowForwardIcon,
} from '../../components/icons/AppIcons';
import { ALL_STOPS, getFare, getEstimatedDurationMinutes } from '../../utils/routeUtils';
import { RouteStop } from '../../types';
import busesData from '../../data/buses.json';
import {
  FadeInUp,
  ScalePressable,
  PulseBeacon,
  FloatingElement,
} from '../../components/animations';

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
  userName = 'Traveler',
}) => {
  const insets = useSafeAreaInsets();
  const [origin, setOrigin] = useState<RouteStop>(ALL_STOPS[0]); // Sukkur
  const [destination, setDestination] = useState<RouteStop>(ALL_STOPS[ALL_STOPS.length - 1]); // Obuaro
  const [selectedDate, setSelectedDate] = useState<'Today' | 'Tomorrow'>('Today');
  const [passengers, setPassengers] = useState<number>(1);
  const [pickingFor, setPickingFor] = useState<'origin' | 'destination' | null>(null);

  // Fluid Swap & Counter Animations
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const swapOriginY = useRef(new Animated.Value(0)).current;
  const swapDestY = useRef(new Animated.Value(0)).current;
  const swapOpacity = useRef(new Animated.Value(1)).current;
  const countScale = useRef(new Animated.Value(1)).current;

  const handleSwap = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(swapOpacity, { toValue: 0.15, duration: 120, useNativeDriver: true }),
        Animated.timing(swapOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(swapOriginY, { toValue: 14, duration: 120, useNativeDriver: true }),
        Animated.spring(swapOriginY, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(swapDestY, { toValue: -14, duration: 120, useNativeDriver: true }),
        Animated.spring(swapDestY, { toValue: 0, friction: 6, tension: 50, useNativeDriver: true }),
      ]),
    ]).start();

    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handlePassengerChange = (newCount: number) => {
    setPassengers(newCount);
    Animated.sequence([
      Animated.timing(countScale, { toValue: 1.35, duration: 90, useNativeDriver: true }),
      Animated.spring(countScale, { toValue: 1, friction: 4, tension: 60, useNativeDriver: true }),
    ]).start();
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
    outputRange: ['0deg', '360deg'],
  });

  const estDuration = getEstimatedDurationMinutes(origin.id, destination.id);
  const minFare = getFare(origin.id, destination.id, 'Standard');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        {/* Cinematic Hero Section with High-Res Image Background */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
          }}
          style={[styles.heroBackground, { paddingTop: insets.top + spacing.md }]}
        >
          {/* Dark Glass Overlay */}
          <View style={styles.heroOverlay} />

          {/* Top Bar Header */}
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.greetingText}>Khush Amdeed, {userName} 👋</Text>
              <Text style={styles.heroLogo}>
                Saffar<Text style={{ color: colors.primary }}>PK</Text>
              </Text>
            </View>
            <FloatingElement distance={4} duration={2600}>
              <View style={styles.corridorBadge}>
                <PulseBeacon size={7} pulseSize={18} color={colors.primary} />
                <Text style={styles.corridorBadgeText}>Sukkur ⇄ Obuaro</Text>
              </View>
            </FloatingElement>
          </View>

          {/* Hero Tagline Banner */}
          <FadeInUp delay={60} distance={18} style={styles.heroBanner}>
            <Text style={styles.heroBannerTitle}>
              Luxury Intercity Coach Service
            </Text>
            <Text style={styles.heroBannerSub}>
              Guaranteed seats & punctual departures every hour on N-5
            </Text>
          </FadeInUp>
        </ImageBackground>

        {/* Floating Route Booking Card with Entrance Animation */}
        <FadeInUp delay={120} distance={28} style={styles.selectorWrapper}>
          <Card variant="elevated" style={styles.bookingCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.selectorTitle}>Where are you going?</Text>
                <Text style={styles.selectorSub}>
                  Select your stations on the Sukkur ⇄ Obuaro route
                </Text>
              </View>
              <Badge label="N-5 Corridor" variant="category" />
            </View>

            {/* Interactive Origin & Destination Selector Box */}
            <View style={styles.routeBox}>
              {/* Origin Picker with Fluid Swap Animation */}
              <Animated.View
                style={{
                  opacity: swapOpacity,
                  transform: [{ translateY: swapOriginY }],
                }}
              >
                <ScalePressable
                  activeScale={0.98}
                  onPress={() => setPickingFor('origin')}
                  style={styles.stopButton}
                >
                  <View style={styles.pinCircleGreen}>
                    <LocationPinIcon size={18} color="#16A34A" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stopLabel}>DEPARTURE TERMINAL</Text>
                    <Text style={styles.stopName}>{origin.name}</Text>
                    <Text style={styles.stopLandmark} numberOfLines={1}>
                      {origin.landmark}
                    </Text>
                  </View>
                  <View style={styles.urduBadge}>
                    <Text style={styles.urduName}>{origin.urduName}</Text>
                  </View>
                </ScalePressable>
              </Animated.View>

              {/* Swap Button Divider with Spring Physics */}
              <View style={styles.swapDividerRow}>
                <View style={styles.dividerLine} />
                <ScalePressable
                  activeScale={0.86}
                  onPress={handleSwap}
                  style={styles.swapButton}
                >
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <SwapIcon size={20} color={colors.primary} />
                  </Animated.View>
                </ScalePressable>
                <View style={styles.dividerLine} />
              </View>

              {/* Destination Picker with Fluid Swap Animation */}
              <Animated.View
                style={{
                  opacity: swapOpacity,
                  transform: [{ translateY: swapDestY }],
                }}
              >
                <ScalePressable
                  activeScale={0.98}
                  onPress={() => setPickingFor('destination')}
                  style={styles.stopButton}
                >
                  <View style={styles.pinCircleOrange}>
                    <LocationPinIcon size={18} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stopLabel}>ARRIVAL TERMINAL</Text>
                    <Text style={styles.stopName}>{destination.name}</Text>
                    <Text style={styles.stopLandmark} numberOfLines={1}>
                      {destination.landmark}
                    </Text>
                  </View>
                  <View style={styles.urduBadge}>
                    <Text style={styles.urduName}>{destination.urduName}</Text>
                  </View>
                </ScalePressable>
              </Animated.View>
            </View>

            {/* Travel Date & Passenger Count Selection */}
            <View style={styles.metaRow}>
              {/* Date Selector */}
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>TRAVEL DATE</Text>
                <View style={styles.dateSelector}>
                  {(['Today', 'Tomorrow'] as const).map(d => (
                    <ScalePressable
                      key={d}
                      activeScale={0.94}
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
                    </ScalePressable>
                  ))}
                </View>
              </View>

              {/* Passengers Count with Scale Animation */}
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>PASSENGERS</Text>
                <View style={styles.passengerCounter}>
                  <ScalePressable
                    activeScale={0.82}
                    onPress={() => handlePassengerChange(Math.max(1, passengers - 1))}
                    style={styles.counterBtn}
                  >
                    <Text style={styles.counterBtnText}>-</Text>
                  </ScalePressable>
                  <Animated.Text
                    style={[
                      styles.passengerCountText,
                      { transform: [{ scale: countScale }] },
                    ]}
                  >
                    {passengers}
                  </Animated.Text>
                  <ScalePressable
                    activeScale={0.82}
                    onPress={() => handlePassengerChange(Math.min(4, passengers + 1))}
                    style={styles.counterBtn}
                  >
                    <Text style={styles.counterBtnText}>+</Text>
                  </ScalePressable>
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
                <Text style={styles.peekText}>Fares starting</Text>
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
        </FadeInUp>

        {/* Live Bus Tracking Banner with Radar Animation */}
        {onNavigateToTracking && (
          <FadeInUp delay={200} distance={20}>
            <ScalePressable
              activeScale={0.97}
              onPress={onNavigateToTracking}
              style={styles.trackingBanner}
            >
              <View style={styles.trackingBannerLeft}>
                <View style={styles.beaconCircle}>
                  <PulseBeacon size={14} pulseSize={36} color="#22C55E" />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.trackingBannerTitle}>Live Highway Tracking</Text>
                    <View style={styles.liveTag}>
                      <Text style={styles.liveTagText}>LIVE GPS</Text>
                    </View>
                  </View>
                  <Text style={styles.trackingBannerSub}>
                    Track moving coaches in real-time along the N-5 Highway
                  </Text>
                </View>
              </View>
              <ArrowForwardIcon size={20} color={colors.primary} />
            </ScalePressable>
          </FadeInUp>
        )}

        {/* Featured Corridor Stops with High-Res Photography */}
        <FadeInUp delay={280} distance={24} style={styles.stationsSection}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>Corridor Stations</Text>
              <Text style={styles.sectionSubtitle}>
                Tap any stop along the N-5 route to select it
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stationsScroll}
          >
            {ALL_STOPS.map(stop => {
              const isCurrentDest = stop.id === destination.id;
              return (
                <ScalePressable
                  key={stop.id}
                  activeScale={0.94}
                  onPress={() => setDestination(stop)}
                  style={[
                    styles.stationPhotoCard,
                    isCurrentDest ? styles.stationPhotoCardActive : null,
                  ]}
                >
                  <Image
                    source={{
                      uri:
                        stop.imageUrl ||
                        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
                    }}
                    style={styles.stationImage}
                  />
                  <View style={styles.stationImageOverlay} />
                  <View style={styles.stationCardContent}>
                    <View style={styles.stationBadgeRow}>
                      <Badge
                        label={`STOP #${stop.sequence}`}
                        variant={isCurrentDest ? 'primary' : 'dark'}
                      />
                      <Text style={styles.stationUrduText}>{stop.urduName}</Text>
                    </View>
                    <Text style={styles.stationNameText}>{stop.name}</Text>
                    <Text style={styles.stationLandmarkText} numberOfLines={1}>
                      {stop.landmark}
                    </Text>
                  </View>
                </ScalePressable>
              );
            })}
          </ScrollView>
        </FadeInUp>

        {/* Fleet Showcase with Real Coach Photos */}
        <FadeInUp delay={360} distance={24} style={styles.fleetSection}>
          <Text style={styles.sectionTitle}>SaffarPK Coach Fleet</Text>
          <Text style={styles.sectionSubtitle}>
            Engineered for comfort, punctuality, and passenger safety
          </Text>

          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fleetScroll}
          >
            {busesData.map(bus => (
              <ScalePressable key={bus.id} activeScale={0.96} style={styles.fleetPhotoCard}>
                <Image
                  source={{
                    uri:
                      bus.imageUrl ||
                      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
                  }}
                  style={styles.fleetImage}
                />
                <View style={styles.fleetInfo}>
                  <View style={styles.fleetTitleRow}>
                    <Text style={styles.fleetName}>{bus.name}</Text>
                    <Badge
                      label={bus.category}
                      variant={
                        bus.category === 'Royal'
                          ? 'warning'
                          : bus.category === 'Executive'
                          ? 'primary'
                          : 'muted'
                      }
                    />
                  </View>
                  <View style={styles.fleetRatingRow}>
                    <StarIcon size={15} color="#F59E0B" />
                    <Text style={styles.fleetRating}>{bus.rating}</Text>
                    <Text style={styles.fleetSeats}>
                      • {bus.totalSeats} Reclining Seats
                    </Text>
                  </View>
                  <Text style={styles.fleetAmenities} numberOfLines={1}>
                    {bus.amenities.slice(0, 3).join(' • ')}
                  </Text>
                </View>
              </ScalePressable>
            ))}
          </ScrollView>
        </FadeInUp>

        {/* Service Guarantees Card */}
        <FadeInUp delay={440} distance={24} style={styles.guaranteeContainer}>
          <Card variant="elevated" style={styles.guaranteeCard}>
            <View style={styles.guaranteeRow}>
              <View style={styles.guaranteeIconCircle}>
                <ShieldIcon size={24} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.guaranteeTitle}>Saffar SafeTravel Guarantee</Text>
                <Text style={styles.guaranteeSub}>
                  Live GPS tracked buses • 100% Guaranteed reserved seats • Verified drivers with highway experience
                </Text>
              </View>
            </View>
          </Card>
        </FadeInUp>
      </ScrollView>

      {/* Stop Picker Modal */}
      <Modal visible={pickingFor !== null} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {pickingFor === 'origin' ? 'Departure' : 'Arrival'} Stop
              </Text>
              <TouchableOpacity
                onPress={() => setPickingFor(null)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 420 }}>
              {ALL_STOPS.map(stop => {
                const isSelected =
                  (pickingFor === 'origin' && stop.id === origin.id) ||
                  (pickingFor === 'destination' && stop.id === destination.id);

                return (
                  <ScalePressable
                    key={stop.id}
                    activeScale={0.97}
                    onPress={() => handleSelectStop(stop)}
                    style={[
                      styles.modalStopItem,
                      isSelected ? styles.modalStopItemSelected : null,
                    ]}
                  >
                    <Image
                      source={{
                        uri:
                          stop.imageUrl ||
                          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
                      }}
                      style={styles.modalStopImage}
                    />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={styles.modalStopName}>{stop.name}</Text>
                      <Text style={styles.modalStopLandmark}>{stop.landmark}</Text>
                    </View>
                    <Text style={styles.modalStopUrdu}>{stop.urduName}</Text>
                  </ScalePressable>
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
    flexGrow: 1,
  },
  heroBackground: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl + 32,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 15, 25, 0.88)',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greetingText: {
    ...typography.caption,
    fontSize: 13,
    color: '#CBD5E1',
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
    backgroundColor: 'rgba(255, 85, 0, 0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 85, 0, 0.5)',
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
    color: '#FFD4C2',
    fontWeight: '800',
  },
  heroBanner: {
    marginTop: spacing.xs,
    paddingVertical: spacing.sm,
  },
  heroBannerTitle: {
    ...typography.h2,
    fontSize: 24,
    color: colors.textWhite,
    lineHeight: 30,
  },
  heroBannerSub: {
    ...typography.caption,
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
    lineHeight: 18,
  },
  selectorWrapper: {
    marginTop: -spacing.xxl - 12,
    paddingHorizontal: spacing.lg,
    zIndex: 10,
    elevation: 6,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
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
    backgroundColor: colors.primaryLight,
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
  urduBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.sm,
  },
  urduName: {
    fontSize: 17,
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    backgroundColor: colors.primaryLight,
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
    backgroundColor: colors.darkCard,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: colors.darkBorder,
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
  liveTag: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#22C55E',
  },
  trackingBannerSub: {
    ...typography.caption,
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  stationsSection: {
    marginTop: spacing.xxl,
  },
  sectionHeaderRow: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
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
  },
  stationsScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  stationPhotoCard: {
    width: 200,
    height: 170,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  stationPhotoCardActive: {
    borderColor: colors.primary,
    ...shadows.glowOrange,
  },
  stationImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  stationImageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(11, 15, 25, 0.65)',
  },
  stationCardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  stationBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stationUrduText: {
    fontSize: 16,
    color: '#FED7AA',
    fontWeight: '800',
  },
  stationNameText: {
    ...typography.h3,
    fontSize: 19,
    color: colors.textWhite,
  },
  stationLandmarkText: {
    ...typography.caption,
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  fleetSection: {
    marginTop: spacing.xxl,
  },
  fleetScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
  fleetPhotoCard: {
    width: 270,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  fleetImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#1E293B',
  },
  fleetInfo: {
    padding: spacing.lg,
  },
  fleetTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  fleetName: {
    ...typography.h4,
    fontSize: 17,
    color: colors.textPrimary,
  },
  fleetRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 4,
  },
  fleetRating: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  fleetSeats: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
  },
  fleetAmenities: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  guaranteeContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  guaranteeCard: {
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: borderRadius.xxl,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  guaranteeIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guaranteeTitle: {
    ...typography.h4,
    fontSize: 16,
    color: colors.textPrimary,
  },
  guaranteeSub: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
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
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalStopItemSelected: {
    backgroundColor: colors.primaryLight,
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
  },
  modalStopImage: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: '#E2E8F0',
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
