import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  MountainIcon,
  BeachIcon,
  LakeIcon,
  CampIcon,
  HotelIcon,
  FlightIcon,
  BusIcon,
  BoatIcon,
  LocationPinIcon,
  StarIcon,
} from '../../components/icons/AppIcons';
import { FadeInUp } from '../../components/animations';

export interface CategoryGridItem {
  id: string;
  name: string;
  icon: (color: string) => React.ReactNode;
}

const ALL_CATEGORIES: CategoryGridItem[] = [
  { id: 'cat-1', name: 'Mountains', icon: color => <MountainIcon size={24} color={color} /> },
  { id: 'cat-2', name: 'Beach', icon: color => <BeachIcon size={24} color={color} /> },
  { id: 'cat-3', name: 'Lakes', icon: color => <LakeIcon size={24} color={color} /> },
  { id: 'cat-4', name: 'Camp', icon: color => <CampIcon size={24} color={color} /> },
  { id: 'cat-5', name: 'Camp', icon: color => <CampIcon size={24} color={color} /> },
  { id: 'cat-6', name: 'Mountains', icon: color => <MountainIcon size={24} color={color} /> },
  { id: 'cat-7', name: 'Beach', icon: color => <BeachIcon size={24} color={color} /> },
  { id: 'cat-8', name: 'Lakes', icon: color => <LakeIcon size={24} color={color} /> },
  { id: 'cat-9', name: 'Lakes', icon: color => <LakeIcon size={24} color={color} /> },
  { id: 'cat-10', name: 'Camp', icon: color => <CampIcon size={24} color={color} /> },
  { id: 'cat-11', name: 'Mountains', icon: color => <MountainIcon size={24} color={color} /> },
  { id: 'cat-12', name: 'Beach', icon: color => <BeachIcon size={24} color={color} /> },
  { id: 'cat-13', name: 'Beach', icon: color => <BeachIcon size={24} color={color} /> },
  { id: 'cat-14', name: 'Lakes', icon: color => <LakeIcon size={24} color={color} /> },
  { id: 'cat-15', name: 'Camp', icon: color => <CampIcon size={24} color={color} /> },
  { id: 'cat-16', name: 'Mountains', icon: color => <MountainIcon size={24} color={color} /> },
  { id: 'cat-17', name: 'Mountains', icon: color => <MountainIcon size={24} color={color} /> },
  { id: 'cat-18', name: 'Beach', icon: color => <BeachIcon size={24} color={color} /> },
  { id: 'cat-19', name: 'Lakes', icon: color => <LakeIcon size={24} color={color} /> },
  { id: 'cat-20', name: 'Camp', icon: color => <CampIcon size={24} color={color} /> },
  { id: 'cat-21', name: 'Camp', icon: color => <CampIcon size={24} color={color} /> },
  { id: 'cat-22', name: 'Mountains', icon: color => <MountainIcon size={24} color={color} /> },
  { id: 'cat-23', name: 'Beach', icon: color => <BeachIcon size={24} color={color} /> },
  { id: 'cat-24', name: 'Lakes', icon: color => <LakeIcon size={24} color={color} /> },
];

interface CategoriesScreenProps {
  onBack: () => void;
  onSelectCategory?: (category: CategoryGridItem) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onBack,
  onSelectCategory,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedCatId, setSelectedCatId] = useState<string>('cat-1');

  const handlePress = (item: CategoryGridItem) => {
    setSelectedCatId(item.id);
    if (onSelectCategory) {
      onSelectCategory(item);
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
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36 },
        ]}
      >
        {/* 4-column Grid */}
        <View style={styles.gridContainer}>
          {ALL_CATEGORIES.map((item, index) => {
            const isSelected = selectedCatId === item.id;
            return (
              <FadeInUp key={item.id} delay={index * 25}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handlePress(item)}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.categoryCardSelected,
                  ]}
                >
                  {item.icon(colors.primary)}
                  <Text
                    style={[
                      styles.categoryName,
                      isSelected && styles.categoryNameSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </FadeInUp>
            );
          })}
        </View>
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  categoryCard: {
    width: '23.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  categoryCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFF7ED',
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    marginTop: 6,
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});

