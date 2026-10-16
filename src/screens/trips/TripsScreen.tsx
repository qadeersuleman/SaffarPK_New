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
import { BusIcon, LocationPinIcon } from '../../components/icons/AppIcons';
import { Booking } from '../../types';

interface TripsScreenProps {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
  onTrackBus: (booking: Booking) => void;
  onNewBooking: () => void;
}

export const TripsScreen: React.FC<TripsScreenProps> = ({
  bookings,
  onSelectBooking,
  onTrackBus,
  onNewBooking,
}) => {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');

  const filtered = bookings.filter(b =>
    tab === 'upcoming' ? b.ticketStatus === 'confirmed' : b.ticketStatus === 'used'
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header title="My Bookings" subtitle="SaffarPK Trip History" showBack={false} />

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setTab('upcoming')}
          style={[styles.tabItem, tab === 'upcoming' ? styles.tabItemActive : null]}
        >
          <Text style={[styles.tabText, tab === 'upcoming' ? styles.tabTextActive : null]}>
            Upcoming Trips ({bookings.filter(b => b.ticketStatus === 'confirmed').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab('completed')}
          style={[styles.tabItem, tab === 'completed' ? styles.tabItemActive : null]}
        >
          <Text style={[styles.tabText, tab === 'completed' ? styles.tabTextActive : null]}>
            Completed Trips
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.bookingId}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <BusIcon size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No {tab} bookings found</Text>
            <Text style={styles.emptySub}>
              Book guaranteed seats on the Sukkur ⇄ Obuaro corridor today.
            </Text>
            <Button
              title="Book a Journey"
              onPress={onNewBooking}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onSelectBooking(item)}
            style={styles.tripCard}
          >
            <View style={styles.tripCardHeader}>
              <View>
                <Text style={styles.busName}>{item.busName}</Text>
                <Text style={styles.refText}>REF: {item.bookingRef}</Text>
              </View>
              <Badge label={item.busCategory} variant="category" />
            </View>

            <View style={styles.routeRow}>
              <View>
                <Text style={styles.timeText}>{item.departureTime}</Text>
                <Text style={styles.stationName}>{item.originStop.name}</Text>
              </View>
              <Text style={styles.arrowText}>➔</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.timeText}>Arrival</Text>
                <Text style={styles.stationName}>{item.destinationStop.name}</Text>
              </View>
            </View>

            <View style={styles.tripCardFooter}>
              <Text style={styles.seatsInfo}>
                Seats: <Text style={{ fontWeight: '700', color: colors.textPrimary }}>{item.seats.join(', ')}</Text>
              </Text>
              <View style={styles.cardActions}>
                <Button
                  title="Track"
                  size="small"
                  variant="outline"
                  onPress={() => onTrackBus(item)}
                />
                <Button
                  title="View Ticket"
                  size="small"
                  onPress={() => onSelectBooking(item)}
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
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  tabItem: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primaryDark,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  tripCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  tripCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  busName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  refText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  timeText: {
    ...typography.caption,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  stationName: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  arrowText: {
    fontSize: 18,
    color: colors.primary,
  },
  tripCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  seatsInfo: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
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
