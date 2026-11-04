import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  EditPencilIcon,
  ReceiptSearchIcon,
  HistoryClockIcon,
  LightbulbIcon,
  DollarPaymentIcon,
  HelpCircleIcon,
  InfoCircleIcon,
  MedalBadgeIcon,
  ChevronRightIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { FadeInUp } from '../../components/animations';

interface ProfileScreenProps {
  user?: { name: string; phone: string; address?: string };
  onBack?: () => void;
  onLogout?: () => void;
  onTrackBookings?: () => void;
  onMyHistory?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onBack,
  onLogout,
  onTrackBookings,
  onMyHistory,
}) => {
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState(user?.name || 'Raju Ahamed');
  const [userAddress, setUserAddress] = useState(
    user?.address || 'Sukkur, Sindh - Pakistan',
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [tempAddress, setTempAddress] = useState(userAddress);

  const [activeModal, setActiveModal] = useState<
    'packing' | 'payment' | 'help' | 'legal' | null
  >(null);

  const handleSaveProfile = () => {
    if (tempName.trim()) setUserName(tempName.trim());
    if (tempAddress.trim()) setUserAddress(tempAddress.trim());
    setEditModalVisible(false);
  };

  const menuItems = [
    {
      id: 'edit_profile',
      title: 'Edit profile',
      icon: (color: string) => <EditPencilIcon size={22} color={color} />,
      onPress: () => {
        setTempName(userName);
        setTempAddress(userAddress);
        setEditModalVisible(true);
      },
    },
    {
      id: 'track_bookings',
      title: 'Track My Bookings',
      icon: (color: string) => <ReceiptSearchIcon size={22} color={color} />,
      onPress: () => {
        if (onTrackBookings) {
          onTrackBookings();
        } else {
          Alert.alert(
            'Track My Bookings',
            'Saffar Prime Executive (SFK-9901-EX)\nStatus: On Route to Ghotki Bypass\nEstimated arrival: 45 mins',
          );
        }
      },
    },
    {
      id: 'my_history',
      title: 'My History',
      icon: (color: string) => <HistoryClockIcon size={22} color={color} />,
      onPress: () => {
        if (onMyHistory) {
          onMyHistory();
        } else {
          Alert.alert(
            'Travel History',
            '• Sukkur ⇄ Obuaro (Completed: 28 Oct)\n• Hunza Valley Tour (Completed: 14 Sep)\n• Lahore Heritage Visit (Completed: 05 Aug)',
          );
        }
      },
    },
    {
      id: 'packing_tips',
      title: 'Packing Tips',
      icon: (color: string) => <LightbulbIcon size={22} color={color} />,
      onPress: () => setActiveModal('packing'),
    },
    {
      id: 'payment_method',
      title: 'Payment Method',
      icon: (color: string) => <DollarPaymentIcon size={22} color={color} />,
      onPress: () => setActiveModal('payment'),
    },
    {
      id: 'help_center',
      title: 'Help Center',
      icon: (color: string) => <HelpCircleIcon size={22} color={color} />,
      onPress: () => setActiveModal('help'),
    },
    {
      id: 'legal_info',
      title: 'Legal Info',
      icon: (color: string) => <InfoCircleIcon size={22} color={color} />,
      onPress: () => setActiveModal('legal'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ArrowBackIcon size={22} color="#1E293B" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Header */}
        <FadeInUp delay={80} distance={15}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('../../assets/images/user_avatar.jpg')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setTempName(userName);
                  setTempAddress(userAddress);
                  setEditModalVisible(true);
                }}
                style={styles.editAvatarBadge}
              >
                <EditPencilIcon size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>{userName}</Text>

            <View style={styles.badgeRow}>
              <MedalBadgeIcon size={16} />
              <Text style={styles.badgeText}>Premium User</Text>
            </View>

            <Text style={styles.userAddress}>My Address: {userAddress}</Text>
          </View>
        </FadeInUp>

        {/* 7 Menu Items as Rounded Cards */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <FadeInUp key={item.id} delay={120 + index * 40} distance={12}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={item.onPress}
                style={styles.menuCard}
              >
                <View style={styles.menuIconBox}>
                  {item.icon(colors.primary)}
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRightIcon size={18} color="#94A3B8" />
              </TouchableOpacity>
            </FadeInUp>
          ))}
        </View>

        {onLogout && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onLogout}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter your name"
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.input}
              value={tempAddress}
              onChangeText={setTempAddress}
              placeholder="Enter your address"
              placeholderTextColor="#94A3B8"
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setEditModalVisible(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSaveProfile}
                style={styles.saveBtn}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Info Modals */}
      <Modal visible={activeModal !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            {activeModal === 'packing' && (
              <>
                <Text style={styles.modalTitle}>🧳 Packing Tips</Text>
                <Text style={styles.modalBody}>
                  • Northern Areas: Windbreakers, thermal thermals, hiking boots.{'\n'}
                  • Corridor Bus: Carry valid CNIC, digital ticket QR, water bottle.{'\n'}
                  • Check-in weight: 15kg free per seat + 1 hand luggage.
                </Text>
              </>
            )}

            {activeModal === 'payment' && (
              <>
                <Text style={styles.modalTitle}>💳 Payment Methods</Text>
                <Text style={styles.modalBody}>
                  • EasyPaisa / JazzCash Mobile Wallets (Connected){'\n'}
                  • SadaPay & NayaPay Virtual Cards{'\n'}
                  • 1Link Visa & Mastercard Debit/Credit Cards{'\n'}
                  • Cash on Boarding at Sukkur & Obuaro Terminals
                </Text>
              </>
            )}

            {activeModal === 'help' && (
              <>
                <Text style={styles.modalTitle}>🎧 SaffarPK Help Center</Text>
                <Text style={styles.modalBody}>
                  • 24/7 Helpline: +92 300 1234567{'\n'}
                  • Sukkur Central Terminal: (071) 5612345{'\n'}
                  • Obuaro Main Station: (0723) 559900{'\n'}
                  • Email: support@saffarpk.com
                </Text>
              </>
            )}

            {activeModal === 'legal' && (
              <>
                <Text style={styles.modalTitle}>⚖️ Legal & Policies</Text>
                <Text style={styles.modalBody}>
                  • Passenger insurance coverage included on all verified routes.{'\n'}
                  • Full fare refund available up to 2 hours before bus departure.{'\n'}
                  • Strict safety and luggage compliance across Sindh & Punjab.
                </Text>
              </>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveModal(null)}
              style={styles.closeModalBtn}
            >
              <Text style={styles.closeModalBtnText}>Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 26,
  },
  avatarWrapper: {
    position: 'relative',
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...shadows.md,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 52,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 14,
    letterSpacing: -0.3,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 5,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  userAddress: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 6,
  },
  menuContainer: {
    marginTop: 4,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  logoutBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    ...shadows.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  modalBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeModalBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeModalBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
