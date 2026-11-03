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
import { Hotel, HotelRoom } from '../../types';
import {
  StarIcon,
  LocationPinIcon,
  WifiIcon,
  CoffeeIcon,
  AcIcon,
  ShieldIcon,
  CheckIcon,
  ArrowBackIcon,
} from '../icons/AppIcons';
import { Button } from '../buttons/Button';
import { ScalePressable } from '../animations';
import { Badge } from '../common/Badge';

interface HotelDetailModalProps {
  visible: boolean;
  hotel: Hotel | null;
  onClose: () => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({
  visible,
  hotel,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBooked, setIsBooked] = useState(false);

  if (!hotel) return null;

  const currentRoom = selectedRoom || hotel.roomTypes[0];
  const images = hotel.galleryUrls && hotel.galleryUrls.length > 0 ? hotel.galleryUrls : [hotel.imageUrl];

  const handleBookRoom = () => {
    setIsBooked(true);
    Alert.alert(
      'Reservation Confirmed! 🎉',
      `Your room at ${hotel.name} (${currentRoom.name}) has been reserved for PKR ${currentRoom.pricePerNight.toLocaleString()} / night.\n\nCheck-in details and digital room key instructions have been saved to your SaffarPK profile.`,
      [
        {
          text: 'Great, Thanks!',
          onPress: () => {
            setIsBooked(false);
            onClose();
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Top Header Navigation */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ArrowBackIcon size={22} color={colors.dark} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginHorizontal: spacing.sm }}>
            <Text style={styles.topBarTitle} numberOfLines={1}>
              {hotel.name}
            </Text>
            <Text style={styles.topBarSub}>
              {hotel.city} • {hotel.starRating}★ Hotel
            </Text>
          </View>
          <View style={styles.verifiedBadge}>
            <ShieldIcon size={14} color="#16A34A" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        >
          {/* Main Gallery Banner */}
          <View style={styles.galleryWrapper}>
            <Image
              source={{ uri: images[activeImageIndex] || hotel.imageUrl }}
              style={styles.mainGalleryImage}
            />
            {hotel.badge && (
              <View style={styles.promoTag}>
                <Text style={styles.promoTagText}>{hotel.badge}</Text>
              </View>
            )}

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <View style={styles.thumbnailsRow}>
                {images.map((img, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setActiveImageIndex(idx)}
                    style={[
                      styles.thumbContainer,
                      activeImageIndex === idx && styles.thumbActive,
                    ]}
                  >
                    <Image source={{ uri: img }} style={styles.thumbImage} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Hotel Name & Ratings Block */}
          <View style={styles.sectionPadding}>
            <View style={styles.titleRatingRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.hotelHeading}>{hotel.name}</Text>
                <View style={styles.starsRow}>
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <StarIcon key={i} size={15} color="#F59E0B" />
                  ))}
                  <Text style={styles.starText}>{hotel.starRating}-Star Hotel</Text>
                </View>
              </View>

              {/* Booking.com Rating Badge */}
              <View style={styles.scoreBox}>
                <Text style={styles.scoreNum}>{hotel.reviewScore.toFixed(1)}</Text>
                <Text style={styles.scoreDesc}>{hotel.reviewDescriptor}</Text>
                <Text style={styles.scoreCount}>{hotel.reviewCount} reviews</Text>
              </View>
            </View>

            {/* Address & Highway Distance */}
            <View style={styles.locationBanner}>
              <LocationPinIcon size={18} color={colors.primary} />
              <View style={{ flex: 1, marginLeft: spacing.xs }}>
                <Text style={styles.locationTitle}>{hotel.address}</Text>
                <Text style={styles.locationSub}>{hotel.distanceFromTerminal}</Text>
              </View>
            </View>

            {/* Highlights Bar */}
            <View style={styles.highlightsGrid}>
              <View style={styles.highlightPill}>
                <CheckIcon size={14} color="#16A34A" />
                <Text style={styles.highlightPillText}>Free Cancellation</Text>
              </View>
              <View style={styles.highlightPill}>
                <CheckIcon size={14} color="#16A34A" />
                <Text style={styles.highlightPillText}>Breakfast Included</Text>
              </View>
              <View style={styles.highlightPill}>
                <CheckIcon size={14} color="#16A34A" />
                <Text style={styles.highlightPillText}>Instant Confirmation</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.sectionHeader}>About This Property</Text>
            <Text style={styles.descriptionText}>{hotel.description}</Text>

            {/* Amenities Grid */}
            <Text style={styles.sectionHeader}>Popular Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {hotel.amenities.map((amenity, idx) => (
                <View key={idx} style={styles.amenityItem}>
                  <View style={styles.amenityCheck}>
                    <CheckIcon size={13} color="#FFFFFF" />
                  </View>
                  <Text style={styles.amenityName}>{amenity}</Text>
                </View>
              ))}
            </View>

            {/* Room Selection */}
            <Text style={styles.sectionHeader}>Select Your Room</Text>
            {hotel.roomTypes.map(room => {
              const isSelected = currentRoom.id === room.id;
              return (
                <ScalePressable
                  key={room.id}
                  activeScale={0.97}
                  onPress={() => setSelectedRoom(room)}
                  style={[
                    styles.roomCard,
                    isSelected ? styles.roomCardSelected : null,
                  ]}
                >
                  <View style={styles.roomHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.roomTitle}>{room.name}</Text>
                      <Text style={styles.roomBed}>{room.bedType} • Up to {room.maxGuests} Guests</Text>
                    </View>
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected ? styles.radioCircleActive : null,
                      ]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </View>

                  <View style={styles.roomFeaturesRow}>
                    {room.breakfastIncluded && (
                      <View style={styles.roomTag}>
                        <CoffeeIcon size={12} color="#16A34A" />
                        <Text style={styles.roomTagText}>Free Breakfast</Text>
                      </View>
                    )}
                    {room.freeCancellation && (
                      <View style={styles.roomTag}>
                        <ShieldIcon size={12} color="#0284C7" />
                        <Text style={[styles.roomTagText, { color: '#0284C7' }]}>
                          Free Cancellation
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.roomPriceRow}>
                    <View>
                      {room.originalPricePerNight && (
                        <Text style={styles.roomOrigPrice}>
                          PKR {room.originalPricePerNight.toLocaleString()}
                        </Text>
                      )}
                      <Text style={styles.roomPrice}>
                        PKR {room.pricePerNight.toLocaleString()}{' '}
                        <Text style={styles.roomPerNight}>/ night</Text>
                      </Text>
                    </View>
                    <Text style={styles.roomTaxes}>Taxes & charges included</Text>
                  </View>
                </ScalePressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Floating Bottom Booking Action Bar */}
        <View
          style={[
            styles.bottomBar,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : spacing.md },
          ]}
        >
          <View>
            <Text style={styles.bottomBarLabel}>1 Night, 2 Adults</Text>
            <Text style={styles.bottomBarPrice}>
              PKR {currentRoom.pricePerNight.toLocaleString()}
            </Text>
            <Text style={styles.bottomBarSub}>Instant booking on SaffarPK</Text>
          </View>

          <Button
            title="Reserve Room"
            onPress={handleBookRoom}
            size="large"
            style={styles.bookButton}
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
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  verifiedText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
  galleryWrapper: {
    width: '100%',
    height: 240,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  mainGalleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  promoTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.sm,
  },
  promoTagText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  thumbnailsRow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    gap: 6,
  },
  thumbContainer: {
    width: 48,
    height: 36,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  thumbActive: {
    borderColor: colors.primary,
    borderWidth: 2.5,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionPadding: {
    padding: spacing.lg,
  },
  titleRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  hotelHeading: {
    ...typography.h2,
    fontSize: 22,
    fontWeight: '900',
    color: colors.dark,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  starText: {
    ...typography.caption,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '700',
    marginLeft: 4,
  },
  scoreBox: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  scoreNum: {
    ...typography.bodyLarge,
    fontSize: 18,
    fontWeight: '900',
    color: '#38BDF8',
  },
  scoreDesc: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scoreCount: {
    ...typography.caption,
    fontSize: 9,
    color: '#94A3B8',
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  locationTitle: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.dark,
    fontSize: 13,
  },
  locationSub: {
    ...typography.caption,
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.lg,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  highlightPillText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  sectionHeader: {
    ...typography.bodyLarge,
    fontSize: 16,
    fontWeight: '900',
    color: colors.dark,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  descriptionText: {
    ...typography.bodyMedium,
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: spacing.lg,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    gap: 8,
    backgroundColor: '#FFFFFF',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  amenityCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityName: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  roomCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFF7ED',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roomTitle: {
    ...typography.bodyLarge,
    fontSize: 15,
    fontWeight: '800',
    color: colors.dark,
  },
  roomBed: {
    ...typography.caption,
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  roomFeaturesRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: spacing.sm,
  },
  roomTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roomTagText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  roomPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: spacing.xs,
  },
  roomOrigPrice: {
    ...typography.caption,
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  roomPrice: {
    ...typography.bodyLarge,
    fontSize: 16,
    fontWeight: '900',
    color: colors.primary,
  },
  roomPerNight: {
    ...typography.caption,
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  roomTaxes: {
    ...typography.caption,
    fontSize: 10,
    color: '#16A34A',
    fontWeight: '600',
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
    ...shadows.lg,
  },
  bottomBarLabel: {
    ...typography.caption,
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  bottomBarPrice: {
    ...typography.h3,
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  bottomBarSub: {
    ...typography.caption,
    fontSize: 10,
    color: '#16A34A',
    fontWeight: '700',
  },
  bookButton: {
    minWidth: 150,
  },
});

