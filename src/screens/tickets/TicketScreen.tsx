import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Share,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components/buttons/Button';
import { Badge } from '../../components/common/Badge';
import {
  BusIcon,
  CheckIcon,
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
        message: `SaffarPK Digital E-Ticket\nBooking Ref: ${booking.bookingRef}\nBus: ${booking.busName} (${booking.busCategory})\nRoute: ${booking.originStop.name} to ${booking.destinationStop.name}\nSeats: ${booking.seats.join(', ')}\nDeparture: ${booking.departureDate} at ${booking.departureTime}\nPassenger: ${booking.passenger.fullName}`,
      });
    } catch (e) {
      // share cancelled
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* Top Confirmed Header */}
      <View style={styles.topHeader}>
        <View style={styles.successIconBox}>
          <CheckIcon size={28} color={colors.textWhite} />
        </View>
        <Text style={styles.confirmedTitle}>Booking Confirmed!</Text>
        <Text style={styles.confirmedSub}>
          Seat guaranteed. Present this digital pass to the conductor upon boarding.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Boarding Pass Ticket Card */}
        <View style={styles.ticketCard}>
          {/* Ticket Header */}
          <View style={styles.ticketTop}>
            <View>
              <Text style={styles.brandTitle}>
                Saffar<Text style={{ color: colors.primary }}>PK</Text>
              </Text>
              <Text style={styles.ticketRef}>REF: {booking.bookingRef}</Text>
            </View>
            <Badge label="VERIFIED PASS" variant="success" />
          </View>

          {/* Route Overview Section */}
          <View style={styles.routeSection}>
            <View style={styles.routeNode}>
              <Text style={styles.timeLabel}>{booking.departureTime}</Text>
              <Text style={styles.stationName}>{booking.originStop.name}</Text>
              <Text style={styles.landmarkText} numberOfLines={1}>
                {booking.originStop.landmark}
              </Text>
            </View>

            <View style={styles.routeDividerCol}>
              <BusIcon size={24} color={colors.primary} />
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

          {/* Perforated Ticket Tear Cutouts */}
          <View style={styles.notchRow}>
            <View style={styles.notchLeft} />
            <View style={styles.notchDashedLine} />
            <View style={styles.notchRight} />
          </View>

          {/* Ticket Meta Details Grid */}
          <View style={styles.ticketBody}>
            <View style={styles.metaGrid}>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>PASSENGER</Text>
                <Text style={styles.cellValue}>{booking.passenger.fullName}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>PHONE NUMBER</Text>
                <Text style={styles.cellValue}>{booking.passenger.phoneNumber}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>FLEET CLASS</Text>
                <Text style={styles.cellValue}>{booking.busCategory}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.cellLabel}>SEAT NUMBERS</Text>
                <Text style={[styles.cellValue, { color: colors.primary, fontWeight: '900', fontSize: 18 }]}>
                  {booking.seats.join(', ')}
                </Text>
              </View>
            </View>

            {/* High-Resolution QR Code Block */}
            <View style={styles.qrSection}>
              <View style={styles.qrBox}>
                <QrCodeIcon size={100} color={colors.dark} />
              </View>
              <Text style={styles.scanCodeText}>Scan by Bus Conductor / Terminal Gate</Text>
              <Text style={styles.hashText}>{booking.qrCodePayload}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Button
            title="Track Coach Live"
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

        <TouchableOpacity activeOpacity={0.7} onPress={onHome} style={styles.homeBtn}>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  successIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  confirmedTitle: {
    ...typography.h1,
    fontSize: 28,
    color: colors.textWhite,
  },
  confirmedSub: {
    ...typography.caption,
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: spacing.lg,
    lineHeight: 18,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    backgroundColor: colors.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  ticketCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.lg,
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0',
  },
  brandTitle: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
  },
  ticketRef: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '800',
    marginTop: 2,
  },
  routeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
  },
  routeNode: {
    flex: 1,
  },
  timeLabel: {
    ...typography.caption,
    fontSize: 13,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  stationName: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
    marginTop: 2,
  },
  landmarkText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
  routeDividerCol: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  dashLine: {
    width: 44,
    height: 2,
    backgroundColor: colors.borderOrange,
    marginTop: 6,
  },
  notchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  notchLeft: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    marginLeft: -12,
  },
  notchDashedLine: {
    flex: 1,
    height: 1.5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  notchRight: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    marginRight: -12,
  },
  ticketBody: {
    padding: spacing.xl,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  metaCell: {
    width: '46%',
  },
  cellLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  cellValue: {
    ...typography.label,
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: 3,
  },
  qrSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 1.5,
    borderTopColor: '#F1F5F9',
  },
  qrBox: {
    padding: spacing.lg,
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanCodeText: {
    ...typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  hashText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: 'monospace',
    marginTop: 3,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  homeBtn: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  homeBtnText: {
    ...typography.label,
    fontSize: 15,
    color: colors.textSecondary,
  },
});
