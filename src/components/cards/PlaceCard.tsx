import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { FamousPlace } from '../../types';
import { StarIcon, LocationPinIcon, HeartIcon, ArrowForwardIcon } from '../icons/AppIcons';
import { ScalePressable } from '../animations';
import { Badge } from '../common/Badge';

interface PlaceCardProps {
  place: FamousPlace;
  onPress: (place: FamousPlace) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <ScalePressable
      activeScale={0.96}
      onPress={() => onPress(place)}
      style={styles.cardContainer}
    >
      {/* High-Resolution Landscape Image with Darkened Vignette */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: place.imageUrl }} style={styles.placeImage} />
        <View style={styles.imageOverlay} />

        {/* Top Badges: Category & Like Bookmark */}
        <View style={styles.topRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{place.category}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsLiked(!isLiked)}
            style={styles.heartCircle}
          >
            <HeartIcon size={16} color="#EF4444" filled={isLiked} />
          </TouchableOpacity>
        </View>

        {/* Bottom Image Stats (Rating & Reviews) */}
        <View style={styles.ratingTag}>
          <StarIcon size={13} color="#F59E0B" />
          <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCountText}>({place.reviewCount})</Text>
        </View>
      </View>

      {/* Place Details Body */}
      <View style={styles.contentContainer}>
        {/* Title and Urdu script */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {place.title}
          </Text>
        </View>
        <Text style={styles.urduTitle}>{place.urduTitle}</Text>

        {/* Location & Distance */}
        <View style={styles.locationRow}>
          <LocationPinIcon size={13} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {place.location} • {place.distanceFromCorridor}
          </Text>
        </View>

        {/* Description Snippet */}
        <Text style={styles.description} numberOfLines={2}>
          {place.description}
        </Text>

        {/* Explore CTA Bar */}
        <View style={styles.exploreBar}>
          <Text style={styles.exploreText}>View Sightseeing Guide</Text>
          <ArrowForwardIcon size={14} color={colors.primary} />
        </View>
      </View>
    </ScalePressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 270,
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
    height: 160,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  placeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.28)',
  },
  topRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.3,
  },
  heartCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  ratingTag: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  reviewCountText: {
    ...typography.caption,
    fontSize: 10,
    color: '#94A3B8',
  },
  contentContainer: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.bodyLarge,
    fontWeight: '800',
    color: colors.dark,
    fontSize: 15,
  },
  urduTitle: {
    ...typography.caption,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.xs,
  },
  locationText: {
    ...typography.caption,
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    flex: 1,
  },
  description: {
    ...typography.caption,
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  exploreBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  exploreText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
});
