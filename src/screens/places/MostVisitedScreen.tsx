import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  StarIcon,
  LocationPinIcon,
  BookmarkIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { FadeInUp } from '../../components/animations';

export interface FamousPlaceItem {
  id: string;
  name: string;
  location: string;
  country: string;
  rating: number;
  price: number;
  currency: string;
  image: any;
  description: string;
  isBookmarked?: boolean;
}

export const PAKISTAN_MOST_VISITED: FamousPlaceItem[] = [
  {
    id: 'pk-1',
    name: 'Hunza Valley & Passu Cones',
    location: 'Gilgit-Baltistan',
    country: 'Pakistan',
    rating: 4.9,
    price: 180,
    currency: '$',
    image: {
      uri: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600&auto=format&fit=crop&q=80',
    },
    description:
      'Known as Shangri-La on Earth, Hunza boasts dramatic snow-capped peaks, terraced apricot orchards, ancient Baltit & Altit forts, and crystal-clear mountain rivers.',
    isBookmarked: true,
  },
  {
    id: 'pk-2',
    name: 'Badshahi Mosque & Lahore Fort',
    location: 'Lahore, Punjab',
    country: 'Pakistan',
    rating: 4.8,
    price: 75,
    currency: '$',
    image: {
      uri: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&auto=format&fit=crop&q=80',
    },
    description:
      'Majestic 17th-century Mughal red sandstone architecture, white marble domes, and sprawling royal courtyards adjacent to the historic walled city of Lahore.',
    isBookmarked: false,
  },
  {
    id: 'pk-3',
    name: 'Skardu & Shangrila Lake Resort',
    location: 'Skardu, Gilgit-Baltistan',
    country: 'Pakistan',
    rating: 4.9,
    price: 220,
    currency: '$',
    image: {
      uri: 'https://images.unsplash.com/photo-1627894006066-b4578811fa1e?w=600&auto=format&fit=crop&q=80',
    },
    description:
      'Surrounded by Karakoram giants and heart-shaped Lower Kachura Lake with signature red-roofed pagoda villas and high-altitude cold desert dunes.',
    isBookmarked: false,
  },
  {
    id: 'pk-4',
    name: 'Lansdowne Bridge & Indus River',
    location: 'Sukkur, Sindh',
    country: 'Pakistan',
    rating: 4.7,
    price: 50,
    currency: '$',
    image: require('../../assets/images/hotel_thumb_2.jpg'),
    description:
      'Historic 1889 cantilever engineering marvel spanning the mighty Indus River, leading directly to Sadhu Bela island temple and the historic Sukkur Barrage.',
    isBookmarked: false,
  },
  {
    id: 'pk-5',
    name: 'Fairy Meadows & Nanga Parbat',
    location: 'Diamer, Gilgit-Baltistan',
    country: 'Pakistan',
    rating: 5.0,
    price: 260,
    currency: '$',
    image: require('../../assets/images/place_mountain.jpg'),
    description:
      'Lush green alpine plateau offering front-row vistas of the sheer 8,126m Killer Mountain (Nanga Parbat), alpine pine forests, and star-filled night skies.',
    isBookmarked: false,
  },
  {
    id: 'pk-6',
    name: 'Astola Island & Gwadar Marine Coast',
    location: 'Gwadar, Balochistan',
    country: 'Pakistan',
    rating: 4.8,
    price: 160,
    currency: '$',
    image: require('../../assets/images/place_beach.jpg'),
    description:
      'Pakistan’s largest uninhabited offshore island with turquoise Arabian Sea waters, pristine sea cliffs, coral reef diving, and serene untouched sandy shores.',
    isBookmarked: false,
  },
  {
    id: 'pk-7',
    name: 'Ratti Gali Lake & Neelum Valley',
    location: 'Neelum, Azad Kashmir',
    country: 'Pakistan',
    rating: 4.9,
    price: 190,
    currency: '$',
    image: {
      uri: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    },
    description:
      'Glacial alpine jewel located at 12,130 feet fed by surrounding mountain glaciers and surrounded by blooming alpine wildflowers and lush pine forests.',
    isBookmarked: false,
  },
  {
    id: 'pk-8',
    name: 'Swat Valley & Malam Jabba',
    location: 'Swat, Khyber Pakhtunkhwa',
    country: 'Pakistan',
    rating: 4.7,
    price: 140,
    currency: '$',
    image: require('../../assets/images/hotel_thumb_3.jpg'),
    description:
      'The "Switzerland of the East" featuring rolling emerald hills, Swat River tributaries, and international ski slopes with chairlift views in Malam Jabba.',
    isBookmarked: false,
  },
];

interface MostVisitedScreenProps {
  onBack: () => void;
  onSelectPlace?: (place: FamousPlaceItem) => void;
}

export const MostVisitedScreen: React.FC<MostVisitedScreenProps> = ({
  onBack,
  onSelectPlace,
}) => {
  const insets = useSafeAreaInsets();
  const [places, setPlaces] = useState<FamousPlaceItem[]>(PAKISTAN_MOST_VISITED);

  const toggleBookmark = (id: string) => {
    setPlaces(prev =>
      prev.map(p => (p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p)),
    );
  };

  const handleBookNow = (place: FamousPlaceItem) => {
    if (onSelectPlace) {
      onSelectPlace(place);
    } else {
      Alert.alert(
        'Tour Selected 🎉',
        `Ready to explore ${place.name}? We have verified local accommodations and transport guides ready.`,
      );
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowBackIcon size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Most Visited</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36 },
        ]}
      >
        <Text style={styles.pageSubtitle}>
          Explore Pakistan’s most breathtaking natural wonders & heritage sights
        </Text>

        {places.map((place, index) => (
          <FadeInUp key={place.id} delay={index * 60}>
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={() => handleBookNow(place)}
              style={styles.placeCard}
            >
              {/* Left Large Image Thumbnail */}
              <View style={styles.imageWrapper}>
                <Image source={place.image} style={styles.placeImage} resizeMode="cover" />
              </View>

              {/* Right Content */}
              <View style={styles.cardContent}>
                {/* Name & Bookmark Row */}
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.placeName} numberOfLines={1}>
                    {place.name}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => toggleBookmark(place.id)}
                    style={styles.bookmarkBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <BookmarkIcon
                      size={18}
                      color={place.isBookmarked ? colors.primary : '#CBD5E1'}
                      filled={place.isBookmarked}
                    />
                  </TouchableOpacity>
                </View>

                {/* Rating */}
                <View style={styles.ratingRow}>
                  <StarIcon size={14} color="#F59E0B" />
                  <Text style={styles.ratingValue}>{place.rating.toFixed(1)}</Text>
                </View>

                {/* Location */}
                <View style={styles.locationRow}>
                  <LocationPinIcon size={12} color="#94A3B8" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {place.location}, {place.country}
                  </Text>
                </View>

                {/* Bottom Row: Price & Book Now */}
                <View style={styles.cardBottomRow}>
                  <Text style={styles.priceText}>
                    {place.currency}
                    {place.price}
                  </Text>

                  <Button
                    title="Book Now"
                    onPress={() => handleBookNow(place)}
                    variant="primary"
                    size="small"
                    style={styles.bookNowButton}
                    textStyle={styles.bookNowButtonText}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </FadeInUp>
        ))}
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
    borderBottomColor: '#F1F5F9',
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
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    marginBottom: spacing.md,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageWrapper: {
    width: 105,
    height: 105,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 6,
  },
  bookmarkBtn: {
    padding: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  bookNowButton: {
    backgroundColor: colors.primary, // #F65D3A
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 34,
  },
  bookNowButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

