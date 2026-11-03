import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Hotel } from '../../types';
import {
  StarIcon,
  LocationPinIcon,
  WifiIcon,
  AcIcon,
  CoffeeIcon,
  ShieldIcon,
  CheckIcon,
} from '../icons/AppIcons';
import { ScalePressable } from '../animations';
import { Badge } from '../common/Badge';

interface HotelCardProps {
  hotel: Hotel;
  onPress: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onPress }) => {
  return (
    <ScalePressable
      activeScale={0.96}
      onPress={() => onPress(hotel)}
      style={styles.cardContainer}
    >
      {/* Hotel Photo with High-End Overlay & Badges */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: hotel.imageUrl }} style={styles.hotelImage} />
        <View style={styles.imageGradientOverlay} />

        {/* Top Badges */}
        <View style={styles.badgeRow}>
          {hotel.badge && (
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>{hotel.badge}</Text>
            </View>
          )}
          <View style={styles.starBadge}>
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <StarIcon key={i} size={11} color="#F59E0B" />
            ))}
          </View>
        </View>

        {/* City & Distance Tag */}
        <View style={styles.distanceTag}>
          <LocationPinIcon size={12} color="#FFFFFF" />
          <Text style={styles.distanceTagText} numberOfLines={1}>
            {hotel.distanceFromTerminal}
          </Text>
        </View>
      </View>

      {/* Hotel Information Body */}
      <View style={styles.contentContainer}>
        {/* Title and Review Score Header */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Text style={styles.hotelName} numberOfLines={1}>
              {hotel.name}
            </Text>
            <Text style={styles.hotelAddress} numberOfLines={1}>
              {hotel.address}
            </Text>
          </View>

          {/* Booking.com Style Rating Pill */}
          <View style={styles.scoreContainer}>
            <View style={styles.scoreTextWrapper}>
              <Text style={styles.scoreDescriptor}>{hotel.reviewDescriptor}</Text>
              <Text style={styles.scoreReviews}>{hotel.reviewCount} reviews</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreValue}>{hotel.reviewScore.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* Key Amenities Snippet */}
        <View style={styles.amenitiesRow}>
          <View style={styles.amenityChip}>
            <WifiIcon size={12} color="#64748B" />
            <Text style={styles.amenityChipText}>Fast WiFi</Text>
          </View>
          <View style={styles.amenityChip}>
            <CoffeeIcon size={12} color="#64748B" />
            <Text style={styles.amenityChipText}>Breakfast</Text>
          </View>
          <View style={styles.amenityChip}>
            <AcIcon size={12} color="#64748B" />
            <Text style={styles.amenityChipText}>AC</Text>
          </View>
          <View style={styles.amenityChip}>
            <ShieldIcon size={12} color="#16A34A" />
            <Text style={[styles.amenityChipText, { color: '#16A34A' }]}>Verified</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Pricing & Booking CTA Footer */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.nightLabel}>1 Night • 2 Adults</Text>
            <View style={styles.priceRow}>
              {hotel.originalPricePerNight && (
                <Text style={styles.originalPrice}>
                  PKR {hotel.originalPricePerNight.toLocaleString()}
                </Text>
              )}
              <Text style={styles.finalPrice}>
                PKR {hotel.pricePerNight.toLocaleString()}
              </Text>
            </View>
            <Text style={styles.taxNote}>Includes taxes & fees</Text>
          </View>

          {/* Reserve Button */}
          <View style={styles.reserveBtn}>
            <Text style={styles.reserveBtnText}>Reserve</Text>
          </View>
        </View>
      </View>
    </ScalePressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 290,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginRight: spacing.md,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  imageWrapper: {
    width: '100%',
    height: 155,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  hotelImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.25)',
  },
  badgeRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoBadge: {
    backgroundColor: 'rgba(255, 85, 0, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  promoBadgeText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  distanceTag: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  distanceTagText: {
    ...typography.caption,
    fontSize: 11,
    color: '#F8FAFC',
    fontWeight: '600',
  },
  contentContainer: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  hotelName: {
    ...typography.bodyLarge,
    fontWeight: '800',
    color: colors.dark,
    fontSize: 16,
    lineHeight: 20,
  },
  hotelAddress: {
    ...typography.caption,
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scoreTextWrapper: {
    alignItems: 'flex-end',
  },
  scoreDescriptor: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.dark,
  },
  scoreReviews: {
    ...typography.caption,
    fontSize: 9,
    color: '#94A3B8',
  },
  scoreBox: {
    backgroundColor: '#0F172A',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '900',
    color: '#38BDF8',
  },
  amenitiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
    flexWrap: 'wrap',
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  amenityChipText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  nightLabel: {
    ...typography.caption,
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 1,
  },
  originalPrice: {
    ...typography.caption,
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    ...typography.bodyLarge,
    fontSize: 17,
    fontWeight: '900',
    color: colors.primary,
  },
  taxNote: {
    ...typography.caption,
    fontSize: 9,
    color: '#16A34A',
    fontWeight: '600',
  },
  reserveBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  reserveBtnText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
