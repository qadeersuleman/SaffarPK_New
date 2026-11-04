import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  BookmarkIcon,
  StarIcon,
  LocationPinIcon,
} from '../../components/icons/AppIcons';
import { FadeInUp } from '../../components/animations';

export interface SavedPlaceItem {
  id: string;
  name: string;
  location: string;
  country: string;
  rating: number;
  image: any;
  isBookmarked: boolean;
}

export interface SavedEventItem {
  id: string;
  title: string;
  location: string;
  joinedText: string;
  image: any;
  isBookmarked: boolean;
}

const SAVED_PLACES: SavedPlaceItem[] = [
  {
    id: 'sp-1',
    name: 'Hunza Valley & Passu',
    location: 'Gilgit-Baltistan',
    country: 'Pakistan',
    rating: 4.9,
    image: require('../../assets/images/place_mountain.jpg'),
    isBookmarked: true,
  },
  {
    id: 'sp-2',
    name: 'Astola Island Marine Coast',
    location: 'Gwadar, Balochistan',
    country: 'Pakistan',
    rating: 4.8,
    image: require('../../assets/images/place_beach.jpg'),
    isBookmarked: false,
  },
  {
    id: 'sp-3',
    name: 'Lansdowne Bridge & Sukkur River',
    location: 'Sukkur, Sindh',
    country: 'Pakistan',
    rating: 4.7,
    image: require('../../assets/images/hotel_thumb_2.jpg'),
    isBookmarked: false,
  },
];

const SAVED_EVENTS: SavedEventItem[] = [
  {
    id: 'se-1',
    title: 'Indus River Safari & Camp 2026',
    location: 'Sukkur, Sindh',
    joinedText: '12+ People Already Joined',
    image: require('../../assets/images/home_banner.jpg'),
    isBookmarked: true,
  },
  {
    id: 'se-2',
    title: 'Cholistan Desert Rally & Stargazing',
    location: 'Bahawalpur, Punjab',
    joinedText: '20+ People Already Joined',
    image: require('../../assets/images/hotel_details_hero.jpg'),
    isBookmarked: false,
  },
  {
    id: 'se-3',
    title: 'Shandur High Altitude Polo Festival',
    location: 'Chitral, KP',
    joinedText: '18+ People Already Joined',
    image: require('../../assets/images/room_deluxe.jpg'),
    isBookmarked: false,
  },
];

interface SavedScreenProps {
  onBack?: () => void;
  showBackButton?: boolean;
  onSelectPlace?: (place: SavedPlaceItem) => void;
  onSelectEvent?: (event: SavedEventItem) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  onBack,
  showBackButton = false,
  onSelectPlace,
  onSelectEvent,
}) => {
  const insets = useSafeAreaInsets();
  const [places, setPlaces] = useState<SavedPlaceItem[]>(SAVED_PLACES);
  const [events, setEvents] = useState<SavedEventItem[]>(SAVED_EVENTS);

  const togglePlaceBookmark = (id: string) => {
    setPlaces(prev =>
      prev.map(p => (p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p)),
    );
  };

  const toggleEventBookmark = (id: string) => {
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, isBookmarked: !e.isBookmarked } : e)),
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        {showBackButton && onBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ArrowBackIcon size={22} color="#111827" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}

        <Text style={styles.headerTitle}>Saved</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 80 : 100 },
        ]}
      >
        {/* Section 1: Places */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Places</Text>

          {places.map((place, index) => (
            <FadeInUp key={place.id} delay={index * 60}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => (onSelectPlace ? onSelectPlace(place) : null)}
                style={styles.card}
              >
                {/* Circular Image */}
                <Image source={place.image} style={styles.circleImage} />

                {/* Details */}
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {place.name}
                  </Text>
                  <View style={styles.locationRow}>
                    <LocationPinIcon size={12} color="#94A3B8" />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {place.location}, {place.country}
                    </Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <StarIcon size={13} color="#F59E0B" />
                    <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
                  </View>
                </View>

                {/* Bookmark Icon */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => togglePlaceBookmark(place.id)}
                  style={styles.bookmarkAction}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <BookmarkIcon
                    size={20}
                    color={place.isBookmarked ? colors.primary : '#CBD5E1'}
                    filled={place.isBookmarked}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </FadeInUp>
          ))}
        </View>

        {/* Section 2: Events */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Events</Text>

          {events.map((ev, index) => (
            <FadeInUp key={ev.id} delay={index * 60}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => (onSelectEvent ? onSelectEvent(ev) : null)}
                style={styles.card}
              >
                {/* Circular Image */}
                <Image source={ev.image} style={styles.circleImage} />

                {/* Details */}
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {ev.title}
                  </Text>
                  <View style={styles.locationRow}>
                    <LocationPinIcon size={12} color="#94A3B8" />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {ev.location}
                    </Text>
                  </View>
                  <Text style={styles.joinedText}>{ev.joinedText}</Text>
                </View>

                {/* Bookmark Icon */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleEventBookmark(ev.id)}
                  style={styles.bookmarkAction}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <BookmarkIcon
                    size={20}
                    color={ev.isBookmarked ? colors.primary : '#CBD5E1'}
                    filled={ev.isBookmarked}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </FadeInUp>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: spacing.md,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  circleImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E2E8F0',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  joinedText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary, // #F65D3A
  },
  bookmarkAction: {
    padding: 6,
  },
});
