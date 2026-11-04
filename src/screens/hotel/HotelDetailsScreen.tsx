import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  BookmarkIcon,
  LocationPinIcon,
  StarIcon,
  CheckIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { ScalePressable } from '../../components/animations';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface HotelDetailsData {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  aboutText: string;
  images: any[];
  facilities: string[];
}

const DEFAULT_HOTEL: HotelDetailsData = {
  id: 'hotel-niribili',
  name: 'Hotel Niribili',
  location: "Cox's Bazar, Pakistan",
  pricePerNight: 85,
  currency: '$',
  rating: 4.4,
  reviewsCount: 150,
  aboutText:
    'Experience seaside luxury with panoramic ocean views and private beach access. Hotel Niribili offers world-class hospitality, tranquil suites with modern architectural styling, bespoke culinary delights, and serene atmosphere tailored for unforgettable vacations and family getaways.',
  images: [
    require('../../assets/images/hotel_details_hero.jpg'),
    require('../../assets/images/room_deluxe.jpg'),
    require('../../assets/images/hotel_thumb_1.jpg'),
    require('../../assets/images/hotel_thumb_2.jpg'),
  ],
  facilities: ['Free Wifi', 'Pool', 'Breakfast', 'Lunch'],
};

interface HotelDetailsScreenProps {
  hotel?: HotelDetailsData;
  onBack: () => void;
  onSelectRoom: () => void;
}

export const HotelDetailsScreen: React.FC<HotelDetailsScreenProps> = ({
  hotel = DEFAULT_HOTEL,
  onBack,
  onSelectRoom,
}) => {
  const insets = useSafeAreaInsets();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Top Hero Image Carousel */}
        <View style={styles.heroContainer}>
          <Image
            source={hotel.images[activeImageIndex] || hotel.images[0]}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Top Floating Overlay Bar */}
          <View style={[styles.topBarOverlay, { paddingTop: insets.top + spacing.sm }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBack}
              style={styles.roundIconButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <ArrowBackIcon size={20} color="#111827" />
            </TouchableOpacity>

            <Text style={styles.topBarTitle}>Hotel Details</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsSaved(!isSaved)}
              style={styles.roundIconButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <BookmarkIcon
                size={20}
                color={isSaved ? colors.primary : '#111827'}
                filled={isSaved}
              />
            </TouchableOpacity>
          </View>

          {/* Pagination Dots at Bottom of Hero */}
          <View style={styles.paginationDots}>
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <TouchableOpacity
                key={idx}
                onPress={() => setActiveImageIndex(idx % hotel.images.length)}
                style={[
                  styles.dot,
                  (idx % hotel.images.length) === activeImageIndex
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Bottom Sheet Card Content */}
        <View style={styles.sheetCard}>
          {/* Header Row: Title & Price */}
          <View style={styles.titlePriceRow}>
            <View style={{ flex: 1, paddingRight: spacing.sm }}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.locationRow}>
                <LocationPinIcon size={14} color="#94A3B8" />
                <Text style={styles.locationText}>{hotel.location}</Text>
              </View>
            </View>

            <View style={styles.priceColumn}>
              <Text style={styles.priceAmount}>
                {hotel.currency}
                {hotel.pricePerNight}
              </Text>
              <Text style={styles.pricePeriod}>(For 01 Night/Room)</Text>
            </View>
          </View>

          {/* Rating Badge */}
          <View style={styles.ratingRow}>
            <StarIcon size={16} color="#F59E0B" />
            <Text style={styles.ratingValue}>{hotel.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsCount}>({hotel.reviewsCount} Reviews)</Text>
          </View>

          <View style={styles.divider} />

          {/* About Section */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>About</Text>
            <Text
              style={styles.aboutParagraph}
              numberOfLines={isExpanded ? undefined : 3}
            >
              {hotel.aboutText}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.readMoreBtn}
            >
              <Text style={styles.readMoreText}>
                {isExpanded ? 'Read Less' : 'Read More...'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Facilities Section */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Facilities</Text>
            <View style={styles.facilitiesGrid}>
              {hotel.facilities.map((fac, idx) => (
                <View key={idx} style={styles.facilityItem}>
                  <CheckIcon size={16} color={colors.primary} />
                  <Text style={styles.facilityText}>{fac}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View
        style={[
          styles.bottomActionBar,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : spacing.md,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsSaved(!isSaved)}
          style={[styles.saveSquareButton, isSaved && styles.saveSquareButtonActive]}
        >
          <BookmarkIcon
            size={22}
            color={isSaved ? colors.primary : '#64748B'}
            filled={isSaved}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Button
            title="Select a Room"
            onPress={onSelectRoom}
            variant="primary"
            style={styles.selectRoomCTA}
            textStyle={styles.selectRoomCTAText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
    backgroundColor: '#1E293B',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  topBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  roundIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  paginationDots: {
    position: 'absolute',
    bottom: 38,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  sheetCard: {
    marginTop: -28,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    ...shadows.lg,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hotelName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  pricePeriod: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  reviewsCount: {
    fontSize: 13,
    color: '#94A3B8',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.md,
  },
  sectionBlock: {
    marginBottom: spacing.xs,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.xs,
  },
  aboutParagraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64748B',
  },
  readMoreBtn: {
    marginTop: 4,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary, // #F65D3A
  },
  facilitiesGrid: {
    marginTop: spacing.xs,
    gap: 8,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  facilityText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    ...shadows.lg,
  },
  saveSquareButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  saveSquareButtonActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF7ED',
  },
  selectRoomCTA: {
    backgroundColor: colors.primary, // #F65D3A
    borderRadius: 14,
    height: 52,
    ...shadows.md,
  },
  selectRoomCTAText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
