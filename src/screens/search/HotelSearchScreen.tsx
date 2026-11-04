import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  LocationPinIcon,
  PencilEditIcon,
  SortFilterIcon,
  StarIcon,
  BookmarkIcon,
  SearchIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { FadeInUp, ScalePressable } from '../../components/animations';

export interface HotelSearchResultItem {
  id: string;
  name: string;
  image: any;
  rating: number;
  location: string;
  pricePerNight: number;
  currency: string;
  isBookmarked?: boolean;
}

const SEARCH_HOTELS_DATA: HotelSearchResultItem[] = [
  {
    id: 'h-1',
    name: 'Hunza Serena Inn & Terraces',
    image: {
      uri: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600&auto=format&fit=crop&q=80',
    },
    rating: 4.9,
    location: 'Hunza Valley, Gilgit-Baltistan',
    pricePerNight: 95,
    currency: '$',
    isBookmarked: true,
  },
  {
    id: 'h-2',
    name: 'Shangrila Resort & Pagodas',
    image: {
      uri: 'https://images.unsplash.com/photo-1627894006066-b4578811fa1e?w=600&auto=format&fit=crop&q=80',
    },
    rating: 4.9,
    location: 'Skardu, Gilgit-Baltistan',
    pricePerNight: 120,
    currency: '$',
    isBookmarked: false,
  },
  {
    id: 'h-3',
    name: 'Hotel One Sukkur Barrage',
    image: require('../../assets/images/hotel_thumb_2.jpg'),
    rating: 4.6,
    location: 'Sukkur, Sindh',
    pricePerNight: 45,
    currency: '$',
    isBookmarked: false,
  },
  {
    id: 'h-4',
    name: 'Pearl Continental Lahore Heritage',
    image: {
      uri: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&auto=format&fit=crop&q=80',
    },
    rating: 4.8,
    location: 'The Mall, Lahore',
    pricePerNight: 110,
    currency: '$',
    isBookmarked: false,
  },
  {
    id: 'h-5',
    name: 'Zaver Pearl Continental Gwadar',
    image: require('../../assets/images/place_beach.jpg'),
    rating: 4.7,
    location: 'Koh-e-Batil, Gwadar',
    pricePerNight: 85,
    currency: '$',
    isBookmarked: false,
  },
  {
    id: 'h-6',
    name: 'Malam Jabba Ski Resort & Spa',
    image: require('../../assets/images/hotel_thumb_3.jpg'),
    rating: 4.7,
    location: 'Swat Valley, KP',
    pricePerNight: 75,
    currency: '$',
    isBookmarked: false,
  },
];

type SortOption = 'price_asc' | 'price_desc' | 'rating' | 'popular';

interface HotelSearchScreenProps {
  initialLocation?: string;
  initialDates?: string;
  initialGuests?: string;
  onBack: () => void;
  onSelectHotel: (hotel: HotelSearchResultItem) => void;
}

