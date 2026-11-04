import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  BedIcon,
  UserIcon,
  NonSmokingIcon,
  CheckIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { ScalePressable, FadeInUp } from '../../components/animations';

export interface RoomItem {
  id: string;
  name: string;
  image: any;
  roomsCount: string;
  guestsCount: string;
  isNonSmoking: boolean;
  pricePerNight: number;
  currency: string;
  size: string;
  bedType: string;
  view: string;
  amenities: string[];
}

const ROOM_DATA: RoomItem[] = [
  {
    id: 'room-1',
    name: 'Deluxe Double Bed With Balcony',
    image: require('../../assets/images/room_deluxe.jpg'),
    roomsCount: '01 Room',
    guestsCount: '02 Guests',
    isNonSmoking: true,
    pricePerNight: 85,
    currency: '$',
    size: '42 sq.m',
    bedType: '1 Extra-Large Double Bed',
    view: 'Private Balcony with Scenic Sunset View',
    amenities: [
      'Complimentary High-Speed WiFi',
      'Flat-Screen Smart TV with Netflix',
      'Air Conditioning & Climate Control',
      'En-Suite Marble Bathroom with Rainfall Shower',
      'Daily Housekeeping & Fresh Linens',
      'Complimentary Bottled Water & Tea Maker',
    ],
  },
  {
    id: 'room-2',
    name: 'Executive Suite With Balcony',
    image: require('../../assets/images/room_deluxe.jpg'),
    roomsCount: '01 Room',
    guestsCount: '02 Guests',
    isNonSmoking: true,
    pricePerNight: 115,
    currency: '$',
    size: '56 sq.m',
    bedType: '1 King Bed + Lounge Sofa',
    view: 'Panoramic Horizon & Mountain View',
    amenities: [
      'Executive Lounge Access & Refreshments',
      'Private Jacuzzi Tub in Bathroom',
      'High-Speed 5G WiFi & Work Desk',
      'Free Daily Continental Breakfast',
      '24/7 Priority Room Service',
      'Premium Sound System & Smart Lighting',
    ],
  },
  {
    id: 'room-3',
    name: 'Presidential Family Villa Suite',
    image: require('../../assets/images/room_deluxe.jpg'),
    roomsCount: '02 Rooms',
    guestsCount: '04 Guests',
    isNonSmoking: true,
    pricePerNight: 175,
    currency: '$',
    size: '88 sq.m',
    bedType: '2 King Beds + Dining Area',
    view: '360° Scenic Nature & Garden View',
    amenities: [
      'Private Heated Plunge Pool Access',
      'Dedicated 24/7 Butler Service',
      'Full Kitchenette with Espresso Machine',
      'Luxury Designer Toiletries',
      'Free Airport / Station Pick & Drop',
      'Complimentary All-Inclusive Breakfast & Dinner',
    ],
  },
];

interface SelectRoomScreenProps {
  hotelName?: string;
  onBack: () => void;
  onSelectRoom?: (room: RoomItem) => void;
}

