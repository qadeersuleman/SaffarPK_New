import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import {
  ArrowBackIcon,
  OfflineMapIcon,
  WeatherIcon,
  TranslatorIcon,
  ExchangeCurrencyIcon,
  CurrencyConverterIcon,
  EmergencyPhoneIcon,
  EmergencyAgentIcon,
} from '../../components/icons/AppIcons';
import { Button } from '../../components/buttons/Button';
import { FadeInUp } from '../../components/animations';

export interface ExtraServiceItem {
  id: string;
  title: string;
  icon: (color: string) => React.ReactNode;
}

const EXTRA_SERVICES_LIST: ExtraServiceItem[] = [
  {
    id: 'offline_maps',
    title: 'Offline Maps',
    icon: c => <OfflineMapIcon size={34} color={c} />,
  },
  {
    id: 'weather',
    title: 'Weather Forecast',
    icon: c => <WeatherIcon size={34} color={c} />,
  },
  {
    id: 'translator',
    title: 'Language Translator',
    icon: c => <TranslatorIcon size={34} color={c} />,
  },
  {
    id: 'exchange',
    title: 'Exchange Currency',
    icon: c => <ExchangeCurrencyIcon size={34} color={c} />,
  },
  {
    id: 'converter',
    title: 'Currency Converter',
    icon: c => <CurrencyConverterIcon size={34} color={c} />,
  },
  {
    id: 'emergency_contacts',
    title: 'Emergency Contacts',
    icon: c => <EmergencyPhoneIcon size={34} color={c} />,
  },
  {
    id: 'emergency_assistant',
    title: 'Emergency Assistant',
    icon: c => <EmergencyAgentIcon size={34} color={c} />,
  },
];

interface ExtraServicesScreenProps {
  onBack: () => void;
}

