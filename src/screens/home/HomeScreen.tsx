import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import {
  MenuIcon,
  SearchIcon,
  BookmarkIcon,
  MountainIcon,
  BeachIcon,
  LakeIcon,
  CampIcon,
  HotelIcon,
  FlightIcon,
  BusIcon,
  BoatIcon,
  StarIcon,
  LocationPinIcon,
  SwapIcon,
  ClockIcon,
  CheckIcon,
} from '../../components/icons/AppIcons';
import { SaffarLogo } from '../../components/brand/SaffarLogo';
import { ALL_STOPS, getFare, getEstimatedDurationMinutes } from '../../utils/routeUtils';
import { RouteStop } from '../../types';
import { FadeInUp, ScalePressable } from '../../components/animations';
import { SideDrawer } from '../../components/drawer/SideDrawer';

interface HomeScreenProps {
  onSearch: (params: {
    origin: RouteStop;
    destination: RouteStop;
    date: string;
    passengers: number;
  }) => void;
  onNavigateToTracking?: () => void;
  onOpenHotelSearch?: () => void;
  onOpenSearchHotelForm?: () => void;
  onOpenHotelDetails?: (hotelId?: string) => void;
  onOpenPlaceDetails?: (placeId?: string) => void;
  onOpenCategories?: () => void;
  onOpenServices?: () => void;
  onOpenExtraServices?: () => void;
  onOpenMostVisited?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  onLogout?: () => void;
  userName?: string;
}