export const SelectRoomScreen: React.FC<SelectRoomScreenProps> = ({
  hotelName = 'Hotel Niribili',
  onBack,
  onSelectRoom,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedRoomModal, setSelectedRoomModal] = useState<RoomItem | null>(null);
  const [confirmedRoom, setConfirmedRoom] = useState<RoomItem | null>(null);

  const handleSelectRoom = (room: RoomItem) => {
    setConfirmedRoom(room);
    Alert.alert(
      'Room Selected 🎉',
      `You selected "${room.name}" at ${hotelName} for ${room.currency}${room.pricePerNight}/night. Proceed to confirmation?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Reservation',
          onPress: () => {
            if (onSelectRoom) {
              onSelectRoom(room);
            } else {
              Alert.alert('Booking Confirmed!', 'Your room reservation has been reserved successfully.');
              onBack();
            }
          },
        },
      ],
    );
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
        <Text style={styles.headerTitle}>Select Room</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Room Cards List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36 },
        ]}
      >
        <Text style={styles.hotelSubtitle}>Available accommodations at {hotelName}</Text>

        {ROOM_DATA.map((room, index) => (
          <FadeInUp key={room.id} delay={index * 100}>
            <View style={styles.roomCard}>
              {/* Room Image */}
              <View style={styles.imageContainer}>
                <Image source={room.image} style={styles.roomImage} resizeMode="cover" />
              </View>

              {/* Room Body */}
              <View style={styles.cardBody}>
                <Text style={styles.roomTitle}>{room.name}</Text>

                {/* Features & Price Row */}
                <View style={styles.featuresAndPriceRow}>
                  {/* Features Left Column */}
                  <View style={styles.featuresColumn}>
                    <View style={styles.featureItem}>
                      <BedIcon size={16} color={colors.primary} />
                      <Text style={styles.featureText}>{room.roomsCount}</Text>
                    </View>

                    <View style={styles.featureItem}>
                      <UserIcon size={16} color={colors.primary} />
                      <Text style={styles.featureText}>{room.guestsCount}</Text>
                    </View>

                    {room.isNonSmoking && (
                      <View style={styles.featureItem}>
                        <NonSmokingIcon size={16} color={colors.primary} />
                        <Text style={styles.featureText}>Non-Smoking Room</Text>
                      </View>
                    )}
                  </View>

                  {/* Price Right Column */}
                  <View style={styles.priceColumn}>
                    <Text style={styles.priceAmount}>
                      {room.currency}
                      {room.pricePerNight}
                    </Text>
                    <Text style={styles.pricePeriod}>(For 01 Night/Room)</Text>
                  </View>
                </View>

                {/* Action Row */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setSelectedRoomModal(room)}
                    style={styles.viewMoreButton}
                  >
                    <Text style={styles.viewMoreText}>View More Details &gt;</Text>
                  </TouchableOpacity>

                  <Button
                    title="Select Room"
                    onPress={() => handleSelectRoom(room)}
                    variant="primary"
                    size="small"
                    style={styles.selectButton}
                    textStyle={styles.selectButtonText}
                  />
                </View>
              </View>
            </View>
          </FadeInUp>
        ))}
      </ScrollView>

      {/* Room Details Modal */}
      <Modal
        visible={!!selectedRoomModal}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedRoomModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalSheet,
              { paddingBottom: insets.bottom > 0 ? insets.bottom + 16 : 24 },
            ]}
          >
            {selectedRoomModal && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedRoomModal.name}</Text>
                  <TouchableOpacity
                    onPress={() => setSelectedRoomModal(null)}
                    style={styles.modalCloseBtn}
                  >
                    <Text style={styles.modalCloseText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
                  <Image
                    source={selectedRoomModal.image}
                    style={styles.modalHeroImage}
                    resizeMode="cover"
                  />

                  <View style={styles.modalPriceBadge}>
                    <Text style={styles.modalPriceNumber}>
                      {selectedRoomModal.currency}
                      {selectedRoomModal.pricePerNight}
                    </Text>
                    <Text style={styles.modalPricePer}> / night (Includes taxes & fees)</Text>
                  </View>

                  <View style={styles.modalSpecGrid}>
                    <View style={styles.modalSpecItem}>
                      <Text style={styles.modalSpecLabel}>Room Area</Text>
                      <Text style={styles.modalSpecValue}>{selectedRoomModal.size}</Text>
                    </View>
                    <View style={styles.modalSpecItem}>
                      <Text style={styles.modalSpecLabel}>Bed Arrangement</Text>
                      <Text style={styles.modalSpecValue}>{selectedRoomModal.bedType}</Text>
                    </View>
                    <View style={styles.modalSpecItem}>
                      <Text style={styles.modalSpecLabel}>View</Text>
                      <Text style={styles.modalSpecValue}>{selectedRoomModal.view}</Text>
                    </View>
                  </View>

                  <Text style={styles.modalAmenitiesHeading}>Included Amenities</Text>
                  {selectedRoomModal.amenities.map((amenity, idx) => (
                    <View key={idx} style={styles.amenityRow}>
                      <CheckIcon size={16} color={colors.primary} />
                      <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.modalFooter}>
                  <Button
                    title="Select This Room"
                    onPress={() => {
                      const r = selectedRoomModal;
                      setSelectedRoomModal(null);
                      handleSelectRoom(r);
                    }}
                    variant="primary"
                    style={{ borderRadius: 14, height: 50 }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  hotelSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  roomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.md,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageContainer: {
    width: '100%',
    height: 170,
    backgroundColor: '#E2E8F0',
  },
  roomImage: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: spacing.md,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.sm,
  },
  featuresAndPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featuresColumn: {
    flex: 1,
    gap: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  priceColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: spacing.sm,
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  viewMoreButton: {
    paddingVertical: 6,
  },
  viewMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  selectButton: {
    backgroundColor: colors.primary, // #F65D3A
    borderRadius: 12,
    paddingHorizontal: 22,
    height: 42,
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '700',
  },
  modalHeroImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: spacing.md,
  },
  modalPriceBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  modalPriceNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  modalPricePer: {
    fontSize: 13,
    color: '#64748B',
  },
  modalSpecGrid: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: spacing.md,
    gap: 8,
    marginBottom: spacing.md,
  },
  modalSpecItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalSpecLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  modalSpecValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalAmenitiesHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.sm,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  amenityText: {
    fontSize: 13,
    color: '#475569',
  },
  modalFooter: {
    marginTop: spacing.md,
  },
});

