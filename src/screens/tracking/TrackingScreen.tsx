import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/cards/Card';
import {
  BusIcon,
  LocationPinIcon,
} from '../../components/icons/AppIcons';
import { ALL_STOPS } from '../../utils/routeUtils';

interface TrackingScreenProps {
  busName?: string;
  busPlate?: string;
  onBack: () => void;
}

export const TrackingScreen: React.FC<TrackingScreenProps> = ({
  busName = 'Saffar Prime Executive',
  busPlate = 'SKR-9821',
  onBack,
}) => {
  const [currentStopIndex] = useState(2); // At Ghotki
  const [speed, setSpeed] = useState(72); // 72 km/h
  const [etaMinutes, setEtaMinutes] = useState(14); // 14 mins

  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const interval = setInterval(() => {
      setSpeed(Math.floor(68 + Math.random() * 8));
      setEtaMinutes(prev => (prev > 1 ? prev - 1 : 12));
    }, 4000);

    return () => clearInterval(interval);
  }, [pulseAnim]);

  const nextStop = ALL_STOPS[Math.min(ALL_STOPS.length - 1, currentStopIndex + 1)];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      <Header
        title="Live Highway Tracking"
        subtitle={`${busName} • ${busPlate}`}
        showBack
        onBack={onBack}
        dark
      />

      {/* Real-time Status Floating Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusCol}>
          <Text style={styles.statusLabel}>STATUS</Text>
          <View style={styles.liveBadgeRow}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveText}>ON ROUTE (N-5)</Text>
          </View>
        </View>

        <View style={styles.vDivider} />

        <View style={styles.statusCol}>
          <Text style={styles.statusLabel}>GPS SPEED</Text>
          <Text style={styles.statusValue}>{speed} km/h</Text>
        </View>

        <View style={styles.vDivider} />

        <View style={styles.statusCol}>
          <Text style={styles.statusLabel}>NEXT STOP ETA</Text>
          <Text style={styles.statusValueHighlight}>~{etaMinutes} mins</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Next Stop Highlight Card */}
        <Card variant="elevated" style={styles.etaCard}>
          <View style={styles.etaHeader}>
            <View style={styles.etaIconCircle}>
              <LocationPinIcon size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.etaSub}>APPROACHING NEXT TERMINAL</Text>
              <Text style={styles.etaTitle}>{nextStop.name}</Text>
              <Text style={styles.etaLandmark}>{nextStop.landmark}</Text>
            </View>
            <Badge label="On Time" variant="success" />
          </View>
        </Card>

        {/* Visual Highway Progression Timeline */}
        <View style={styles.corridorTrackCard}>
          <Text style={styles.corridorHeading}>Corridor Live Progression</Text>
          <Text style={styles.corridorSub}>Sukkur to Obuaro Express Highway (118 km)</Text>

          <View style={styles.timelineList}>
            {ALL_STOPS.map((stop, idx) => {
              const isPast = idx < currentStopIndex;
              const isCurrent = idx === currentStopIndex;
              const isFuture = idx > currentStopIndex;

              return (
                <View key={stop.id} style={styles.timelineItem}>
                  {/* Node icon column */}
                  <View style={styles.nodeColumn}>
                    {isCurrent ? (
                      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                        <View style={styles.busMarker}>
                          <BusIcon size={18} color={colors.textWhite} />
                        </View>
                      </Animated.View>
                    ) : (
                      <View
                        style={[
                          styles.normalDot,
                          isPast ? styles.pastDot : null,
                          isFuture ? styles.futureDot : null,
                        ]}
                      />
                    )}

                    {idx < ALL_STOPS.length - 1 && (
                      <View
                        style={[
                          styles.trackSegment,
                          isPast ? styles.pastSegment : null,
                          isCurrent ? styles.currentSegment : null,
                        ]}
                      />
                    )}
                  </View>

                  {/* Stop detail */}
                  <View style={styles.stopInfoBox}>
                    <View style={styles.stopNameRow}>
                      <Text
                        style={[
                          styles.stopName,
                          isCurrent ? styles.currentStopName : null,
                        ]}
                      >
                        {stop.name}
                      </Text>
                      <Text style={styles.urduText}>{stop.urduName}</Text>
                    </View>
                    <Text style={styles.stopLandmarkText}>{stop.landmark}</Text>
                    {isCurrent && (
                      <View style={styles.currentTag}>
                        <Text style={styles.currentTagText}>📍 Coach departing Ghotki Bypass</Text>
                      </View>
                    )}
                    {idx === currentStopIndex + 1 && (
                      <View style={styles.nextTag}>
                        <Text style={styles.nextTagText}>⏳ Estimated arrival in {etaMinutes} mins</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Driver Card */}
        <Card variant="dark" style={styles.driverCard}>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={{ fontSize: 26 }}>👨‍✈️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.driverName}>Captain Ghulam Rasool</Text>
              <Text style={styles.driverSub}>Senior Highway Pilot • Sukkur Central Hub</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#1F2937',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
  },
  statusCol: {
    alignItems: 'center',
  },
  statusLabel: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  liveText: {
    ...typography.caption,
    color: '#22C55E',
    fontWeight: '800',
    fontSize: 12,
  },
  vDivider: {
    width: 1.5,
    height: 28,
    backgroundColor: '#1F2937',
  },
  statusValue: {
    ...typography.label,
    fontSize: 16,
    color: colors.textWhite,
    fontWeight: '800',
    marginTop: 2,
  },
  statusValueHighlight: {
    ...typography.label,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '900',
    marginTop: 2,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    backgroundColor: colors.background,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  etaCard: {
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  etaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  etaIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaSub: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '900',
    color: colors.primaryDark,
    letterSpacing: 0.8,
  },
  etaTitle: {
    ...typography.h2,
    fontSize: 22,
    color: colors.textPrimary,
    marginTop: 2,
  },
  etaLandmark: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  corridorTrackCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...shadows.md,
  },
  corridorHeading: {
    ...typography.h3,
    fontSize: 20,
    color: colors.textPrimary,
  },
  corridorSub: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
    marginBottom: spacing.xl,
  },
  timelineList: {
    paddingLeft: spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 70,
  },
  nodeColumn: {
    alignItems: 'center',
    width: 36,
    marginRight: spacing.lg,
  },
  busMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glowOrange,
  },
  normalDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 2,
  },
  pastDot: {
    backgroundColor: colors.success,
  },
  futureDot: {
    backgroundColor: colors.surface,
    borderWidth: 2.5,
    borderColor: '#CBD5E1',
  },
  trackSegment: {
    width: 3,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 3,
  },
  pastSegment: {
    backgroundColor: colors.success,
  },
  currentSegment: {
    backgroundColor: colors.primary,
  },
  stopInfoBox: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  stopNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopName: {
    ...typography.h4,
    fontSize: 17,
    color: colors.textPrimary,
  },
  currentStopName: {
    color: colors.primaryDark,
    fontWeight: '900',
    fontSize: 18,
  },
  urduText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '800',
  },
  stopLandmarkText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  currentTag: {
    marginTop: 6,
    backgroundColor: '#FFF7ED',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderOrange,
  },
  currentTagText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  nextTag: {
    marginTop: 6,
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  nextTagText: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
  },
  driverCard: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    backgroundColor: '#111827',
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverName: {
    ...typography.h4,
    fontSize: 17,
    color: colors.textWhite,
  },
  driverSub: {
    ...typography.caption,
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
});
