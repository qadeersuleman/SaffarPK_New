import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  LocationPinIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
  UserIcon,
  BedIcon,
  ChevronDownIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { ScalePressable } from '../../components/animations';

export const PAKISTAN_POPULAR_DESTINATIONS = [
  { id: 'p-1', name: 'Hunza Valley', region: 'Gilgit-Baltistan' },
  { id: 'p-2', name: 'Sukkur & Indus River', region: 'Sindh' },
  { id: 'p-3', name: 'Skardu & Shangrila', region: 'Gilgit-Baltistan' },
  { id: 'p-4', name: 'Gwadar & Hammerhead Beach', region: 'Balochistan' },
  { id: 'p-5', name: 'Islamabad & Margalla Hills', region: 'Capital' },
  { id: 'p-6', name: 'Lahore & Heritage Fort', region: 'Punjab' },
  { id: 'p-7', name: 'Swat Valley & Kalam', region: 'Khyber Pakhtunkhwa' },
  { id: 'p-8', name: 'Neelum Valley', region: 'Azad Kashmir' },
];

interface SearchHotelScreenProps {
  onBack: () => void;
  onSearch: (params: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
  }) => void;
}

export const SearchHotelScreen: React.FC<SearchHotelScreenProps> = ({
  onBack,
  onSearch,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedLocation, setSelectedLocation] = useState('Hunza Valley, Gilgit-Baltistan');
  const [checkIn, setCheckIn] = useState('25 July');
  const [checkOut, setCheckOut] = useState('27 July');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showGuestsModal, setShowGuestsModal] = useState(false);

  const handleSearchPress = () => {
    onSearch({
      location: selectedLocation,
      checkIn,
      checkOut,
      guests: `${guestsCount < 10 ? '0' : ''}${guestsCount} Guests`,
      rooms: `${roomsCount < 10 ? '0' : ''}${roomsCount} Room`,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowBackIcon size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Hotel</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36 },
        ]}
      >
        {/* 1. Location Input Card */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Location</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setShowLocationModal(true)}
            style={styles.locationInputBox}
          >
            <View style={styles.locationLeftRow}>
              <LocationPinIcon size={20} color={colors.primary} />
              <Text style={styles.locationValueText} numberOfLines={1}>
                {selectedLocation}
              </Text>
            </View>
            <ChevronDownIcon size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* 2. Check In & Check Out Row */}
        <View style={styles.twoColumnRow}>
          {/* Check In */}
          <View style={styles.columnHalf}>
            <Text style={styles.fieldLabel}>Check In</Text>
            <View style={styles.dateCardBox}>
              <CheckCircleFilledIcon size={20} color={colors.primary} />
              <Text style={styles.dateCardText}>{checkIn}</Text>
            </View>
          </View>

          {/* Check Out */}
          <View style={styles.columnHalf}>
            <Text style={styles.fieldLabel}>Check Out</Text>
            <View style={styles.dateCardBox}>
              <CloseCircleFilledIcon size={20} color={colors.primary} />
              <Text style={styles.dateCardText}>{checkOut}</Text>
            </View>
          </View>
        </View>

        {/* 3. Guests & Rooms Row */}
        <View style={styles.twoColumnRow}>
          {/* Guests */}
          <View style={styles.columnHalf}>
            <Text style={styles.fieldLabel}>Guests</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowGuestsModal(true)}
              style={styles.specCardBox}
            >
              <UserIcon size={18} color={colors.primary} />
              <Text style={styles.specCardText}>
                {guestsCount < 10 ? '0' : ''}
                {guestsCount} Guests
              </Text>
            </TouchableOpacity>
          </View>

          {/* Rooms */}
          <View style={styles.columnHalf}>
            <Text style={styles.fieldLabel}>Rooms</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowGuestsModal(true)}
              style={styles.specCardBox}
            >
              <BedIcon size={18} color={colors.primary} />
              <Text style={styles.specCardText}>
                {roomsCount < 10 ? '0' : ''}
                {roomsCount} Room
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Solid Coral-Orange Search Button */}
        <View style={styles.searchButtonWrapper}>
          <Button
            title="Search"
            onPress={handleSearchPress}
            variant="primary"
            style={styles.searchButton}
            textStyle={styles.searchButtonText}
          />
        </View>
      </ScrollView>

      {/* Location Picker Modal */}
      <Modal
        visible={showLocationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalSheet,
              { paddingBottom: insets.bottom > 0 ? insets.bottom + 16 : 24 },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Destination in Pakistan</Text>
              <TouchableOpacity
                onPress={() => setShowLocationModal(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 340 }}>
              {PAKISTAN_POPULAR_DESTINATIONS.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setSelectedLocation(`${item.name}, ${item.region}`);
                    setShowLocationModal(false);
                  }}
                  style={styles.destinationItem}
                >
                  <LocationPinIcon size={18} color={colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.destName}>{item.name}</Text>
                    <Text style={styles.destRegion}>{item.region}</Text>
                  </View>
                  {selectedLocation.startsWith(item.name) && (
                    <Text style={{ color: colors.primary, fontWeight: '700' }}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Guests & Rooms Adjustment Modal */}
      <Modal
        visible={showGuestsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGuestsModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowGuestsModal(false)}
          style={styles.modalBackdrop}
        >
          <View style={styles.guestsModalCard}>
            <Text style={styles.modalTitle}>Guests & Rooms</Text>

            {/* Guests Stepper */}
            <View style={styles.stepperRow}>
              <Text style={styles.stepperLabel}>Guests</Text>
              <View style={styles.stepperControls}>
                <TouchableOpacity
                  onPress={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  style={styles.stepBtn}
                >
                  <Text style={styles.stepBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.stepValText}>{guestsCount}</Text>
                <TouchableOpacity
                  onPress={() => setGuestsCount(guestsCount + 1)}
                  style={styles.stepBtn}
                >
                  <Text style={styles.stepBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Rooms Stepper */}
            <View style={styles.stepperRow}>
              <Text style={styles.stepperLabel}>Rooms</Text>
              <View style={styles.stepperControls}>
                <TouchableOpacity
                  onPress={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                  style={styles.stepBtn}
                >
                  <Text style={styles.stepBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.stepValText}>{roomsCount}</Text>
                <TouchableOpacity
                  onPress={() => setRoomsCount(roomsCount + 1)}
                  style={styles.stepBtn}
                >
                  <Text style={styles.stepBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button
              title="Apply Selection"
              variant="primary"
              onPress={() => setShowGuestsModal(false)}
              style={{ marginTop: 16, borderRadius: 12, height: 46 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    paddingTop: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  locationInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 56,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  locationLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingRight: 8,
  },
  locationValueText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: spacing.lg,
  },
  columnHalf: {
    flex: 1,
  },
  dateCardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 54,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  dateCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  specCardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 54,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  specCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  searchButtonWrapper: {
    marginTop: spacing.xl,
  },
  searchButton: {
    backgroundColor: colors.primary, // #F65D3A
    borderRadius: 14,
    height: 52,
    ...shadows.md,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Modals
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
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
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
    fontSize: 15,
    color: '#64748B',
    fontWeight: '700',
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  destName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  destRegion: {
    fontSize: 12,
    color: '#64748B',
  },

  // Guests Stepper Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  guestsModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.lg,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  stepperLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  stepValText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    minWidth: 20,
    textAlign: 'center',
  },
});

