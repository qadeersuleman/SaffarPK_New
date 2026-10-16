import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Share,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/cards/Card';
import {
  BusIcon,
  CheckIcon,
  LocationPinIcon,
  QrCodeIcon,
} from '../../components/icons/AppIcons';
import { Booking } from '../../types';

interface TicketScreenProps {
  booking: Booking;
  onTrackBus: () => void;
  onHome: () => void;
}

export const TicketScreen: React.FC<TicketScreenProps> = ({
  booking,
  onTrackBus,
  onHome,
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `SaffarPK E-Ticket Ref: ${booking.bookingRef}\nBus: ${booking.busName}\nRoute: ${booking.originStop.name} to ${booking.destinationStop.name}\nSeats: ${booking.seats.join(', ')}\nDeparture: ${booking.departureDate} at ${booking.departureTime}\nPassenger: ${booking.passenger.fullName}`,
      });
    } catch (e) {
      // share canceled or failed
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Success Header */}
      <View style={styles.topHeader}>
        <View style={styles.successIconBox}>
          <CheckIcon size={24} color={colors.textWhite} />
        </View>
        <Text style={styles.confirmedTitle}>Booking Confirmed!</Text>
        <Text style={styles.confirmedSub}>
          Your seat is guaranteed. Show this digital ticket upon boarding.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Ticket Card Container */}
        <View style={styles.ticketCard}>
          {/* Ticket Header */}
          <View style={styles.ticketTop}>
            <View>
              <Text style={styles.brandTitle}>
                Saffar<Text style={{ color: colors.primary }}>PK</Text>
              </Text>
              <Text style={styles.ticketRef}>REF: {booking.bookingRef}</Text>
            </View>
            <Badge label="PAID & CONFIRMED" variant="success" />
          </View>

          {/* Route Overview */}
          <View style={styles.routeSection}>
            <View style={styles.routeNode}>
              <Text style={styles.timeLabel}>{booking.departureTime}</Text>
              <Text style={styles.stationName}>{booking.originStop.name}</Text>
              <Text style={styles.landmarkText} numberOfLines={1}>
                {booking.originStop.landmark}
              </Text>
            </View>

            <View style={styles.routeDividerCol}>
              <BusIcon size={20} color={colors.primary} />
              <View style={styles.dashLine} />
            </View>

            <View style={[styles.routeNode, { alignItems: 'flex-end' }]}>
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.stationName}>{booking.destinationStop.name}</Text>
              <Text style={styles.landmarkText} numberOfLines={1}>
                {booking.destinationStop.landmark}
              </Text>
            </View>
          </View>

          {/* Ticket Tear Notches */}
          <View style={styles.notchRow}>
            <View style={styles.notchLeft} />
            <View style={styles.notchDashedLine} />
            <View style={styles.notchRight} />
          </View>

          {/* Ticket Meta Details */}
          <View style={styles.ticketBody}>
            <View style={styles.metaGrid}>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>PASSENGER</Text>
                <Text style={styles.cellValue}>{booking.passenger.fullName}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>PHONE</Text>
                <Text style={styles.cellValue}>{booking.passenger.phoneNumber}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>BUS CLASS</Text>
                <Text style={styles.cellValue}>{booking.busCategory}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>SEATS</Text>
                <Text style={[styles.cellValue, { color: colors.primary, fontWeight: '900' }]}>
                  {booking.seats.join(', ')}
                </Text>
              </View>
            </View>

            {/* QR Code Section */}
            <View style={styles.qrSection}>
              <View style={styles.qrBox}>
                <QrCodeIcon size={84} color={colors.dark} />
              </View>
              <Text style={styles.scanCodeText}>Scan by Conductor on Boarding</Text>
              <Text style={styles.hashText}>{booking.qrCodePayload}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Button
            title="Track Bus Live"
            onPress={onTrackBus}
            variant="primary"
            style={{ flex: 1 }}
          />
          <Button
            title="Share Ticket"
            onPress={handleShare}
            variant="outline"
            style={{ flex: 1 }}
          />
        </View>

        <TouchableOpacity onPress={onHome} style={styles.homeBtn}>
          <Text style={styles.homeBtnText}>Return to Home Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  topHeader: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  successIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  confirmedTitle: {
    ...typography.h2,
    color: colors.textWhite,
  },
  confirmedSub: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  ticketCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.lg,
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surfaceSubtle,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brandTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  ticketRef: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
    marginTop: 2,
  },
  routeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  routeNode: {
    flex: 1,
  },
  timeLabel: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  stationName: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: 2,
  },
  landmarkText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  routeDividerCol: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  dashLine: {
    width: 40,
    height: 1.5,
    backgroundColor: colors.borderOrange,
    marginTop: 4,
  },
  notchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  notchLeft: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
    marginLeft: -10,
  },
  notchDashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  notchRight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
    marginRight: -10,
  },
  ticketBody: {
    padding: spacing.lg,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  metaCell: {
    width: '46%',
  },
  cellLabel: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  cellValue: {
    ...typography.label,
    color: colors.textPrimary,
    marginTop: 2,
  },
  qrSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  qrBox: {
    padding: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanCodeText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  hashText: {
    ...typography.caption,
    fontSize: 9,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  homeBtn: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    padding: spacing.sm,
  },
  homeBtnText: {
    ...typography.label,
    color: colors.textSecondary,
  },
});
