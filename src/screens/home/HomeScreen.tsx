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
  Alert,
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
  HotelIcon,
  LandmarkIcon,
  SparklesIcon,
  TicketIcon,
  CopyIcon,
  RoadIcon,
} from '../../components/icons/AppIcons';
import { ALL_STOPS, getFare, getEstimatedDurationMinutes } from '../../utils/routeUtils';
import { RouteStop, Hotel, FamousPlace } from '../../types';
import busesData from '../../data/buses.json';
import hotelsData from '../../data/hotels.json';
import placesData from '../../data/places.json';
import storiesData from '../../data/stories.json';
import { HotelCard } from '../../components/cards/HotelCard';
import { PlaceCard } from '../../components/cards/PlaceCard';
import { HotelDetailModal } from '../../components/modals/HotelDetailModal';
import { PlaceDetailModal } from '../../components/modals/PlaceDetailModal';
import { StoryViewerModal, StoryItem } from '../../components/modals/StoryViewerModal';
import { SaffarLogo } from '../../components/brand/SaffarLogo';
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

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Stays & Sights', icon: '✨' },
  { id: 'hotels', label: 'Hotels & Rooms', icon: '🏨' },
  { id: 'landmarks', label: 'Famous Places', icon: '🏛️' },
  { id: 'top_rated', label: 'Top Rated 9+', icon: '⭐' },
  { id: 'breakfast', label: 'Free Breakfast', icon: '☕' },
  { id: 'luxury', label: 'Luxury Stays', icon: '💎' },
] as const;

