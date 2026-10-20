import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Header } from '../../components/common/Header';
import { Card } from '../../components/cards/Card';
import { Button } from '../../components/buttons/Button';
import {
  ShieldIcon,
  UserIcon,
  PhoneIcon,
} from '../../components/icons/AppIcons';

interface ProfileScreenProps {
  user?: { name: string; phone: string };
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [delayUpdates, setDelayUpdates] = useState(true);

  const handleContactSupport = () => {
    Alert.alert(
      'SaffarPK Terminal Contacts',
      'Sukkur Central Terminal: 071-5612345\nGhotki Bypass Terminal: 0723-681122\nObuaro Station Gate: 0723-559900\nWhatsApp Care: +92 300 1234567\nService Hours: 24/7 Daily'
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <Header title="Passenger Profile" subtitle="Account & Terminal Support" showBack={false} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card with Cover Photo */}
        <Card variant="elevated" style={styles.userCard}>
          <View style={styles.userRow}>
            <View style={styles.avatarCircle}>
              <UserIcon size={36} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{user?.name || 'Guest Traveler'}</Text>
              <Text style={styles.userPhone}>{user?.phone || 'Browsing as Guest'}</Text>
              <View style={styles.memberTag}>
                <Text style={styles.memberTagText}>Verified Corridor Passenger</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Notifications & Trip Alerts */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.cardHeading}>Trip Notifications & Alerts</Text>

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>SMS Ticket & Digital Pass</Text>
              <Text style={styles.settingSub}>Receive boarding links on your phone</Text>
            </View>
            <Switch
              value={smsAlerts}
              onValueChange={setSmsAlerts}
              trackColor={{ false: '#CBD5E1', true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Highway Delay & Weather Alerts</Text>
              <Text style={styles.settingSub}>Instant SMS notifications if N-5 traffic occurs</Text>
            </View>
            <Switch
              value={delayUpdates}
              onValueChange={setDelayUpdates}
              trackColor={{ false: '#CBD5E1', true: colors.primary }}
              thumbColor={colors.surface}
            />
          </View>
        </Card>

        {/* Helpline and Terminal Info */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.cardHeading}>Help & Terminal Support</Text>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleContactSupport}
            style={styles.menuItem}
          >
            <View style={styles.menuIconCircle}>
              <PhoneIcon size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>Terminal Helplines & WhatsApp</Text>
              <Text style={styles.menuSub}>Direct line to Sukkur, Ghotki & Obuaro managers</Text>
            </View>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() =>
              Alert.alert(
                'Luggage Policy',
                'Each passenger is entitled to 15 kg of check-in luggage plus 1 personal laptop bag. Fragile items must be carried onboard.'
              )
            }
            style={styles.menuItem}
          >
            <View style={styles.menuIconCircle}>
              <ShieldIcon size={20} color={colors.primary} />
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
          style={{ marginTop: spacing.sm }}
        />

        <Text style={styles.versionText}>SaffarPK v1.0.0 • Upper Sindh Express Highway</Text>
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
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderColor: colors.borderOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
  },
  userPhone: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  memberTag: {
    marginTop: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    backgroundColor: '#DCFCE7',
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  memberTagText: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  sectionCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cardHeading: {
    ...typography.h3,
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  settingLabel: {
    ...typography.label,
    fontSize: 15,
    color: colors.textPrimary,
  },
  settingSub: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#F1F5F9',
    marginVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  menuIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    ...typography.label,
    fontSize: 15,
    color: colors.textPrimary,
  },
  menuSub: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuChevron: {
    fontSize: 24,
    color: colors.textMuted,
    fontWeight: 'bold',
  },
  versionText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
