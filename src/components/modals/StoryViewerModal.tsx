import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { LocationPinIcon, ArrowForwardIcon } from '../icons/AppIcons';
import { Button } from '../buttons/Button';

const { width, height } = Dimensions.get('window');

export interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  city: string;
  imageUrl: string;
  avatarUrl: string;
  description: string;
  tag: string;
  ctaText: string;
  actionType: 'place' | 'hotel' | 'bus' | 'food';
  targetId?: string;
}

interface StoryViewerModalProps {
  visible: boolean;
  stories: StoryItem[];
  initialIndex?: number;
  onClose: () => void;
  onAction: (story: StoryItem) => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  visible,
  stories,
  initialIndex = 0,
  onClose,
  onAction,
}) => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
    }
  }, [visible, initialIndex]);

  useEffect(() => {
    if (!visible || !stories.length) return;

    progressAnim.setValue(0);
    const animation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        if (currentIndex < stories.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          onClose();
        }
      }
    });

    return () => animation.stop();
  }, [visible, currentIndex, stories.length, onClose, progressAnim]);

  if (!visible || !stories.length) return null;

  const currentStory = stories[currentIndex] || stories[0];

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Story Background Image */}
        <Image source={{ uri: currentStory.imageUrl }} style={styles.storyImage} />
        <View style={styles.vignetteOverlay} />

        {/* Top Safe Area & Story Bars */}
        <View style={[styles.topBarContainer, { paddingTop: insets.top + spacing.sm }]}>
          {/* Progress Bars */}
          <View style={styles.progressBarRow}>
            {stories.map((s, idx) => {
              let barWidth: any = '0%';
              if (idx < currentIndex) {
                barWidth = '100%';
              } else if (idx === currentIndex) {
                barWidth = progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                });
              }

              return (
                <View key={s.id} style={styles.progressBarBg}>
                  <Animated.View style={[styles.progressBarFill, { width: barWidth }]} />
                </View>
              );
            })}
          </View>

          {/* Story User Header */}
          <View style={styles.headerInfoRow}>
            <View style={styles.userBadge}>
              <Image source={{ uri: currentStory.avatarUrl }} style={styles.avatarImg} />
              <View>
                <Text style={styles.storyAuthor}>{currentStory.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <LocationPinIcon size={12} color="#38BDF8" />
                  <Text style={styles.storyLocation}>{currentStory.city}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tap areas for Prev / Next navigation */}
        <View style={styles.touchAreaRow}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handlePrev}
            style={styles.touchHalf}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleNext}
            style={styles.touchHalf}
          />
        </View>

        {/* Bottom Details Card & CTA */}
        <View
          style={[
            styles.bottomContent,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + spacing.md : spacing.xl },
          ]}
        >
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{currentStory.tag}</Text>
          </View>

          <Text style={styles.storySubtitle}>{currentStory.subtitle}</Text>
          <Text style={styles.storyDesc}>{currentStory.description}</Text>

          <Button
            title={currentStory.ctaText}
            onPress={() => {
              onClose();
              onAction(currentStory);
            }}
            size="large"
            style={styles.actionBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(9, 13, 22, 0.45)',
  },
  topBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    zIndex: 10,
  },
  progressBarRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: spacing.sm,
  },
  progressBarBg: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  headerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  storyAuthor: {
    ...typography.bodyMedium,
    fontWeight: '800',
    color: '#FFFFFF',
    fontSize: 14,
  },
  storyLocation: {
    ...typography.caption,
    fontSize: 11,
    color: '#38BDF8',
    fontWeight: '600',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  touchAreaRow: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    zIndex: 5,
  },
  touchHalf: {
    flex: 1,
    height: '100%',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    backgroundColor: 'rgba(9, 13, 22, 0.88)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
  },
  tagPill: {
    backgroundColor: 'rgba(255, 85, 0, 0.25)',
    borderWidth: 1,
    borderColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  tagText: {
    ...typography.caption,
    color: '#FF7A33',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  storySubtitle: {
    ...typography.h2,
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  storyDesc: {
    ...typography.bodyMedium,
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 19,
    marginBottom: spacing.lg,
  },
  actionBtn: {
    width: '100%',
  },
});
