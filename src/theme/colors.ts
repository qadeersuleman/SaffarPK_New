export const colors = {
  // Electric Flame / Modern Mobility Orange (Punchy, energetic, ultra-premium)
  primary: '#FF5500',
  primaryDark: '#D94500',
  primaryLight: '#FFF0EB',
  primaryGlow: 'rgba(255, 85, 0, 0.35)',
  primaryMuted: '#FF8A50',

  // Clean Crisp Luxury Canvas (Zero dingy or yellowish tint)
  background: '#F3F5F9', // Ultra-clean premium slate-blue canvas
  backgroundLight: '#FFFFFF',
  surface: '#FFFFFF', // Pristine white cards
  surfaceSubtle: '#F8FAFC',
  surfaceElevated: '#FFFFFF',

  // Deep Midnight Obsidian (Rich contrast like Apple & Uber Black)
  dark: '#090D16', // Pure midnight obsidian
  darkCard: '#121826',
  darkElevated: '#1A2234',
  darkBorder: '#26334D',

  // Crisp High-Contrast Typography
  textPrimary: '#0B0F19', // Jet black
  textSecondary: '#475569', // Sophisticated slate
  textMuted: '#94A3B8', // Soft neutral
  textWhite: '#FFFFFF',
  textLight: '#E2E8F0',

  // Refined Micro-Borders
  border: '#E2E8F0',
  borderLight: '#EDF2F7',
  borderOrange: '#FFCCBA',
  borderDark: '#1E293B',

  // Modern State Accents
  success: '#10B981', // Crisp emerald
  successLight: '#ECFDF5',
  successDark: '#047857',

  warning: '#F59E0B',
  warningLight: '#FEF3C7',

  error: '#EF4444',
  errorLight: '#FEE2E2',

  accentBlue: '#3B82F6',
  accentBlueLight: '#EFF6FF',

  // VIP Bus Seats
  seatAvailable: '#FFFFFF',
  seatSelected: '#FF5500',
  seatBooked: '#E2E8F0',
  seatFemale: '#FFF1F2',
  seatFemaleBorder: '#FDA4AF',
};

export const shadows = {
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  glowOrange: {
    shadowColor: '#FF5500',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 16,
    elevation: 8,
  },
  glowDark: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
};