export type CategoryType = 'mountains' | 'beach' | 'lakes' | 'camp';
export type ServiceType = 'hotel' | 'flight' | 'bus' | 'boat';

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearch,
  onNavigateToTracking,
  onOpenHotelSearch,
  onOpenSearchHotelForm,
  onOpenHotelDetails,
  onOpenPlaceDetails,
  onOpenCategories,
  onOpenServices,
  onOpenExtraServices,
  onOpenMostVisited,
  onOpenNotifications,
  onOpenProfile,
  onLogout,
  userName = 'Traveler',
}) => {
  const insets = useSafeAreaInsets();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Selected Category & Service Tab
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('mountains');
  const [selectedService, setSelectedService] = useState<ServiceType>('hotel');

  // Bus booking form state
  const [origin, setOrigin] = useState<RouteStop>(ALL_STOPS[0]); // Sukkur
  const [destination, setDestination] = useState<RouteStop>(ALL_STOPS[ALL_STOPS.length - 1]); // Obuaro
  const [selectedDate, setSelectedDate] = useState<'Today' | 'Tomorrow'>('Today');
  const [passengers, setPassengers] = useState<number>(1);
  const [pickingStop, setPickingStop] = useState<'origin' | 'destination' | null>(null);

  // Bookmarks state
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<Record<string, boolean>>({
    'place-1': true,
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedPlaces(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSwapStops = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const fareEstimate = getFare(origin.name, destination.name);
  const durationEstimate = getEstimatedDurationMinutes(origin.name, destination.name);

  const MOST_VISITED_PLACES = [
    {
      id: 'pk-1',
      title: 'Hunza Valley & Passu',
      location: 'Gilgit-Baltistan, Pakistan',
      rating: 4.9,
      image: {
        uri: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600&auto=format&fit=crop&q=80',
      },
    },
    {
      id: 'pk-2',
      title: 'Badshahi Mosque & Fort',
      location: 'Lahore, Punjab, Pakistan',
      rating: 4.8,
      image: {
        uri: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&auto=format&fit=crop&q=80',
      },
    },
    {
      id: 'pk-3',
      title: 'Skardu & Shangrila Lake',
      location: 'Skardu, Gilgit-Baltistan, Pakistan',
      rating: 4.9,
      image: {
        uri: 'https://images.unsplash.com/photo-1627894006066-b4578811fa1e?w=600&auto=format&fit=crop&q=80',
      },
    },
    {
      id: 'pk-4',
      title: 'Lansdowne Bridge & Indus',
      location: 'Sukkur, Sindh, Pakistan',
      rating: 4.7,
      image: require('../../assets/images/hotel_thumb_2.jpg'),
    },
    {
      id: 'pk-5',
      title: 'Fairy Meadows & Nanga Parbat',
      location: 'Diamer, Gilgit-Baltistan, Pakistan',
      rating: 5.0,
      image: require('../../assets/images/place_mountain.jpg'),
    },
    {
      id: 'pk-6',
      title: 'Astola Island & Gwadar Coast',
      location: 'Gwadar, Balochistan, Pakistan',
      rating: 4.8,
      image: require('../../assets/images/place_beach.jpg'),
    },
  ];

  const TOP_EVENTS = [
    {
      id: 'event-1',
      title: 'Desert Sunset Safari',
      date: '15-18 Nov 2026',
      image: require('../../assets/images/home_banner.jpg'),
    },
    {
      id: 'event-2',
      title: 'Sindh Sufi & Heritage Fest',
      date: '22-25 Nov 2026',
      image: require('../../assets/images/hotel_details_hero.jpg'),
    },
    {
      id: 'event-3',
      title: 'Mountain Star Camp',
      date: '02-05 Dec 2026',
      image: require('../../assets/images/room_deluxe.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Top Header Banner with Mountain Landscape */}
        <ImageBackground
          source={require('../../assets/images/home_banner.jpg')}
          style={[styles.headerBanner, { paddingTop: insets.top + spacing.sm }]}
          resizeMode="cover"
        >
          {/* Header Action Bar */}
          <View style={styles.headerTopBar}>
            {/* Hamburger Menu on Left */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setDrawerVisible(true)}
              style={styles.menuButton}
            >
              <MenuIcon size={22} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Saffar Center Brand Logo */}
            <View style={styles.headerLogoContainer}>
              <SaffarLogo variant="header" theme="white" />
            </View>

            {/* User Avatar on Right */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onOpenProfile || onOpenNotifications}
              style={styles.avatarButton}
            >
              <Image
                source={require('../../assets/images/user_avatar.jpg')}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Floating Search Bar (overlapping header banner) */}
        <View style={styles.searchBarWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onOpenSearchHotelForm || onOpenHotelSearch}
            style={styles.floatingSearchBar}
          >
            <SearchIcon size={20} color="#94A3B8" />
            <Text style={styles.searchPlaceholder}>Search any places, hotels...</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onOpenCategories || onOpenHotelSearch}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesRow}>
            {/* Mountains */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('mountains')}
              style={[
                styles.categoryCard,
                selectedCategory === 'mountains' && styles.categoryCardActive,
              ]}
            >
              <MountainIcon size={24} color={colors.primary} />
              <Text style={styles.categoryTitle}>Mountains</Text>
            </TouchableOpacity>

            {/* Beach */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('beach')}
              style={[
                styles.categoryCard,
                selectedCategory === 'beach' && styles.categoryCardActive,
              ]}
            >
              <BeachIcon size={24} color={colors.primary} />
              <Text style={styles.categoryTitle}>Beach</Text>
            </TouchableOpacity>

            {/* Lakes */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('lakes')}
              style={[
                styles.categoryCard,
                selectedCategory === 'lakes' && styles.categoryCardActive,
              ]}
            >
              <LakeIcon size={24} color={colors.primary} />
              <Text style={styles.categoryTitle}>Lakes</Text>
            </TouchableOpacity>

            {/* Camp */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('camp')}
              style={[
                styles.categoryCard,
                selectedCategory === 'camp' && styles.categoryCardActive,
              ]}
            >
              <CampIcon size={24} color={colors.primary} />
              <Text style={styles.categoryTitle}>Camp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. Most Visited Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Visited</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onOpenMostVisited || onOpenHotelSearch}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCardsScroll}
          >
            {MOST_VISITED_PLACES.map((place, index) => {
              const isSaved = !!bookmarkedPlaces[place.id];
              return (
                <FadeInUp key={place.id} delay={index * 80}>
                  <TouchableOpacity
                    activeOpacity={0.92}
                    onPress={() => (onOpenPlaceDetails ? onOpenPlaceDetails(place.id) : onOpenHotelDetails ? onOpenHotelDetails(place.id) : null)}
                    style={styles.visitedCard}
                  >
                    <Image source={place.image} style={styles.visitedImage} resizeMode="cover" />

                    {/* Gradient-like dark overlay */}
                    <View style={styles.visitedOverlay} />

                    {/* Rating Top-Left */}
                    <View style={styles.ratingBadgeTopLeft}>
                      <StarIcon size={12} color="#FFFFFF" />
                      <Text style={styles.ratingBadgeText}>{place.rating.toFixed(1)}</Text>
                    </View>

                    {/* Bookmark Top-Right */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => toggleBookmark(place.id)}
                      style={styles.bookmarkTopRight}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <BookmarkIcon
                        size={16}
                        color={isSaved ? colors.primary : '#FFFFFF'}
                        filled={isSaved}
                      />
                    </TouchableOpacity>

                    {/* Card Title & Location at Bottom */}
                    <View style={styles.visitedBottomInfo}>
                      <Text style={styles.visitedTitle} numberOfLines={1}>
                        {place.title}
                      </Text>
                      <View style={styles.visitedLocationRow}>
                        <LocationPinIcon size={11} color="#E2E8F0" />
                        <Text style={styles.visitedLocationText} numberOfLines={1}>
                          {place.location}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </FadeInUp>
              );
            })}
          </ScrollView>
        </View>

        {/* 3. Services Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onOpenServices || onOpenHotelSearch}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Service Pills */}
          <View style={styles.servicesPillsRow}>
            {/* Hotel */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedService('hotel')}
              style={[
                styles.servicePill,
                selectedService === 'hotel'
                  ? styles.servicePillActive
                  : styles.servicePillInactive,
              ]}
            >
              <HotelIcon
                size={16}
                color={selectedService === 'hotel' ? '#FFFFFF' : colors.primary}
              />
              <Text
                style={[
                  styles.servicePillText,
                  selectedService === 'hotel' && styles.servicePillTextActive,
                ]}
              >
                Hotel
              </Text>
            </TouchableOpacity>

            {/* Flight */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedService('flight')}
              style={[
                styles.servicePill,
                selectedService === 'flight'
                  ? styles.servicePillActive
                  : styles.servicePillInactive,
              ]}
            >
              <FlightIcon
                size={16}
                color={selectedService === 'flight' ? '#FFFFFF' : colors.primary}
              />
              <Text
                style={[
                  styles.servicePillText,
                  selectedService === 'flight' && styles.servicePillTextActive,
                ]}
              >
                Flight
              </Text>
            </TouchableOpacity>

            {/* Bus */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedService('bus')}
              style={[
                styles.servicePill,
                selectedService === 'bus'
                  ? styles.servicePillActive
                  : styles.servicePillInactive,
              ]}
            >
              <BusIcon
                size={16}
                color={selectedService === 'bus' ? '#FFFFFF' : colors.primary}
              />
              <Text
                style={[
                  styles.servicePillText,
                  selectedService === 'bus' && styles.servicePillTextActive,
                ]}
              >
                Bus
              </Text>
            </TouchableOpacity>

            {/* Boat */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedService('boat')}
              style={[
                styles.servicePill,
                selectedService === 'boat'
                  ? styles.servicePillActive
                  : styles.servicePillInactive,
              ]}
            >
              <BoatIcon
                size={16}
                color={selectedService === 'boat' ? '#FFFFFF' : colors.primary}
              />
              <Text
                style={[
                  styles.servicePillText,
                  selectedService === 'boat' && styles.servicePillTextActive,
                ]}
              >
                Boat
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Service Card */}
          {selectedService === 'bus' ? (
            /* Sukkur ⇄ Obuaro Bus Quick Booking Card */
            <View style={styles.busBookingCard}>
              <View style={styles.busCardHeader}>
                <Text style={styles.busCardTitle}>Sukkur ⇄ Obuaro Express Bus</Text>
                <TouchableOpacity onPress={handleSwapStops} style={styles.swapBtn}>
                  <SwapIcon size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.stopsSelectionRow}>
                {/* Origin */}
                <TouchableOpacity
                  onPress={() => setPickingStop('origin')}
                  style={styles.stopBox}
                >
                  <Text style={styles.stopBoxLabel}>From</Text>
                  <Text style={styles.stopBoxCity}>{origin.name}</Text>
                </TouchableOpacity>

                {/* Arrow */}
                <Text style={styles.stopArrow}>➔</Text>

                {/* Destination */}
                <TouchableOpacity
                  onPress={() => setPickingStop('destination')}
                  style={styles.stopBox}
                >
                  <Text style={styles.stopBoxLabel}>To</Text>
                  <Text style={styles.stopBoxCity}>{destination.name}</Text>
                </TouchableOpacity>
              </View>

              {/* Estimate & Button */}
              <View style={styles.busCardBottomRow}>
                <View>
                  <Text style={styles.busFareText}>Fare from PKR {fareEstimate}</Text>
                  <Text style={styles.busDurationText}>~{durationEstimate} mins travel</Text>
                </View>

                <Button
                  title="Find Buses"
                  onPress={() =>
                    onSearch({
                      origin,
                      destination,
                      date: selectedDate,
                      passengers,
                    })
                  }
                  variant="primary"
                  size="small"
                  style={{ borderRadius: 10, paddingHorizontal: 16 }}
                />
              </View>
            </View>
          ) : (
            /* Hotel Quick View Card */
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={onOpenHotelSearch}
              style={styles.hotelPromoBanner}
            >
              <View style={styles.hotelPromoLeft}>
                <Text style={styles.hotelPromoBadge}>SPECIAL OFFER</Text>
                <Text style={styles.hotelPromoHeading}>Get up to 35% OFF on Luxury Stays</Text>
                <Text style={styles.hotelPromoSub}>Book rooms with free cancellation & breakfast</Text>
              </View>
              <View style={styles.hotelPromoButton}>
                <Text style={styles.hotelPromoBtnText}>Explore</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* 4. Top Events Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Events</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCardsScroll}
          >
            {TOP_EVENTS.map(ev => (
              <TouchableOpacity
                key={ev.id}
                activeOpacity={0.9}
                style={styles.eventCard}
              >
                <Image source={ev.image} style={styles.eventImage} resizeMode="cover" />
                <View style={styles.eventOverlay} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventDateText}>{ev.date}</Text>
                  <Text style={styles.eventTitleText}>{ev.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Stop Picker Modal for Bus Booking */}
      <Modal
        visible={!!pickingStop}
        transparent
        animationType="slide"
        onRequestClose={() => setPickingStop(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.stopModalBox}>
            <Text style={styles.stopModalTitle}>
              Select {pickingStop === 'origin' ? 'Departure' : 'Arrival'} Stop
            </Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {ALL_STOPS.map(stop => (
                <TouchableOpacity
                  key={stop.id}
                  onPress={() => {
                    if (pickingStop === 'origin') setOrigin(stop);
                    else setDestination(stop);
                    setPickingStop(null);
                  }}
                  style={styles.stopOptionRow}
                >
                  <Text style={styles.stopOptionName}>{stop.name}</Text>
                  <Text style={styles.stopOptionDist}>{stop.landmark}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Slide-out Drawer Modal matching Figma */}
      <SideDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSelectMenu={id => {
          if (id === 'extra_services' && onOpenExtraServices) {
            onOpenExtraServices();
          } else if (id === 'upgrade') {
            Alert.alert(
              'SaffarPK Premium ⭐',
              'Upgrade for free VIP lounge access, 25% lower fares, and zero cancellation charges across all Pakistan routes!',
            );
          } else if (id === 'themes') {
            Alert.alert(
              'Themes',
              'Available themes: Saffar Sunset Orange (Default), Indus Azure, and Midnight Star.',
            );
          } else if (id === 'settings') {
            if (onOpenProfile) onOpenProfile();
          } else if (id === 'support') {
            Alert.alert(
              '24/7 Helpline',
              'Sukkur Terminal: 071-5612345\nObuaro Station: 0723-559900\nWhatsApp: +92 300 1234567',
            );
          } else if (id === 'bug') {
            Alert.alert(
              'Report an Issue',
              'Thank you for helping us improve SaffarPK! Send bug details to bugs@saffarpk.com.',
            );
          }
        }}
        onLogout={
          onLogout ||
          (() => {
            Alert.alert('Signed Out', 'You have been logged out of SaffarPK.');
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerBanner: {
    width: '100%',
    height: 195,
    backgroundColor: '#F65D3A',
    justifyContent: 'flex-start',
  },
  headerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },

  // Search Bar
  searchBarWrapper: {
    paddingHorizontal: spacing.lg,
    marginTop: -24,
    zIndex: 10,
  },
  floatingSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 50,
    ...shadows.md,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: spacing.sm,
    fontWeight: '500',
  },

  // Sections
  sectionContainer: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary, // #F65D3A
  },

  // Categories
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    gap: 10,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  categoryCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF7ED',
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginTop: 6,
  },

  // Most Visited Cards
  horizontalCardsScroll: {
    paddingHorizontal: spacing.lg,
    gap: 14,
  },
  visitedCard: {
    width: 165,
    height: 190,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
    ...shadows.md,
  },
  visitedImage: {
    width: '100%',
    height: '100%',
  },
  visitedOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  ratingBadgeTopLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bookmarkTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitedBottomInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  visitedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  visitedLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  visitedLocationText: {
    fontSize: 11,
    color: '#F1F5F9',
  },

  // Services
  servicesPillsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: 10,
    marginBottom: spacing.md,
  },
  servicePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 38,
    borderRadius: 12,
    ...shadows.sm,
  },
  servicePillActive: {
    backgroundColor: colors.primary, // #F65D3A
  },
  servicePillInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  servicePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  servicePillTextActive: {
    color: '#FFFFFF',
  },

  // Bus booking card
  busBookingCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  busCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  busCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  swapBtn: {
    padding: 4,
  },
  stopsSelectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  stopBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 8,
  },
  stopBoxLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  stopBoxCity: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  stopArrow: {
    marginHorizontal: 8,
    fontSize: 16,
    color: colors.primary,
  },
  busCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  busFareText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  busDurationText: {
    fontSize: 11,
    color: '#64748B',
  },

  // Hotel Promo Banner
  hotelPromoBanner: {
    marginHorizontal: spacing.lg,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hotelPromoLeft: {
    flex: 1,
    paddingRight: 10,
  },
  hotelPromoBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  hotelPromoHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  hotelPromoSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  hotelPromoButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  hotelPromoBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Events
  eventCard: {
    width: 200,
    height: 115,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#CBD5E1',
    ...shadows.sm,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  eventOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  eventContent: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
  },
  eventDateText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  eventTitleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Stop picker modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  stopModalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
  },
  stopModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.md,
  },
  stopOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  stopOptionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  stopOptionDist: {
    fontSize: 12,
    color: '#64748B',
  },
});
