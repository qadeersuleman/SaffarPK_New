import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  SearchIcon,
} from '../../components/icons/AppIcons';
import { ConversationScreen } from './ConversationScreen';
import { FadeInUp } from '../../components/animations';

export interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  date: string;
  time: string;
  avatar: any;
  unreadCount?: number;
}

const CHAT_CONTACTS: ChatContact[] = [
  {
    id: 'c-1',
    name: 'Ishtiaq Zaman',
    lastMessage: 'Hello Raju How are you?',
    date: '20 Sep 2026',
    time: '12:45 PM',
    avatar: {
      uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    unreadCount: 1,
  },
  {
    id: 'c-2',
    name: 'Ferdous Hossein',
    lastMessage: 'Whats up?',
    date: '19 Sep 2026',
    time: '12:45 PM',
    avatar: {
      uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'c-3',
    name: 'Hasan Ali',
    lastMessage: 'Thank you.',
    date: '18 Sep 2026',
    time: '12:45 PM',
    avatar: {
      uri: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'c-4',
    name: 'Majharul Alom',
    lastMessage: 'Can we meet tomorrow?',
    date: '17 Sep 2026',
    time: '12:45 PM',
    avatar: {
      uri: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'c-5',
    name: 'Raju Ahamed',
    lastMessage: 'Let’s go to a trip?',
    date: '16 Sep 2026',
    time: '12:45 PM',
    avatar: {
      uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'c-6',
    name: 'Khalid Hossein',
    lastMessage: 'Hey Raju, nice to meet you.',
    date: '15 Sep 2026',
    time: '12:45 PM',
    avatar: {
      uri: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    id: 'c-7',
    name: 'Kamal Khan',
    lastMessage: 'Hello Raju How are you?',
    date: '14 Sep 2026',
    time: '12:45 PM',
    avatar: {
      uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
  },
];

interface ChatScreenProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  onBack,
  showBackButton = false,
}) => {
  const insets = useSafeAreaInsets();
  const [activeSegment, setActiveSegment] = useState<'conversations' | 'friends'>('conversations');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<ChatContact | null>(null);

  // Filter contacts by search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return CHAT_CONTACTS;
    return CHAT_CONTACTS.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // If a conversation is active, render ConversationScreen
  if (activeConversation) {
    return (
      <ConversationScreen
        contactName={activeConversation.name}
        contactAvatar={activeConversation.avatar}
        onBack={() => setActiveConversation(null)}
      />
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
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

        <Text style={styles.headerTitle}>Chat</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Segmented Pill Toggle (Conversations | All Friends) */}
      <View style={styles.segmentedContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveSegment('conversations')}
          style={[
            styles.segmentPill,
            activeSegment === 'conversations' && styles.segmentPillActive,
          ]}
        >
          <Text
            style={[
              styles.segmentText,
              activeSegment === 'conversations' && styles.segmentTextActive,
            ]}
          >
            Conversations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveSegment('friends')}
          style={[
            styles.segmentPill,
            activeSegment === 'friends' && styles.segmentPillActive,
          ]}
        >
          <Text
            style={[
              styles.segmentText,
              activeSegment === 'friends' && styles.segmentTextActive,
            ]}
          >
            All Friends
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <SearchIcon size={18} color="#94A3B8" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search any chats..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Conversations List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 80 : 100 },
        ]}
      >
        {filteredContacts.map((contact, index) => (
          <FadeInUp key={contact.id} delay={index * 50}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setActiveConversation(contact)}
              style={styles.contactRow}
            >
              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <Image source={contact.avatar} style={styles.avatar} />
                {contact.unreadCount ? <View style={styles.unreadBadge} /> : null}
              </View>

              {/* Center Info */}
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {contact.lastMessage}
                </Text>
              </View>

              {/* Right Timestamp Column */}
              <View style={styles.timeColumn}>
                <Text style={styles.dateText}>{contact.date}</Text>
                <Text style={styles.timeText}>{contact.time}</Text>
              </View>
            </TouchableOpacity>
          </FadeInUp>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
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
  segmentedContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 4,
    marginTop: 4,
  },
  segmentPill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 11,
  },
  segmentPillActive: {
    backgroundColor: colors.primary, // #F65D3A
    ...shadows.sm,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  searchBarWrapper: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 13,
    color: '#64748B',
  },
  timeColumn: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  dateText: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
});
