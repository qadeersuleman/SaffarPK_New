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
  HotelIcon,
  FlightIcon,
  LocationPinIcon,
  BusIcon,
} from '../../components/icons/AppIcons';
import { FadeInUp } from '../../components/animations';

export interface NotificationItem {
  id: string;
  type: 'hotel' | 'flight' | 'update' | 'bus';
  title: string;
  description: string;
  time: string;
  date: string;
  group: 'Today' | 'Yesterday' | 'Earlier';
  isUnread: boolean;
}

const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'n-1',
    type: 'hotel',
    title: 'Hotel Booking',
    description:
      'Your deluxe suite at Hotel Niribili has been confirmed for 2 nights. Pack your bags for the beach!',
    time: '12:45 PM',
    date: 'August 12, 2026',
    group: 'Today',
    isUnread: true,
  },
  {
    id: 'n-2',
    type: 'flight',
    title: 'Flight Booking',
    description:
      'Sukkur to Islamabad air connection scheduled on time. Terminal gates open 45 minutes prior.',
    time: '12:45 PM',
    date: 'August 12, 2026',
    group: 'Today',
    isUnread: true,
  },
  {
    id: 'n-3',
    type: 'update',
    title: 'App Update',
    description:
      'SaffarPK version 2.4 is live with live GPS bus tracking and instant ticket downloads on Sukkur-Obuaro route.',
    time: '03:45 PM',
    date: 'August 11, 2026',
    group: 'Yesterday',
    isUnread: false,
  },
  {
    id: 'n-4',
    type: 'flight',
    title: 'Flight Booking',
    description:
      'Your travel voucher of PKR 1,500 has been credited to your digital wallet for your upcoming vacation.',
    time: '12:45 PM',
    date: 'August 11, 2026',
    group: 'Yesterday',
    isUnread: true,
  },
  {
    id: 'n-5',
    type: 'hotel',
    title: 'Hotel Booking',
    description:
      'Complimentary airport shuttle confirmed for Holy Park Hotel stay. Driver will meet at arrival lounge.',
    time: '12:45 PM',
    date: 'August 11, 2026',
    group: 'Yesterday',
    isUnread: true,
  },
  {
    id: 'n-6',
    type: 'bus',
    title: 'Bus Ticket Confirmed',
    description:
      'Sukkur to Obuaro Royal Express Seat #12 booked. Show QR ticket code directly to the conductor.',
    time: '09:15 AM',
    date: 'August 09, 2026',
    group: 'Earlier',
    isUnread: false,
  },
];

interface NotificationScreenProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({
  onBack,
  showBackButton = false,
}) => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'hotel':
        return <HotelIcon size={20} color={colors.primary} />;
      case 'flight':
        return <FlightIcon size={20} color={colors.primary} />;
      case 'update':
        return <LocationPinIcon size={20} color={colors.primary} />;
      case 'bus':
        return <BusIcon size={20} color={colors.primary} />;
    }
  };

  // Group notifications
  const groups: Array<'Today' | 'Yesterday' | 'Earlier'> = ['Today', 'Yesterday', 'Earlier'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        {showBackButton && onBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ArrowBackIcon size={22} color="#111827" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}

        <Text style={styles.headerTitle}>Notification</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={markAllRead}
          style={styles.markReadBtn}
        >
          <Text style={styles.markReadText}>Mark read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 80 : 100 },
        ]}
      >
        {groups.map(groupName => {
          const itemsInGroup = notifications.filter(n => n.group === groupName);
          if (itemsInGroup.length === 0) return null;

          return (
            <View key={groupName} style={styles.groupSection}>
              {/* Group Heading */}
              <Text style={styles.groupHeading}>{groupName}</Text>

              {/* Items in this group */}
              {itemsInGroup.map((item, idx) => (
                <FadeInUp key={item.id} delay={idx * 60}>
                  <View style={styles.timelineRow}>
                    {/* Left Timeline Indicator Dot */}
                    <View style={styles.timelineColumn}>
                      <View
                        style={[
                          styles.timelineDot,
                          item.isUnread ? styles.dotUnread : styles.dotRead,
                        ]}
                      />
                    </View>

                    {/* Notification Card */}
                    <View
                      style={[
                        styles.notifCard,
                        item.isUnread && styles.notifCardUnread,
                      ]}
                    >
                      <View style={styles.cardHeaderRow}>
                        {/* Left Icon Pill */}
                        <View style={styles.iconContainer}>{getIcon(item.type)}</View>

                        {/* Title & Body */}
                        <View style={styles.cardTextContent}>
                          <Text style={styles.notifTitle}>{item.title}</Text>
                          <Text style={styles.notifDescription}>{item.description}</Text>
                        </View>
                      </View>

                      {/* Bottom Timestamp Row */}
                      <View style={styles.cardBottomRow}>
                        <Text style={styles.notifTime}>{item.time}</Text>
                        <Text style={styles.notifDate}>{item.date}</Text>
                      </View>
                    </View>
                  </View>
                </FadeInUp>
              ))}
            </View>
          );
        })}
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
  markReadBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary, // #F65D3A
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  groupSection: {
    marginBottom: spacing.lg,
  },
  groupHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: spacing.sm,
    marginLeft: 26,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  timelineColumn: {
    width: 24,
    alignItems: 'center',
    paddingTop: 16,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotUnread: {
    backgroundColor: colors.primary, // Coral-orange #F65D3A
  },
  dotRead: {
    backgroundColor: '#CBD5E1', // Muted Gray
  },
  notifCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    marginLeft: 6,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  notifCardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFF7ED', // Soft coral tint
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  cardTextContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  notifDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  notifTime: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  notifDate: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
});

