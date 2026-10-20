import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/buttons/Button';
import {
  BusIcon,
  StarIcon,
  AcIcon,
  PlugIcon,
  WifiIcon,
} from '../../components/icons/AppIcons';
import { RouteStop, BusSchedule } from '../../types';
import schedulesData from '../../data/schedules.json';
import busesData from '../../data/buses.json';
import { getFare, getEstimatedDurationMinutes } from '../../utils/routeUtils';

interface SearchScreenProps {
  origin: RouteStop;
  destination: RouteStop;
  travelDate: string;
  passengers: number;
  onBack: () => void;
  onSelectSchedule: (schedule: BusSchedule, calculatedFare: number) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  origin,
  destination,
  travelDate,
  passengers,
  onBack,
  onSelectSchedule,
}) => {
  const [filter, setFilter] = useState<'all' | 'Executive' | 'Standard' | 'Royal'>('all');
  const [sortBy, setSortBy] = useState<'departure' | 'fare'>('departure');

  const durationMin = getEstimatedDurationMinutes(origin.id, destination.id);

  // Map schedules with vehicle data and stop timings
  const enrichedSchedules: BusSchedule[] = (schedulesData as any[]).map(item => {
    const bus = busesData.find(b => b.id === item.busId) || (busesData[0] as any);
    const originTiming =
      item.stopTimings?.find((st: any) => st.stopId === origin.id)?.scheduledTime || item.departureTime;
    const destTiming =
      item.stopTimings?.find((st: any) => st.stopId === destination.id)?.scheduledTime || item.arrivalTime;
    const fare = getFare(origin.id, destination.id, item.busCategory);

    return {
      ...item,
      bus,
      departureTime: originTiming,
      arrivalTime: destTiming,
      baseFare: fare,
    };
  });

  const filtered = enrichedSchedules
    .filter(s => filter === 'all' || s.busCategory === filter)
    .sort((a, b) => {
      if (sortBy === 'fare') return a.baseFare - b.baseFare;
      return a.departureTime.localeCompare(b.departureTime);
    });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <Header
        title={`${origin.name} → ${destination.name}`}
        subtitle={`${travelDate} • ${passengers} Passenger(s) • ~${durationMin} mins`}
        showBack
        onBack={onBack}
      />

      {/* Filter and Sort Bar */}
      <View style={styles.filterSection}>
        <View style={styles.filterRow}>
          {(['all', 'Executive', 'Royal', 'Standard'] as const).map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFilter(cat)}
              style={[
                styles.chip,
                filter === cat ? styles.chipActive : null,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  filter === cat ? styles.chipTextActive : null,
                ]}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>SORT BY</Text>
          <TouchableOpacity
            onPress={() => setSortBy(sortBy === 'departure' ? 'fare' : 'departure')}
            style={styles.sortToggle}
          >
            <Text style={styles.sortToggleText}>
              {sortBy === 'departure' ? '🕒 Departure Time' : '💰 Lowest Fare'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Schedule List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <BusIcon size={56} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No Coaches Available</Text>
            <Text style={styles.emptySub}>
              Please check back shortly or choose another bus class.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => onSelectSchedule(item, item.baseFare)}
            style={styles.busCard}
          >
            {/* Top row: Bus photo thumbnail + name & category */}
            <View style={styles.cardTopRow}>
              <Image
                source={{
                  uri:
                    item.bus.imageUrl ||
                    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&auto=format&fit=crop&q=80',
                }}
                style={styles.busThumbnail}
              />
              <View style={styles.busInfo}>
                <View style={styles.busTitleBadgeRow}>
                  <Text style={styles.busName} numberOfLines={1}>
                    {item.busName}
                  </Text>
                  <Badge
                    label={item.busCategory}
                    variant={
                      item.busCategory === 'Royal'
                        ? 'warning'
                        : item.busCategory === 'Executive'
                        ? 'primary'
                        : 'muted'
                    }
                  />
                </View>
                <View style={styles.ratingRow}>
                  <StarIcon size={15} color="#F59E0B" />
                  <Text style={styles.ratingText}>{item.bus.rating}</Text>
                  <Text style={styles.busPlate}>• {item.bus.registrationNumber}</Text>
                </View>
              </View>
            </View>

            {/* Timing & Route Bar */}
            <View style={styles.timingSection}>
              <View style={styles.timeNode}>
                <Text style={styles.timeText}>{item.departureTime}</Text>
                <Text style={styles.stopNameText}>{origin.name}</Text>
              </View>

              <View style={styles.durationLineBox}>
                <Text style={styles.durationText}>~{durationMin} mins</Text>
                <View style={styles.arrowLine}>
                  <View style={styles.arrowDot} />
                  <View style={styles.lineH} />
                  <View style={styles.arrowHead} />
                </View>
                <Text style={styles.directText}>N-5 Express</Text>
              </View>

              <View style={[styles.timeNode, { alignItems: 'flex-end' }]}>
                <Text style={styles.timeText}>{item.arrivalTime}</Text>
                <Text style={styles.stopNameText}>{destination.name}</Text>
              </View>
            </View>

            {/* Amenities tags with SVG icons */}
            <View style={styles.amenitiesRow}>
              <View style={styles.amenityChip}>
                <AcIcon size={14} color="#0284C7" />
                <Text style={styles.amenityText}>Full AC</Text>
              </View>
              <View style={styles.amenityChip}>
                <PlugIcon size={14} color="#D97706" />
                <Text style={styles.amenityText}>USB Port</Text>
              </View>
              {item.busCategory !== 'Standard' && (
                <View style={styles.amenityChip}>
                  <WifiIcon size={14} color="#059669" />
                  <Text style={styles.amenityText}>Free WiFi</Text>
                </View>
              )}
            </View>

            {/* Card Footer: Seats & Price */}
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.seatsLeftText}>
                  🟢 <Text style={{ fontWeight: '800' }}>{item.availableSeatsCount}</Text> seats left
                </Text>
                <Text style={styles.perPassengerText}>per passenger</Text>
              </View>

              <View style={styles.priceActionRow}>
                <View style={{ alignItems: 'flex-end', marginRight: spacing.md }}>
                  <Text style={styles.fareCurrency}>PKR</Text>
                  <Text style={styles.fareAmount}>{item.baseFare}</Text>
                </View>
                <Button
                  title="Select Seats"
                  size="small"
                  onPress={() => onSelectSchedule(item, item.baseFare)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  chipText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.textWhite,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  sortLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  sortToggle: {
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: '#FFF7ED',
  },
  sortToggleText: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  busCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  busThumbnail: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: '#1E293B',
  },
  busInfo: {
    flex: 1,
  },
  busTitleBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  busName: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  busPlate: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textMuted,
  },
  timingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeNode: {
    minWidth: 90,
  },
  timeText: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
  },
  stopNameText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '700',
    marginTop: 2,
  },
  durationLineBox: {
    alignItems: 'center',
    flex: 1,
  },
  durationText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '800',
    fontSize: 11,
  },
  arrowLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 4,
  },
  arrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  lineH: {
    flex: 1,
    height: 2,
    backgroundColor: colors.borderOrange,
  },
  arrowHead: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  directText: {
    ...typography.caption,
    color: colors.success,
    fontSize: 11,
    fontWeight: '800',
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: spacing.sm,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  amenityText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: spacing.xs,
  },
  seatsLeftText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textPrimary,
  },
  perPassengerText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  priceActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareCurrency: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  fareAmount: {
    ...typography.h2,
    fontSize: 24,
    color: colors.primaryDark,
    lineHeight: 26,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptySub: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
