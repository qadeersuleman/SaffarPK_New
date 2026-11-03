import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { FamousPlace } from '../../types';
import {
  StarIcon,
  LocationPinIcon,
  HeartIcon,
  ArrowBackIcon,
  ClockIcon,
  CompassIcon,
  CheckIcon,
} from '../icons/AppIcons';
import { Button } from '../buttons/Button';
import { ScalePressable } from '../animations';

interface PlaceDetailModalProps {
  visible: boolean;
  place: FamousPlace | null;
  onClose: () => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  visible,
  place,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [isSaved, setIsSaved] = useState(false);

  if (!place) return null;

  const handleSaveToBucketList = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      !isSaved ? 'Added to Saved Places ❤️' : 'Removed from Saved Places',
      !isSaved
        ? `${place.title} has been added to your travel bucket list.`
        : `${place.title} was removed.`
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Navigation Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ArrowBackIcon size={22} color={colors.dark} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginHorizontal: spacing.sm }}>
            <Text style={styles.topBarTitle} numberOfLines={1}>
              {place.title}
            </Text>
            <Text style={styles.topBarSub}>{place.location}</Text>
          </View>
          <TouchableOpacity
            onPress={handleSaveToBucketList}
            style={styles.heartButton}
          >
            <HeartIcon size={20} color="#EF4444" filled={isSaved} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}
        >
          {/* Scenic Hero Photography Banner */}
          <View style={styles.bannerContainer}>
            <Image source={{ uri: place.imageUrl }} style={styles.bannerImage} />
            <View style={styles.bannerOverlay} />

            {/* Category Tag & Rating Overlay */}
            <View style={styles.bannerTopBadge}>
              <Text style={styles.bannerTopText}>{place.category}</Text>
            </View>

            <View style={styles.bannerBottomRow}>
              <View style={styles.ratingBadge}>
                <StarIcon size={14} color="#F59E0B" />
                <Text style={styles.ratingScore}>{place.rating.toFixed(1)}</Text>
                <Text style={styles.ratingCount}>({place.reviewCount} traveler reviews)</Text>
              </View>
            </View>
          </View>

          {/* Place Title & Urdu Script Section */}
          <View style={styles.contentPadding}>
            <Text style={styles.placeHeading}>{place.title}</Text>
            <Text style={styles.urduHeading}>{place.urduTitle}</Text>

            {/* Distance & Location Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <LocationPinIcon size={18} color={colors.primary} />
                <View style={{ flex: 1, marginLeft: spacing.xs }}>
                  <Text style={styles.infoTitle}>Location & Accessibility</Text>
                  <Text style={styles.infoSub}>
                    {place.location} • {place.distanceFromCorridor}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.infoRow}>
                <ClockIcon size={18} color="#0284C7" />
                <View style={{ flex: 1, marginLeft: spacing.xs }}>
                  <Text style={styles.infoTitle}>Best Time to Visit</Text>
                  <Text style={styles.infoSub}>{place.bestTimeToVisit}</Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.sectionTitle}>Overview & Historical Heritage</Text>
            <Text style={styles.descriptionText}>{place.description}</Text>

            {/* Highlights List */}
            <Text style={styles.sectionTitle}>Experience Highlights</Text>
            <View style={styles.highlightsContainer}>
              {place.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightRow}>
                  <View style={styles.highlightIcon}>
                    <CheckIcon size={14} color="#FFFFFF" />
                  </View>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Bottom CTA Bar */}
        <View
          style={[
            styles.bottomBar,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : spacing.md },
          ]}
        >
          <ScalePressable
            activeScale={0.96}
            onPress={handleSaveToBucketList}
            style={[styles.saveActionBtn, isSaved ? styles.saveActionBtnActive : null]}
          >
            <HeartIcon size={18} color={isSaved ? '#EF4444' : '#64748B'} filled={isSaved} />
            <Text
              style={[
                styles.saveActionText,
                isSaved ? { color: '#EF4444' } : null,
              ]}
            >
              {isSaved ? 'Saved to Trips' : 'Add to Wishlist'}
            </Text>
          </ScalePressable>

          <Button
            title="Get Directions"
            onPress={() => {
              Alert.alert(
                'Highway Navigation',
                `Directions to ${place.title} from the nearest SaffarPK terminal (${place.distanceFromCorridor}) have been sent to your map.`
              );
            }}
            size="large"
            style={styles.navigateButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    ...typography.bodyLarge,
    fontWeight: '800',
    color: colors.dark,
    fontSize: 16,
  },
  topBarSub: {
    ...typography.caption,
    fontSize: 11,
    color: '#64748B',
  },
  heartButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.32)',
  },
  bannerTopBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  bannerTopText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.5,
  },
  bannerBottomRow: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ratingScore: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  ratingCount: {
    ...typography.caption,
    fontSize: 11,
    color: '#94A3B8',
  },
  contentPadding: {
    padding: spacing.lg,
  },
  placeHeading: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: '900',
    color: colors.dark,
  },
  urduHeading: {
    ...typography.caption,
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    ...typography.bodyMedium,
    fontSize: 13,
    fontWeight: '700',
    color: colors.dark,
  },
  infoSub: {
    ...typography.caption,
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    ...typography.bodyLarge,
    fontSize: 16,
    fontWeight: '900',
    color: colors.dark,
    marginBottom: spacing.xs,
  },
  descriptionText: {
    ...typography.bodyMedium,
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  highlightsContainer: {
    gap: 10,
    marginBottom: spacing.md,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  highlightIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  highlightText: {
    ...typography.caption,
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    gap: 12,
    ...shadows.lg,
  },
  saveActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  saveActionBtnActive: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  saveActionText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  navigateButton: {
    flex: 1,
  },
});
