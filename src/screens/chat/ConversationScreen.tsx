import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  PaperclipIcon,
  SmileIcon,
  SendIcon,
} from '../../components/icons/AppIcons';
import { FadeInUp } from '../../components/animations';

export interface ChatMessage {
  id: string;
  sender: 'contact' | 'user';
  text: string;
  time: string;
}

interface ConversationScreenProps {
  contactName?: string;
  contactAvatar?: any;
  onBack: () => void;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  contactName = 'Ishtiaq Zaman',
  contactAvatar = {
    uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'contact',
      text: 'Hello Raju, How are you? Want to know your experience in Hunza Valley.',
      time: '12:45 PM',
    },
    {
      id: 'm-2',
      sender: 'user',
      text: 'hey, I’m fine & you? that was a very nice place. The place was excellent and my experience was really good.',
      time: '12:44 PM',
    },
    {
      id: 'm-3',
      sender: 'contact',
      text: 'We have reserved your local mountain guide and traditional trout dinner in Karimabad for tomorrow evening.',
      time: '12:43 PM',
    },
    {
      id: 'm-4',
      sender: 'user',
      text: 'Sounds great! Will be at the hotel lobby on time.',
      time: '12:35 PM',
    },
  ]);

  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Auto-scroll
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate response
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'contact',
        text: 'Perfect! Have a wonderful trip with SaffarPK. Let me know if you need any adjustments.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, replyMsg]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowBackIcon size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{contactName}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Messages Stream */}
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 30 },
          ]}
        >
          {messages.map((msg, index) => {
            const isContact = msg.sender === 'contact';

            return (
              <FadeInUp key={msg.id} delay={index * 40}>
                <View
                  style={[
                    styles.messageRow,
                    isContact ? styles.contactMessageRow : styles.userMessageRow,
                  ]}
                >
                  {/* Left Avatar for Contact */}
                  {isContact && (
                    <Image source={contactAvatar} style={styles.messageAvatar} />
                  )}

                  {/* Message Bubble Column */}
                  <View
                    style={[
                      styles.bubbleColumn,
                      isContact ? { alignItems: 'flex-start' } : { alignItems: 'flex-end' },
                    ]}
                  >
                    <View
                      style={[
                        styles.bubble,
                        isContact ? styles.contactBubble : styles.userBubble,
                      ]}
                    >
                      <Text
                        style={[
                          styles.bubbleText,
                          isContact ? styles.contactText : styles.userText,
                        ]}
                      >
                        {msg.text}
                      </Text>
                    </View>
                    <Text style={styles.timestampText}>{msg.time}</Text>
                  </View>

                  {/* Right Avatar for User */}
                  {!isContact && (
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                      }}
                      style={styles.messageAvatar}
                    />
                  )}
                </View>
              </FadeInUp>
            );
          })}
        </ScrollView>

        {/* Bottom Floating Input Bar */}
        <View
          style={[
            styles.bottomInputBar,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 12 },
          ]}
        >
          {/* Action Icons: Link & Smile */}
          <TouchableOpacity activeOpacity={0.7} style={styles.actionIconBtn}>
            <PaperclipIcon size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.actionIconBtn}>
            <SmileIcon size={20} color={colors.primary} />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter your text here"
            placeholderTextColor="#94A3B8"
            style={styles.inputField}
            onSubmitEditing={handleSend}
          />

          {/* Send Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSend}
            style={styles.sendBtn}
          >
            <SendIcon size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
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
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: 10,
  },
  contactMessageRow: {
    justifyContent: 'flex-start',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginTop: 4,
  },
  bubbleColumn: {
    maxWidth: '75%',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  contactBubble: {
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  userBubble: {
    backgroundColor: colors.primary, // #F65D3A
    borderTopRightRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactText: {
    color: '#334155',
  },
  userText: {
    color: '#FFFFFF',
  },
  timestampText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },

  // Input Bar
  bottomInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  actionIconBtn: {
    padding: 6,
  },
  inputField: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderRadius: 22,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111827',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary, // #F65D3A
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
});