export const HotelSearchScreen: React.FC<HotelSearchScreenProps> = ({
  initialLocation = 'Dhaka, Bangladesh',
  initialDates = '25 July to 27 July',
  initialGuests = '02 Guests | 01 Room',
  onBack,
  onSelectHotel,
}) => {
  const insets = useSafeAreaInsets();
  const [hotels, setHotels] = useState<HotelSearchResultItem[]>(SEARCH_HOTELS_DATA);
  const [searchLocation, setSearchLocation] = useState(initialLocation);
  const [sortBy, setSortBy] = useState<SortOption>('price_asc');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editInput, setEditInput] = useState(initialLocation);

  const sortedHotels = useMemo(() => {
    const list = [...hotels];
    if (sortBy === 'price_asc') {
      return list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    }
    if (sortBy === 'price_desc') {
      return list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [hotels, sortBy]);

  const toggleBookmark = (id: string) => {
    setHotels(prev =>
      prev.map(h => (h.id === id ? { ...h, isBookmarked: !h.isBookmarked } : h)),
    );
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'price_asc':
        return 'Price (Low to High)';
      case 'price_desc':
        return 'Price (High to Low)';
      case 'rating':
        return 'Top Rated ★';
      default:
        return 'Recommended';
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
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36 },
        ]}
      >
        {/* Search Query Summary Box (Figma top card) */}
        <View style={styles.searchSummaryCard}>
          <View style={styles.summaryInfo}>
            <View style={styles.summaryTitleRow}>
              <LocationPinIcon size={16} color={colors.primary} />
              <Text style={styles.summaryLocation}>{searchLocation}</Text>
            </View>
            <Text style={styles.summaryDetails}>
              {initialDates} | {initialGuests}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setEditInput(searchLocation);
              setShowEditModal(true);
            }}
            style={styles.editButton}
          >
            <PencilEditIcon size={14} color={colors.primary} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Filter & Sort Bar */}
        <View style={styles.filterBar}>
          <View style={styles.sortByLeft}>
            <SortFilterIcon size={18} color="#111827" />
            <Text style={styles.sortByText}>Sort By</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowSortModal(true)}
            style={styles.sortOptionSelector}
          >
            <Text style={styles.sortOptionActiveText}>{getSortLabel()}</Text>
            <Text style={styles.sortCaret}> ▾</Text>
          </TouchableOpacity>
        </View>

        {/* Hotel Cards List */}
        {sortedHotels.map((item, index) => (
          <FadeInUp key={item.id} delay={index * 80}>
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={() => onSelectHotel(item)}
              style={styles.hotelCard}
            >
              {/* Left Thumbnail */}
              <View style={styles.thumbWrapper}>
                <Image source={item.image} style={styles.thumbImage} resizeMode="cover" />
              </View>

              {/* Right Content */}
              <View style={styles.hotelInfo}>
                {/* Name & Bookmark */}
                <View style={styles.nameRow}>
                  <Text style={styles.hotelName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => toggleBookmark(item.id)}
                    style={styles.cardBookmark}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <BookmarkIcon
                      size={18}
                      color={item.isBookmarked ? colors.primary : '#CBD5E1'}
                      filled={item.isBookmarked}
                    />
                  </TouchableOpacity>
                </View>

                {/* Rating */}
                <View style={styles.ratingRow}>
                  <StarIcon size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>

                {/* Location */}
                <View style={styles.locationRow}>
                  <LocationPinIcon size={12} color="#94A3B8" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {item.location}
                  </Text>
                </View>

                {/* Price & Book Now Row */}
                <View style={styles.cardBottomRow}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceAmount}>
                      {item.currency}
                      {item.pricePerNight}
                    </Text>
                    <Text style={styles.pricePer}> /Room/Night</Text>
                  </View>

                  <Button
                    title="Book Now"
                    onPress={() => onSelectHotel(item)}
                    variant="primary"
                    size="small"
                    style={styles.bookNowBtn}
                    textStyle={styles.bookNowBtnText}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </FadeInUp>
        ))}
      </ScrollView>

      {/* Sort Options Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
          style={styles.modalBackdrop}
        >
          <View style={styles.sortModalBox}>
            <Text style={styles.sortModalTitle}>Sort Hotels By</Text>
            {[
              { id: 'price_asc' as SortOption, label: 'Price (Low to High)' },
              { id: 'price_desc' as SortOption, label: 'Price (High to Low)' },
              { id: 'rating' as SortOption, label: 'Highest Guest Rating' },
              { id: 'popular' as SortOption, label: 'Most Popular' },
            ].map(opt => (
              <TouchableOpacity
                key={opt.id}
                onPress={() => {
                  setSortBy(opt.id);
                  setShowSortModal(false);
                }}
                style={[
                  styles.sortOptionRow,
                  sortBy === opt.id && styles.sortOptionRowActive,
                ]}
              >
                <Text
                  style={[
                    styles.sortOptionLabel,
                    sortBy === opt.id && styles.sortOptionLabelActive,
                  ]}
                >
                  {opt.label}
                </Text>
                {sortBy === opt.id && <Text style={{ color: colors.primary }}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Edit Search Query Modal */}
      <Modal
        visible={showEditModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.editModalBox}>
            <Text style={styles.sortModalTitle}>Edit Search Location</Text>
            <View style={styles.editInputWrapper}>
              <SearchIcon size={18} color="#94A3B8" />
              <TextInput
                value={editInput}
                onChangeText={setEditInput}
                placeholder="Enter city or hotel name"
                placeholderTextColor="#94A3B8"
                style={styles.editTextInput}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setShowEditModal(false)}
                style={{ flex: 1, borderRadius: 12 }}
              />
              <Button
                title="Update Search"
                variant="primary"
                onPress={() => {
                  if (editInput.trim()) {
                    setSearchLocation(editInput.trim());
                  }
                  setShowEditModal(false);
                }}
                style={{ flex: 1, borderRadius: 12 }}
              />
            </View>
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
  searchSummaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  summaryLocation: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  summaryDetails: {
    fontSize: 12,
    color: '#64748B',
    paddingLeft: 22,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: 4,
  },
  sortByLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortByText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  sortOptionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortOptionActiveText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary, // #F65D3A
  },
  sortCaret: {
    fontSize: 14,
    color: colors.primary,
  },
  hotelCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.sm + 2,
    marginBottom: spacing.md,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  thumbWrapper: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  hotelInfo: {
    flex: 1,
    paddingLeft: spacing.md,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotelName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  cardBookmark: {
    padding: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  pricePer: {
    fontSize: 10,
    color: '#64748B',
  },
  bookNowBtn: {
    backgroundColor: colors.primary, // #F65D3A
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 32,
  },
  bookNowBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Modals
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  sortModalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.lg,
  },
  sortModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: spacing.md,
  },
  sortOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  sortOptionRowActive: {
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  sortOptionLabel: {
    fontSize: 14,
    color: '#475569',
  },
  sortOptionLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  editModalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.lg,
  },
  editInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  editTextInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
});

