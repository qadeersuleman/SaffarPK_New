import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/cards/Card';
import { Button } from '../../components/buttons/Button';
import { ShieldIcon, UserIcon, BusIcon } from '../../components/icons/AppIcons';

interface ProfileScreenProps {
  user?: { name: string; phone: string };
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [delayUpdates, setDelayUpdates] = useState(true);

  const handleContactSupport = () => {
    Alert.alert(
      'SaffarPK Terminal Helpline',
      'Sukkur Main Terminal: 071-5612345\nGhotki Highway Bypass: 0723-681122\nWhatsApp Support: +92 300 1234567\nHours: 24/7 Daily'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header title="Passenger Profile" subtitle="Account & Terminal Support" showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <Card variant="elevated" style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <UserIcon size={32} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{user?.name || 'Guest Traveler'}</Text>
            <Text style={styles.userPhone}>{user?.phone || 'Browsing as Guest'}</Text>
            <View style={styles.memberTag}>
              <Text style={styles.memberTagText}>Verified Passenger</Text>
            </View>
          </View>
        </Card>

        {/* Notifications & Trip Alerts */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.cardHeading}>Trip Notifications</Text>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>SMS Ticket & OTP</Text>
              <Text style={styles.settingSub}>Receive boarding links on your phone</Text>
            </View>
            <Switch
              value={smsAlerts}
              onValueChange={setSmsAlerts}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Bus Delay Alerts</Text>
              <Text style={styles.settingSub}>Real-time updates if highway traffic occurs</Text>
            </View>
            <Switch
              value={delayUpdates}
              onValueChange={setDelayUpdates}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </Card>

        {/* Helpline and Terminal Info */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.cardHeading}>Help & Terminal Support</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleContactSupport}
            style={styles.menuItem}
          >
            <View style={styles.menuIconCircle}>
              <BusIcon size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>Terminal Helplines & WhatsApp</Text>
              <Text style={styles.menuSub}>Sukkur, Ghotki & Obuaro station contacts</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert(
                'Luggage Policy',
                'Each passenger is entitled to 15 kg of check-in luggage plus 1 personal bag. Hazardous materials and prohibited cargo are strictly banned.'
              )
            }
            style={styles.menuItem}
          >
            <View style={styles.menuIconCircle}>
              <ShieldIcon size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>Luggage & Travel Policy</Text>
              <Text style={styles.menuSub}>Allowances, refunds and passenger safety</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <Button
          title={user ? 'Sign Out' : 'Sign In with Phone'}
          variant="outline"
          onPress={onLogout}
          style={{ marginTop: spacing.md }}
        />

        <Text style={styles.versionText}>SaffarPK v1.0.0 • Made for Sindh Express Corridor</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: colors.borderOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  userPhone: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  memberTag: {
    marginTop: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.successLight,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  memberTagText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
  },
  sectionCard: {
    padding: spacing.lg,
  },
  cardHeading: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  settingLabel: {
    ...typography.label,
    color: colors.textPrimary,
  },
  settingSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  menuSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuChevron: {
    fontSize: 20,
    color: colors.textMuted,
    fontWeight: 'bold',
  },
  versionText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
