import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/buttons/Button';
import {
  BusIcon,
  ClockIcon,
  StarIcon,
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

  // Map schedules with enriched vehicle data and stop timings
  const enrichedSchedules: BusSchedule[] = (schedulesData as any[]).map(item => {
    const bus = busesData.find(b => b.id === item.busId) || (busesData[0] as any);
    const originTiming = item.stopTimings?.find((st: any) => st.stopId === origin.id)?.scheduledTime || item.departureTime;
    const destTiming = item.stopTimings?.find((st: any) => st.stopId === destination.id)?.scheduledTime || item.arrivalTime;
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <Header
        title={`${origin.name} → ${destination.name}`}
        subtitle={`${travelDate} • ${passengers} Passenger(s) • ~${durationMin} mins`}
        showBack
        onBack={onBack}
      />

      {/* Filter and Sort Chips */}
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
          <Text style={styles.sortLabel}>Sort by:</Text>
          <TouchableOpacity
            onPress={() => setSortBy(sortBy === 'departure' ? 'fare' : 'departure')}
            style={styles.sortToggle}
          >
            <Text style={styles.sortToggleText}>
              {sortBy === 'departure' ? '⏰ Departure Time' : '💰 Lowest Price'}
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
            <BusIcon size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No Buses Found</Text>
            <Text style={styles.emptySub}>
              Try selecting another bus class or time filter.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onSelectSchedule(item, item.baseFare)}
            style={styles.busCard}
          >
            {/* Top row: Bus name & category */}
            <View style={styles.cardTopRow}>
              <View style={styles.busInfo}>
                <Text style={styles.busName}>{item.busName}</Text>
                <View style={styles.ratingRow}>
                  <StarIcon size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>{item.bus.rating}</Text>
                  <Text style={styles.busPlate}>• {item.bus.registrationNumber}</Text>
                </View>
              </View>

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

            {/* Time & Route Bar */}
            <View style={styles.timingSection}>
              <View style={styles.timeNode}>
                <Text style={styles.timeText}>{item.departureTime}</Text>
                <Text style={styles.stopNameText}>{origin.name}</Text>
              </View>

              <View style={styles.durationLineBox}>
                <Text style={styles.durationText}>~{durationMin}m</Text>
                <View style={styles.arrowLine}>
                  <View style={styles.arrowDot} />
                  <View style={styles.lineH} />
                  <View style={styles.arrowHead} />
                </View>
                <Text style={styles.directText}>Express</Text>
              </View>

              <View style={[styles.timeNode, { alignItems: 'flex-end' }]}>
                <Text style={styles.timeText}>{item.arrivalTime}</Text>
                <Text style={styles.stopNameText}>{destination.name}</Text>
              </View>
            </View>

            {/* Amenities tags */}
            <View style={styles.amenitiesRow}>
              {item.bus.amenities.slice(0, 3).map((amenity, idx) => (
                <View key={idx} style={styles.amenityTag}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>

            {/* Card Footer: Seats & Price */}
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.seatsLeftText}>
                  🟢 <Text style={{ fontWeight: '700' }}>{item.availableSeatsCount}</Text> seats available
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
    backgroundColor: colors.background,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.textWhite,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  sortLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  sortToggle: {
    paddingVertical: 2,
  },
  sortToggleText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  busCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  busInfo: {
    flex: 1,
  },
  busName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  busPlate: {
    ...typography.caption,
    color: colors.textMuted,
  },
  timingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.xs,
  },
  timeNode: {
    minWidth: 80,
  },
  timeText: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  stopNameText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  durationLineBox: {
    alignItems: 'center',
    flex: 1,
  },
  durationText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 10,
  },
  arrowLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 4,
  },
  arrowDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  lineH: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.borderOrange,
  },
  arrowHead: {
    width: 6,
    height: 6,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  directText: {
    ...typography.caption,
    color: colors.success,
    fontSize: 10,
    fontWeight: '700',
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: spacing.sm,
  },
  amenityTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
  },
  amenityText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.xs,
  },
  seatsLeftText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  perPassengerText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
  },
  priceActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareCurrency: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  fareAmount: {
    ...typography.h3,
    color: colors.primaryDark,
    lineHeight: 22,
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
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