export const ExtraServicesScreen: React.FC<ExtraServicesScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Currency Converter state
  const [usdAmount, setUsdAmount] = useState('100');
  const PKR_RATE = 278.5;

  const handleCardPress = (id: string) => {
    setActiveModal(id);
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
        <Text style={styles.headerTitle}>Extra Services</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36 },
        ]}
      >
        {/* 2-Column Grid */}
        <View style={styles.gridContainer}>
          {EXTRA_SERVICES_LIST.map((service, index) => (
            <FadeInUp key={service.id} delay={index * 50}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleCardPress(service.id)}
                style={styles.serviceCard}
              >
                <View style={styles.iconCircle}>
                  {service.icon(colors.primary)}
                </View>
                <Text style={styles.cardTitle}>{service.title}</Text>
              </TouchableOpacity>
            </FadeInUp>
          ))}
        </View>
      </ScrollView>

      {/* Feature Modals */}
      <Modal
        visible={!!activeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalSheet,
              { paddingBottom: insets.bottom > 0 ? insets.bottom + 16 : 24 },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>
                {EXTRA_SERVICES_LIST.find(s => s.id === activeModal)?.title || 'Service Details'}
              </Text>
              <TouchableOpacity
                onPress={() => setActiveModal(null)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Offline Maps Modal */}
            {activeModal === 'offline_maps' && (
              <View style={styles.modalBody}>
                <Text style={styles.modalDesc}>
                  Download offline maps for uninterrupted navigation during your Pakistan journeys.
                </Text>
                {[
                  { region: 'Sukkur ⇄ Obuaro Express Highway', size: '24 MB', status: 'Installed ✓' },
                  { region: 'Gilgit-Baltistan & Karakoram Highway', size: '68 MB', status: 'Download' },
                  { region: 'Lahore & Heritage City Map', size: '42 MB', status: 'Download' },
                  { region: 'Gwadar & Coastal Highway Route', size: '36 MB', status: 'Download' },
                ].map((m, idx) => (
                  <View key={idx} style={styles.mapItemRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.mapName}>{m.region}</Text>
                      <Text style={styles.mapSize}>{m.size}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => Alert.alert('Offline Map', `${m.region} map is ready for offline travel.`)}
                      style={[
                        styles.mapDownloadBtn,
                        m.status.includes('Installed') && { backgroundColor: '#10B981' },
                      ]}
                    >
                      <Text style={styles.mapDownloadText}>{m.status}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Weather Modal */}
            {activeModal === 'weather' && (
              <View style={styles.modalBody}>
                {[
                  { city: 'Hunza Valley', temp: '16°C', cond: 'Sunny & Clear ☀️' },
                  { city: 'Skardu', temp: '14°C', cond: 'Mild Breeze 🌤️' },
                  { city: 'Sukkur', temp: '29°C', cond: 'Pleasant Warm ☀️' },
                  { city: 'Lahore', temp: '27°C', cond: 'Clear Sky 🌤️' },
                  { city: 'Gwadar Beach', temp: '28°C', cond: 'Sea Breeze 🌊' },
                ].map((w, idx) => (
                  <View key={idx} style={styles.weatherRow}>
                    <Text style={styles.weatherCity}>{w.city}</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.weatherTemp}>{w.temp}</Text>
                      <Text style={styles.weatherCond}>{w.cond}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Language Translator */}
            {activeModal === 'translator' && (
              <View style={styles.modalBody}>
                <Text style={styles.modalDesc}>
                  Key regional travel phrases across Pakistan:
                </Text>
                {[
                  { en: 'Welcome / Hello', urdu: 'Khush Amdeed / Assalam-o-Alaikum', sindhi: 'Bhali Kar Aaya' },
                  { en: 'How much is this?', urdu: 'Yeh kitnay ka hai?', sindhi: 'Hee kithray jo aahay?' },
                  { en: 'Where is the bus terminal?', urdu: 'Bus adda kahan hai?', sindhi: 'Bus addo kithe aahay?' },
                  { en: 'Thank you very much', urdu: 'Shukriya / Boht Nawazish', sindhi: 'Meharbani' },
                ].map((t, idx) => (
                  <View key={idx} style={styles.phraseCard}>
                    <Text style={styles.phraseEn}>{t.en}</Text>
                    <Text style={styles.phraseUrdu}>🇵🇰 Urdu: {t.urdu}</Text>
                    <Text style={styles.phraseSindhi}>Sindhi: {t.sindhi}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Currency Converter */}
            {(activeModal === 'converter' || activeModal === 'exchange') && (
              <View style={styles.modalBody}>
                <Text style={styles.modalDesc}>
                  Live Interbank Exchange Rate: 1 USD = 278.50 PKR
                </Text>

                <View style={styles.convertBox}>
                  <Text style={styles.convertLabel}>Amount in USD ($)</Text>
                  <TextInput
                    value={usdAmount}
                    onChangeText={setUsdAmount}
                    keyboardType="numeric"
                    style={styles.convertInput}
                  />
                </View>

                <View style={styles.convertResultCard}>
                  <Text style={styles.convertResultLabel}>Converted to Pakistani Rupees (PKR)</Text>
                  <Text style={styles.convertResultNumber}>
                    PKR {(parseFloat(usdAmount || '0') * PKR_RATE).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Text>
                </View>

                <View style={{ marginTop: 12, gap: 6 }}>
                  <Text style={styles.rateNote}>• 1 AED = 75.80 PKR</Text>
                  <Text style={styles.rateNote}>• 1 SAR = 74.25 PKR</Text>
                  <Text style={styles.rateNote}>• 1 EUR = 302.40 PKR</Text>
                </View>
              </View>
            )}

            {/* Emergency Contacts */}
            {activeModal === 'emergency_contacts' && (
              <View style={styles.modalBody}>
                {[
                  { name: 'Rescue 1122 Pakistan', num: '1122', desc: 'Medical & Disaster Response' },
                  { name: 'National Highway & Motorway Police', num: '130', desc: 'Emergency Roadside Assistance' },
                  { name: 'Edhi Ambulance Services', num: '115', desc: '24/7 Nationwide Ambulance' },
                  { name: 'Pakistan Tourism Helpline', num: '1422', desc: 'Traveler Support & Guidance' },
                ].map((em, idx) => (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => Alert.alert('Dial Emergency', `Calling ${em.name} (${em.num})`)}
                    style={styles.emergencyRow}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.emName}>{em.name}</Text>
                      <Text style={styles.emDesc}>{em.desc}</Text>
                    </View>
                    <View style={styles.dialPill}>
                      <Text style={styles.dialText}>📞 {em.num}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Emergency Assistant */}
            {activeModal === 'emergency_assistant' && (
              <View style={styles.modalBody}>
                <View style={styles.sosCard}>
                  <Text style={styles.sosTitle}>🚨 24/7 Saffar SOS Concierge</Text>
                  <Text style={styles.sosDesc}>
                    Need immediate roadside support, bus conductor coordination, or medical guidance on the Sukkur ⇄ Obuaro route? Our dedicated control center is online.
                  </Text>
                  <Button
                    title="Connect With SOS Agent"
                    variant="primary"
                    onPress={() => {
                      Alert.alert('Connecting SOS Agent', 'Emergency control room notified. A dedicated coordinator is calling your verified phone number.');
                      setActiveModal(null);
                    }}
                    style={{ backgroundColor: '#EF4444', height: 48, borderRadius: 12, marginTop: 12 }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  serviceCard: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '700',
  },
  modalBody: {
    marginTop: 4,
  },
  modalDesc: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
    lineHeight: 18,
  },
  mapItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  mapName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  mapSize: {
    fontSize: 11,
    color: '#94A3B8',
  },
  mapDownloadBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapDownloadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  weatherCity: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  weatherTemp: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  weatherCond: {
    fontSize: 11,
    color: '#64748B',
  },
  phraseCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  phraseEn: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  phraseUrdu: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  phraseSindhi: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  convertBox: {
    marginBottom: 12,
  },
  convertLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  convertInput: {
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  convertResultCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
    alignItems: 'center',
  },
  convertResultLabel: {
    fontSize: 12,
    color: '#9A3412',
    fontWeight: '600',
  },
  convertResultNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  rateNote: {
    fontSize: 12,
    color: '#64748B',
  },
  emergencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  emName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  emDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  dialPill: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  dialText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  sosCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  sosTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: 6,
  },
  sosDesc: {
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 18,
  },
});

