import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '../../theme';
import { SquareCloseIcon, ChevronRightIcon } from '../icons/AppIcons';

const { width } = Dimensions.get('window');

interface SideDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSelectMenu: (menuId: string) => void;
  onLogout: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  visible,
  onClose,
  onSelectMenu,
  onLogout,
}) => {
  const insets = useSafeAreaInsets();

  const menuItems = [
    { id: 'upgrade', title: 'Upgrade Premium' },
    { id: 'themes', title: 'Themes' },
    { id: 'extra_services', title: 'Extra Services' },
    { id: 'settings', title: 'Settings' },
    { id: 'support', title: 'Customer Support' },
    { id: 'bug', title: 'Report a Bug' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop tap to close */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Drawer Sheet */}
        <View
          style={[
            styles.drawer,
            {
              paddingTop: insets.top > 0 ? insets.top + 16 : 32,
              paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 28,
            },
          ]}
        >
          {/* Close Button on Top Left */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={styles.closeBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <SquareCloseIcon size={36} bgColor="#F65D3A" />
          </TouchableOpacity>

          <View style={styles.menuList}>
            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => {
                  onClose();
                  onSelectMenu(item.id);
                }}
                style={styles.menuRow}
              >
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRightIcon size={18} color="#64748B" />
              </TouchableOpacity>
            ))}
          </View>

          {/* App Version */}
          <Text style={styles.versionText}>Version 1.0.0</Text>

          <View style={styles.flexSpacer} />

          {/* Logout Pill Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onClose();
              onLogout();
            }}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>Logout</Text>
            <ChevronRightIcon size={18} color="#1E293B" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  drawer: {
    width: Math.min(300, width * 0.78),
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 22,
    zIndex: 10,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  closeBtn: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  menuList: {
    marginTop: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.2,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 18,
  },
  flexSpacer: {
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginBottom: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
});