type CategoryFilterId = (typeof CATEGORY_FILTERS)[number]['id'];

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

  // Booking & Explore State
  const [activeCategory, setActiveCategory] = useState<CategoryFilterId>('all');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<FamousPlace | null>(null);

  // Segmented Travel Mode ('bus' | 'hotel' | 'route')
  const [travelMode, setTravelMode] = useState<'bus' | 'hotel' | 'route'>('bus');

  // Hotel Quick Finder State
  const [hotelCity, setHotelCity] = useState<'Sukkur' | 'Ghotki' | 'Rohri' | 'Daharki'>('Sukkur');
  const [hotelNights, setHotelNights] = useState<number>(1);
  const [hotelGuests, setHotelGuests] = useState<number>(2);

  // Story Viewer State
  const [isStoryModalVisible, setIsStoryModalVisible] = useState<boolean>(false);
  const [storyInitialIndex, setStoryInitialIndex] = useState<number>(0);

  // Promo Code Copied Feedback
  const [copiedPromo, setCopiedPromo] = useState<boolean>(false);

  const handleStoryAction = (story: StoryItem) => {
    if (story.actionType === 'hotel' && story.targetId) {
      const found = (hotelsData as Hotel[]).find(h => h.id === story.targetId);
      if (found) setSelectedHotel(found);
    } else if (story.actionType === 'place' && story.targetId) {
      const found = (placesData as FamousPlace[]).find(p => p.id === story.targetId);
      if (found) setSelectedPlace(found);
    } else if (story.actionType === 'bus') {
      onSearch({
        origin,
        destination,
        date: selectedDate,
        passengers,
      });
    } else {
      Alert.alert(story.title, story.description);
    }
  };

  const handleCopyPromo = () => {
    setCopiedPromo(true);
    Alert.alert('Promo Code Copied! 🎉', 'Code SAFFAR20 copied to clipboard. Apply at payment for 20% discount on buses and stays!');
    setTimeout(() => setCopiedPromo(false), 3000);
  };

  const filteredHotels = (hotelsData as Hotel[]).filter(h => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'hotels') return true;
    if (activeCategory === 'landmarks') return false;
    if (activeCategory === 'top_rated') return h.reviewScore >= 8.8;
    if (activeCategory === 'breakfast') {
      return (
        h.amenities.some(a => a.toLowerCase().includes('breakfast')) ||
        Boolean(h.badge && h.badge.toLowerCase().includes('breakfast'))
      );
    }
    if (activeCategory === 'luxury') {
      return h.starRating >= 5 || Boolean(h.badge && h.badge.toLowerCase().includes('luxury'));
    }
    return true;
  });

  const filteredPlaces = (placesData as FamousPlace[]).filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'landmarks') return true;
    if (activeCategory === 'hotels') return false;
    if (activeCategory === 'top_rated') return p.rating >= 4.8;
    if (activeCategory === 'breakfast') return false;
    if (activeCategory === 'luxury') return false;
    return true;
  });

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
              <View style={{ marginTop: 2 }}>
                <SaffarLogo variant="header" theme="white" size="medium" />
              </View>
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

          {/* Corridor Instagram Stories Bar */}
          <FadeInUp delay={90} distance={14} style={styles.storiesSection}>
            <View style={styles.storiesHeaderRow}>
              <Text style={styles.storiesSectionTitle}>Corridor Highlights</Text>
              <Text style={styles.storiesSectionSub}>Watch Stories 🎬</Text>
            </View>
            <ScrollView
              horizontal
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesScroll}
            >
              {storiesData.map((story, idx) => (
                <ScalePressable
                  key={story.id}
                  activeScale={0.88}
                  onPress={() => {
                    setStoryInitialIndex(idx);
                    setIsStoryModalVisible(true);
                  }}
                  style={styles.storyBubbleItem}
                >
                  <View style={styles.storyRingGradient}>
                    <Image source={{ uri: story.avatarUrl }} style={styles.storyAvatar} />
                  </View>
                  <Text style={styles.storyTitleText} numberOfLines={1}>
                    {story.title}
                  </Text>
                </ScalePressable>
              ))}
            </ScrollView>
          </FadeInUp>
        </ImageBackground>

        {/* Floating Route Booking Card with Entrance Animation */}
        <FadeInUp delay={120} distance={28} style={styles.selectorWrapper}>
          <Card variant="elevated" style={styles.bookingCard}>
            {/* Segmented Travel Mode Switcher */}
            <View style={styles.modeTabBar}>
              <ScalePressable
                activeScale={0.94}
                onPress={() => setTravelMode('bus')}
                style={[styles.modeTab, travelMode === 'bus' ? styles.modeTabActive : null]}
              >
                <Text style={styles.modeTabEmoji}>🚌</Text>
                <Text
                  style={[
                    styles.modeTabText,
                    travelMode === 'bus' ? styles.modeTabTextActive : null,
                  ]}
                >
                  Bus Coaches
                </Text>
              </ScalePressable>

              <ScalePressable
                activeScale={0.94}
                onPress={() => setTravelMode('hotel')}
                style={[styles.modeTab, travelMode === 'hotel' ? styles.modeTabActive : null]}
              >
                <Text style={styles.modeTabEmoji}>🏨</Text>
                <Text
                  style={[
                    styles.modeTabText,
                    travelMode === 'hotel' ? styles.modeTabTextActive : null,
                  ]}
                >
                  Stays & Rooms
                </Text>
              </ScalePressable>

              <ScalePressable
                activeScale={0.94}
                onPress={() => setTravelMode('route')}
                style={[styles.modeTab, travelMode === 'route' ? styles.modeTabActive : null]}
              >
                <Text style={styles.modeTabEmoji}>🗺️</Text>
                <Text
                  style={[
                    styles.modeTabText,
                    travelMode === 'route' ? styles.modeTabTextActive : null,
                  ]}
                >
                  Route Map
                </Text>
              </ScalePressable>
            </View>

            {travelMode === 'bus' && (
              <>
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
              </>
            )}

            {travelMode === 'hotel' && (
              <View style={styles.hotelFinderBox}>
                <View style={styles.cardHeaderRow}>
                  <View>
                    <Text style={styles.selectorTitle}>Find Executive Stays</Text>
                    <Text style={styles.selectorSub}>
                      Partner hotels & resorts across the corridor
                    </Text>
                  </View>
                  <Badge label="Agoda/Booking Verified" variant="success" />
                </View>

                <Text style={styles.finderLabel}>SELECT CITY / CORRIDOR TERMINAL</Text>
                <View style={styles.cityChipsRow}>
                  {(['Sukkur', 'Rohri', 'Ghotki', 'Daharki'] as const).map(c => (
                    <ScalePressable
                      key={c}
                      activeScale={0.92}
                      onPress={() => setHotelCity(c)}
                      style={[styles.cityChip, hotelCity === c ? styles.cityChipActive : null]}
                    >
                      <Text style={[styles.cityChipText, hotelCity === c ? styles.cityChipTextActive : null]}>
                        {c}
                      </Text>
                    </ScalePressable>
                  ))}
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaBlock}>
                    <Text style={styles.metaLabel}>STAY DURATION</Text>
                    <View style={styles.dateSelector}>
                      {[1, 2, 3].map(n => (
                        <ScalePressable
                          key={n}
                          activeScale={0.94}
                          onPress={() => setHotelNights(n)}
                          style={[styles.dateChip, hotelNights === n ? styles.dateChipActive : null]}
                        >
                          <Text style={[styles.dateChipText, hotelNights === n ? styles.dateChipTextActive : null]}>
                            {n} {n === 1 ? 'Night' : 'Nights'}
                          </Text>
                        </ScalePressable>
                      ))}
                    </View>
                  </View>

                  <View style={styles.metaBlock}>
                    <Text style={styles.metaLabel}>GUESTS</Text>
                    <View style={styles.passengerCounter}>
                      <ScalePressable
                        activeScale={0.82}
                        onPress={() => setHotelGuests(Math.max(1, hotelGuests - 1))}
                        style={styles.counterBtn}
                      >
                        <Text style={styles.counterBtnText}>-</Text>
                      </ScalePressable>
                      <Text style={styles.passengerCountText}>{hotelGuests}</Text>
                      <ScalePressable
                        activeScale={0.82}
                        onPress={() => setHotelGuests(Math.min(6, hotelGuests + 1))}
                        style={styles.counterBtn}
                      >
                        <Text style={styles.counterBtnText}>+</Text>
                      </ScalePressable>
                    </View>
                  </View>
                </View>

                <View style={styles.tripPeek}>
                  <View style={styles.peekItem}>
                    <ShieldIcon size={18} color="#16A34A" />
                    <Text style={styles.peekText}>Free Cancellation Guaranteed</Text>
                  </View>
                  <View style={styles.peekDivider} />
                  <View style={styles.peekItem}>
                    <Text style={styles.peekText}>Stays from</Text>
                    <Text style={styles.peekFare}>PKR 4,900</Text>
                  </View>
                </View>

                <Button
                  title={`View Available Rooms in ${hotelCity}`}
                  onPress={() => {
                    setActiveCategory('hotels');
                    Alert.alert(
                      `Accommodations in ${hotelCity}`,
                      `Showing verified executive rooms in ${hotelCity} for ${hotelGuests} guests (${hotelNights} night). Browse options below.`
                    );
                  }}
                  size="large"
                  style={styles.searchButton}
                />
              </View>
            )}

            {travelMode === 'route' && (
              <View style={styles.routeOverviewBox}>
                <View style={styles.corridorRouteHead}>
                  <View>
                    <Text style={styles.selectorTitle}>N-5 Highway Corridor</Text>
                    <Text style={styles.selectorSub}>Sukkur Terminal ⇄ Obuaro Terminal</Text>
                  </View>
                  <Badge label="160 KM Corridor" variant="category" />
                </View>

                <View style={styles.corridorStopsList}>
                  {ALL_STOPS.map((s, idx) => (
                    <ScalePressable
                      key={s.id}
                      activeScale={0.96}
                      onPress={() => {
                        setOrigin(s);
                        setTravelMode('bus');
                      }}
                      style={styles.corridorStopRow}
                    >
                      <View style={styles.corridorStopDotWrap}>
                        <View
                          style={[
                            styles.corridorStopDot,
                            idx === 0 && { backgroundColor: '#16A34A' },
                            idx === ALL_STOPS.length - 1 && { backgroundColor: colors.primary },
                          ]}
                        />
                        {idx < ALL_STOPS.length - 1 && <View style={styles.corridorStopLine} />}
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={styles.corridorStopName}>{s.name}</Text>
                          <Text style={styles.corridorStopUrdu}>{s.urduName}</Text>
                        </View>
                        <Text style={styles.corridorStopDesc}>{s.landmark}</Text>
                      </View>
                    </ScalePressable>
                  ))}
                </View>

                <Button
                  title="Select Route & Search Coaches"
                  onPress={() => setTravelMode('bus')}
                  size="large"
                  style={styles.searchButton}
                />
              </View>
            )}
          </Card>
        </FadeInUp>

        {/* Live Next Bus Countdown Ticker */}
        <FadeInUp delay={140} distance={16} style={styles.nextDepartureCard}>
          <View style={styles.nextDepLeft}>
            <View style={styles.livePulseCircle}>
              <PulseBeacon size={9} pulseSize={26} color="#22C55E" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.nextDepLabel}>NEXT DEPARTURE • IN 18 MINS</Text>
                <Badge label="Fast Boarding" variant="success" />
              </View>
              <Text style={styles.nextDepTitle}>Saffar Prime Executive • Sukkur ➔ Ghotki</Text>
              <Text style={styles.nextDepSeats}>Departs 01:15 PM • Only 5 Seats Left • PKR 600</Text>
            </View>
          </View>
          <ScalePressable
            activeScale={0.92}
            onPress={() =>
              onSearch({
                origin: ALL_STOPS[0],
                destination: ALL_STOPS[2],
                date: 'Today',
                passengers: 1,
              })
            }
            style={styles.quickBookBtn}
          >
            <Text style={styles.quickBookBtnText}>Book Now</Text>
          </ScalePressable>
        </FadeInUp>

        {/* Exclusive Corridor Launch Voucher Banner */}
        <FadeInUp delay={160} distance={18} style={styles.voucherContainer}>
          <View style={styles.voucherCard}>
            <View style={styles.voucherLeft}>
              <View style={styles.ticketIconWrap}>
                <TicketIcon size={24} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.voucherBadge}>FLAT 20% OFF FIRST TRIP</Text>
                <Text style={styles.voucherTitle}>Use Code: SAFFAR20</Text>
                <Text style={styles.voucherSub}>Valid on all luxury coaches & partner hotels</Text>
              </View>
            </View>
            <View style={styles.voucherDivider} />
            <ScalePressable
              activeScale={0.88}
              onPress={handleCopyPromo}
              style={[styles.copyBtn, copiedPromo ? styles.copyBtnDone : null]}
            >
              <Text style={[styles.copyBtnText, copiedPromo ? styles.copyBtnTextDone : null]}>
                {copiedPromo ? 'COPIED! ✓' : 'COPY'}
              </Text>
            </ScalePressable>
          </View>
        </FadeInUp>

        {/* Live Highway Weather & Telemetry Widget */}
        <FadeInUp delay={180} distance={18} style={styles.telemetryCard}>
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryEmoji}>☀️</Text>
            <View>
              <Text style={styles.telemetryTitle}>Corridor Weather</Text>
              <Text style={styles.telemetryValue}>29°C Clear Skies</Text>
            </View>
          </View>
          <View style={styles.telemetrySeparator} />
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryEmoji}>🛣️</Text>
            <View>
              <Text style={styles.telemetryTitle}>N-5 Highway Traffic</Text>
              <Text style={styles.telemetryValue}>Smooth (95 km/h)</Text>
            </View>
          </View>
          <View style={styles.telemetrySeparator} />
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryEmoji}>🛡️</Text>
            <View>
              <Text style={styles.telemetryTitle}>NHMP Patrol</Text>
              <Text style={styles.telemetryValue}>Route Secured</Text>
            </View>
          </View>
        </FadeInUp>

        {/* Interactive N-5 Route Stepper Strip */}
        <FadeInUp delay={200} distance={20} style={styles.routeStripSection}>
          <View style={styles.stripHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <RoadIcon size={18} color={colors.primary} />
              <Text style={styles.stripTitle}>N-5 Highway Route Progress</Text>
            </View>
            <Text style={styles.stripDistance}>160 km Total • 6 Terminals</Text>
          </View>

          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stripScroll}
          >
            {ALL_STOPS.map((stop, i) => {
              const isOrigin = stop.id === origin.id;
              const isDest = stop.id === destination.id;
              return (
                <ScalePressable
                  key={stop.id}
                  activeScale={0.92}
                  onPress={() => {
                    if (stop.id !== origin.id) {
                      setDestination(stop);
                    }
                  }}
                  style={[
                    styles.stripStopItem,
                    isOrigin ? styles.stripStopItemOrigin : null,
                    isDest ? styles.stripStopItemDest : null,
                  ]}
                >
                  <View style={styles.stripMarkerRow}>
                    <View
                      style={[
                        styles.stripDot,
                        isOrigin
                          ? { backgroundColor: '#16A34A' }
                          : isDest
                          ? { backgroundColor: colors.primary }
                          : null,
                      ]}
                    />
                    {i < ALL_STOPS.length - 1 && <View style={styles.stripConnector} />}
                  </View>
                  <Text style={[styles.stripStopName, (isOrigin || isDest) && styles.stripStopNameActive]}>
                    {stop.name}
                  </Text>
                  <Text style={styles.stripStopSeq}>Stop #{stop.sequence}</Text>
                </ScalePressable>
              );
            })}
          </ScrollView>
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

        {/* Interactive Category Filter Bar */}
        <FadeInUp delay={220} distance={20} style={styles.categoriesSection}>
          <View style={styles.categoryHeaderRow}>
            <View style={styles.filterTitleRow}>
              <SparklesIcon size={18} color={colors.primary} />
              <Text style={styles.categoryHeaderTitle}>Explore Accommodations & Attractions</Text>
            </View>
            <Text style={styles.categoryHeaderSub}>
              Filter premium hotels, room suites & famous sights on your journey
            </Text>
          </View>

          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CATEGORY_FILTERS.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <ScalePressable
                  key={cat.id}
                  activeScale={0.92}
                  onPress={() => setActiveCategory(cat.id)}
                  style={[
                    styles.categoryPill,
                    isActive ? styles.categoryPillActive : null,
                  ]}
                >
                  <Text style={styles.categoryIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      styles.categoryPillText,
                      isActive ? styles.categoryPillTextActive : null,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </ScalePressable>
              );
            })}
          </ScrollView>
        </FadeInUp>

        {/* Booking.com Style Hotels & Stays Section */}
        {filteredHotels.length > 0 && (
          <FadeInUp delay={250} distance={24} style={styles.hotelsSection}>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <HotelIcon size={20} color={colors.primary} />
                  <Text style={styles.sectionTitle}>Hotels & Stays Near Terminals</Text>
                </View>
                <Text style={styles.sectionSubtitle}>
                  Executive rooms & suites with instant confirmation & free cancellation
                </Text>
              </View>
              <Badge label={`${filteredHotels.length} Stays`} variant="category" />
            </View>

            <ScrollView
              horizontal
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hotelsScroll}
            >
              {filteredHotels.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onPress={h => setSelectedHotel(h)}
                />
              ))}
            </ScrollView>
          </FadeInUp>
        )}

        {/* Famous Destinations & Heritage Landmarks Section */}
        {filteredPlaces.length > 0 && (
          <FadeInUp delay={280} distance={24} style={styles.placesSection}>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <LandmarkIcon size={20} color={colors.primary} />
                  <Text style={styles.sectionTitle}>Famous Places Across Pakistan</Text>
                </View>
                <Text style={styles.sectionSubtitle}>
                  Explore iconic historical forts, sacred river islands, and UNESCO sites
                </Text>
              </View>
              <Badge label={`${filteredPlaces.length} Sights`} variant="category" />
            </View>

            <ScrollView
              horizontal
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.placesScroll}
            >
              {filteredPlaces.map(place => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onPress={p => setSelectedPlace(p)}
                />
              ))}
            </ScrollView>
          </FadeInUp>
        )}

        {/* Featured Corridor Stops with High-Res Photography */}
        <FadeInUp delay={310} distance={24} style={styles.stationsSection}>
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

      {/* Booking.com Style Hotel Detail & Room Reservation Modal */}
      <HotelDetailModal
        visible={selectedHotel !== null}
        hotel={selectedHotel}
        onClose={() => setSelectedHotel(null)}
      />

      {/* Famous Places Landmark Sightseeing Modal */}
      <PlaceDetailModal
        visible={selectedPlace !== null}
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />

      {/* Visual Story Viewer Modal */}
      <StoryViewerModal
        visible={isStoryModalVisible}
        stories={storiesData as StoryItem[]}
        initialIndex={storyInitialIndex}
        onClose={() => setIsStoryModalVisible(false)}
        onAction={handleStoryAction}
      />
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
  categoriesSection: {
    marginTop: spacing.xl + 6,
  },
  categoryHeaderRow: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  filterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryHeaderTitle: {
    ...typography.h3,
    fontSize: 19,
    color: colors.textPrimary,
  },
  categoryHeaderSub: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  categoryScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    gap: 8,
    paddingVertical: spacing.xs,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryIcon: {
    fontSize: 14,
  },
  categoryPillText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  hotelsSection: {
    marginTop: spacing.xxl,
  },
  hotelsScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingVertical: spacing.xs,
  },
  placesSection: {
    marginTop: spacing.xxl,
  },
  placesScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingVertical: spacing.xs,
  },
  storiesSection: {
    marginTop: spacing.md,
  },
  storiesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  storiesSectionTitle: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: '#E2E8F0',
    letterSpacing: 0.6,
  },
  storiesSectionSub: {
    ...typography.caption,
    fontSize: 11,
    color: '#FF7A33',
    fontWeight: '700',
  },
  storiesScroll: {
    paddingVertical: 4,
    gap: 14,
  },
  storyBubbleItem: {
    alignItems: 'center',
    width: 66,
  },
  storyRingGradient: {
    width: 58,
    height: 58,
    borderRadius: 29,
    padding: 2.5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#090D16',
  },
  storyTitleText: {
    ...typography.caption,
    fontSize: 11,
    color: '#CBD5E1',
    fontWeight: '700',
    marginTop: 5,
    textAlign: 'center',
  },
  modeTabBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: borderRadius.lg,
    padding: 3,
    marginBottom: spacing.md,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: borderRadius.md,
    gap: 5,
  },
  modeTabActive: {
    backgroundColor: '#FFFFFF',
    ...shadows.sm,
  },
  modeTabEmoji: {
    fontSize: 14,
  },
  modeTabText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  modeTabTextActive: {
    color: colors.primary,
    fontWeight: '900',
  },
  hotelFinderBox: {
    marginTop: spacing.xs,
  },
  finderLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    marginBottom: spacing.xs,
    letterSpacing: 0.6,
  },
  cityChipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: spacing.md,
  },
  cityChip: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cityChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cityChipText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  cityChipTextActive: {
    color: '#FFFFFF',
  },
  routeOverviewBox: {
    marginTop: spacing.xs,
  },
  corridorRouteHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  corridorStopsList: {
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
  },
  corridorStopRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'flex-start',
  },
  corridorStopDotWrap: {
    alignItems: 'center',
    width: 24,
    marginRight: 10,
    marginTop: 3,
  },
  corridorStopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#94A3B8',
  },
  corridorStopLine: {
    width: 2,
    height: 24,
    backgroundColor: '#CBD5E1',
    marginTop: 2,
  },
  corridorStopName: {
    ...typography.bodyMedium,
    fontWeight: '800',
    color: colors.dark,
    fontSize: 14,
  },
  corridorStopUrdu: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  corridorStopDesc: {
    ...typography.caption,
    fontSize: 11,
    color: '#64748B',
  },
  nextDepartureCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#DCFCE7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  nextDepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    marginRight: spacing.sm,
  },
  livePulseCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextDepLabel: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '900',
    color: '#16A34A',
    letterSpacing: 0.5,
  },
  nextDepTitle: {
    ...typography.bodyMedium,
    fontSize: 13,
    fontWeight: '800',
    color: colors.dark,
    marginTop: 2,
  },
  nextDepSeats: {
    ...typography.caption,
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  quickBookBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
  },
  quickBookBtnText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  voucherContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 85, 0, 0.35)',
    padding: spacing.md,
    ...shadows.sm,
  },
  voucherLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  ticketIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 85, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucherBadge: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  voucherTitle: {
    ...typography.bodyMedium,
    fontSize: 14,
    fontWeight: '900',
    color: colors.dark,
  },
  voucherSub: {
    ...typography.caption,
    fontSize: 11,
    color: '#78350F',
    marginTop: 1,
  },
  voucherDivider: {
    width: 1.5,
    height: 38,
    backgroundColor: 'rgba(255, 85, 0, 0.25)',
    marginHorizontal: spacing.sm,
  },
  copyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: borderRadius.md,
  },
  copyBtnDone: {
    backgroundColor: '#16A34A',
  },
  copyBtnText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  copyBtnTextDone: {
    color: '#FFFFFF',
  },
  telemetryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  telemetryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  telemetryEmoji: {
    fontSize: 16,
  },
  telemetryTitle: {
    ...typography.caption,
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  telemetryValue: {
    ...typography.caption,
    fontSize: 11,
    color: colors.dark,
    fontWeight: '800',
  },
  telemetrySeparator: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  routeStripSection: {
    marginTop: spacing.xl,
  },
  stripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xs + 2,
  },
  stripTitle: {
    ...typography.bodyMedium,
    fontSize: 14,
    fontWeight: '800',
    color: colors.dark,
  },
  stripDistance: {
    ...typography.caption,
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  stripScroll: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingVertical: spacing.xs,
    gap: 12,
  },
  stripStopItem: {
    width: 115,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  stripStopItemOrigin: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },
  stripStopItemDest: {
    borderColor: colors.primary,
    backgroundColor: '#FFF7ED',
  },
  stripMarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stripDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#94A3B8',
  },
  stripConnector: {
    flex: 1,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginLeft: 4,
  },
  stripStopName: {
    ...typography.bodyMedium,
    fontSize: 13,
    fontWeight: '800',
    color: colors.dark,
  },
  stripStopNameActive: {
    color: colors.primary,
  },
  stripStopSeq: {
    ...typography.caption,
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
});
