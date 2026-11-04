import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  SearchIcon,
  HotelIcon,
  FlightIcon,
  BusIcon,
  BoatIcon,
  StarIcon,
  LocationPinIcon,
  BookmarkIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { FadeInUp } from '../../components/animations';

export type ServiceTab = 'hotel' | 'flight' | 'bus' | 'boat';

export interface ServiceItem {
  id: string;
  name: string;
  image: any;
  rating: number;
  location: string;
  pricePerNight: number;
  currency: string;
  isBookmarked?: boolean;
}

const SERVICE_HOTELS: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Holy Park Hotel',
    image: require('../../assets/images/hotel_thumb_1.jpg'),
    rating: 4.8,
    location: 'Sukkur, Sindh',
    pricePerNight: 89,
    currency: '$',
    isBookmarked: true,
  },
  {
    id: 'srv-2',
    name: 'Dream Valley Resort',
    image: require('../../assets/images/hotel_thumb_2.jpg'),
    rating: 4.8,
    location: 'Lahore, Punjab',
    pricePerNight: 89,
    currency: '$',
    isBookmarked: false,
  },
  {
    id: 'srv-3',
    name: 'Esha Boutique Hotel',
    image: require('../../assets/images/hotel_thumb_3.jpg'),
    rating: 4.8,
    location: 'Islamabad Capital',
    pricePerNight: 89,
    currency: '$',
    isBookmarked: false,
  },
  {
    id: 'srv-4',
    name: 'Hotel Niribili',
    image: require('../../assets/images/hotel_thumb_4.jpg'),
    rating: 4.8,
    location: 'Hunza Valley, GB',
    pricePerNight: 89,
    currency: '$',
    isBookmarked: false,
  },
  {
    id: 'srv-5',
    name: 'Luxury Beach & Alpine Resort',
    image: require('../../assets/images/hotel_details_hero.jpg'),
    rating: 4.8,
    location: 'Skardu, Gilgit-Baltistan',
    pricePerNight: 89,
    currency: '$',
    isBookmarked: false,
  },
];

interface ServicesScreenProps {
  onBack: () => void;
  onSelectServiceItem: (item: ServiceItem) => void;
  onBookBus?: () => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onBack,
  onSelectServiceItem,
  onBookBus,
}) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ServiceTab>('hotel');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ServiceItem[]>(SERVICE_HOTELS);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter(
      i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery]);

  const toggleBookmark = (id: string) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, isBookmarked: !i.isBookmarked } : i)),
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
        <Text style={styles.headerTitle}>Services</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Service Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('hotel')}
          style={[styles.tabPill, activeTab === 'hotel' && styles.tabPillActive]}
        >
          <HotelIcon size={16} color={activeTab === 'hotel' ? '#FFFFFF' : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'hotel' && styles.tabTextActive]}>
            Hotel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('flight')}
          style={[styles.tabPill, activeTab === 'flight' && styles.tabPillActive]}
        >
          <FlightIcon size={16} color={activeTab === 'flight' ? '#FFFFFF' : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'flight' && styles.tabTextActive]}>
            Flight
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setActiveTab('bus');
            if (onBookBus) onBookBus();
          }}
          style={[styles.tabPill, activeTab === 'bus' && styles.tabPillActive]}
        >
          <BusIcon size={16} color={activeTab === 'bus' ? '#FFFFFF' : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'bus' && styles.tabTextActive]}>
            Bus
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('boat')}
          style={[styles.tabPill, activeTab === 'boat' && styles.tabPillActive]}
        >
          <BoatIcon size={16} color={activeTab === 'boat' ? '#FFFFFF' : colors.primary} />
          <Text style={[styles.tabText, activeTab === 'boat' && styles.tabTextActive]}>
            Boat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <SearchIcon size={18} color="#94A3B8" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search any ${activeTab}s...`}
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36 },
        ]}
      >
        {filteredItems.map((item, index) => (
          <FadeInUp key={item.id} delay={index * 60}>
            <TouchableOpacity
              activeOpacity={0.92}
              onPress={() => onSelectServiceItem(item)}
              style={styles.card}
            >
              {/* Left Thumbnail */}
              <View style={styles.thumbWrapper}>
                <Image source={item.image} style={styles.thumbImage} resizeMode="cover" />
              </View>

              {/* Right Content */}
              <View style={styles.cardInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.cardName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleBookmark(item.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
                  <StarIcon size={13} color="#F59E0B" />
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>

                {/* Location */}
                <View style={styles.locationRow}>
                  <LocationPinIcon size={12} color="#94A3B8" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {item.location}
                  </Text>
                </View>

                {/* Bottom Row */}
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
                    onPress={() => onSelectServiceItem(item)}
                    variant="primary"
                    size="small"
                    style={styles.bookBtn}
                    textStyle={styles.bookBtnText}
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
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: 8,
  },
  tabPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  tabPillActive: {
    backgroundColor: colors.primary, // #F65D3A
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  searchBarWrapper: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
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
  cardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 6,
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  bookBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 32,
  },
  bookBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

