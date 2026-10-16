import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common/Header';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/cards/Card';
import {
  BusIcon,
  LocationPinIcon,
  ClockIcon,
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
  // Current bus simulation along stops
  const [currentStopIndex, setCurrentStopIndex] = useState(2); // At Ghotki
  const [speed, setSpeed] = useState(72); // 72 km/h
  const [etaMinutes, setEtaMinutes] = useState(14); // 14 mins to next stop

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

    // Minor simulation fluctuation
    const interval = setInterval(() => {
      setSpeed(Math.floor(68 + Math.random() * 8));
      setEtaMinutes(prev => (prev > 1 ? prev - 1 : 12));
    }, 4000);

    return () => clearInterval(interval);
  }, [pulseAnim]);

  const currentStop = ALL_STOPS[currentStopIndex];
  const nextStop = ALL_STOPS[Math.min(ALL_STOPS.length - 1, currentStopIndex + 1)];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Header
        title="Live Bus Tracking"
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
          <Text style={styles.statusLabel}>CRUISING SPEED</Text>
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
              <LocationPinIcon size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.etaSub}>APPROACHING NEXT STOP</Text>
              <Text style={styles.etaTitle}>{nextStop.name}</Text>
              <Text style={styles.etaLandmark}>{nextStop.landmark}</Text>
            </View>
            <Badge label="On Time" variant="success" />
          </View>
        </Card>

        {/* Visual Corridor Progress Timeline */}
        <View style={styles.corridorTrackCard}>
          <Text style={styles.corridorHeading}>Corridor Live Route Progression</Text>
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
                          <BusIcon size={16} color={colors.textWhite} />
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
                        <Text style={styles.currentTagText}>📍 Bus passed recently</Text>
                      </View>
                    )}
                    {idx === currentStopIndex + 1 && (
                      <View style={styles.nextTag}>
                        <Text style={styles.nextTagText}>⏳ Expected in {etaMinutes} mins</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Driver Emergency Contact */}
        <Card variant="dark" style={styles.driverCard}>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={{ fontSize: 22 }}>👨‍✈️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.driverName}>Captain Ghulam Rasool</Text>
              <Text style={styles.driverSub}>Senior Highway Pilot • Sukkur Hub</Text>
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
    backgroundColor: colors.dark,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2F2F2F',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  statusCol: {
    alignItems: 'center',
  },
  statusLabel: {
    ...typography.caption,
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  liveText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '700',
    fontSize: 10,
  },
  vDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#333',
  },
  statusValue: {
    ...typography.label,
    color: colors.textWhite,
    marginTop: 2,
  },
  statusValueHighlight: {
    ...typography.label,
    color: colors.primary,
    fontWeight: '800',
    marginTop: 2,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  etaCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  etaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  etaIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaSub: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  etaTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  etaLandmark: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  corridorTrackCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  corridorHeading: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  corridorSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  timelineList: {
    paddingLeft: spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 64,
  },
  nodeColumn: {
    alignItems: 'center',
    width: 32,
    marginRight: spacing.md,
  },
  busMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glowOrange,
  },
  normalDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 2,
  },
  pastDot: {
    backgroundColor: colors.success,
  },
  futureDot: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  trackSegment: {
    width: 3,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  pastSegment: {
    backgroundColor: colors.success,
  },
  currentSegment: {
    backgroundColor: colors.primary,
  },
  stopInfoBox: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  stopNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopName: {
    ...typography.label,
    color: colors.textPrimary,
  },
  currentStopName: {
    color: colors.primaryDark,
    fontWeight: '800',
    fontSize: 15,
  },
  urduText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  stopLandmarkText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  currentTag: {
    marginTop: 4,
    backgroundColor: '#FFF7ED',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  currentTagText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  nextTag: {
    marginTop: 4,
    backgroundColor: '#FEF3C7',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  nextTagText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
  },
  driverCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverName: {
    ...typography.label,
    color: colors.textWhite,
  },
  driverSub: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
});
