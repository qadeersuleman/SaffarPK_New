import React from 'react';
import Svg, {
  Path,
  Circle,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
  Line,
} from 'react-native-svg';
import { colors } from '../../theme';

interface IconProps {
  size?: number;
  color?: string;
}

export const BusIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H6.5M20 16C20 16.5304 19.7893 17.0391 19.4142 17.4142C19.0391 17.7893 18.5304 18 18 18H17.5M4 16V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V16M4 16H20M6.5 18H17.5M6.5 18C6.5 18.7956 6.81607 19.5587 7.37868 20.1213C7.94129 20.6839 8.70435 21 9.5 21C10.2956 21 11.0587 20.6839 11.6213 20.1213C12.1839 19.5587 12.5 18.7956 12.5 18M17.5 18C17.5 18.7956 17.1839 19.5587 16.6213 20.1213C16.0587 20.6839 15.2956 21 14.5 21C13.7044 21 12.9413 20.6839 12.3787 20.1213C11.8161 19.5587 11.5 18.7956 11.5 18M7 8H9M15 8H17M7 12H17"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LocationPinIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={10} r={3} stroke={color} strokeWidth={2} />
  </Svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={4} width={18} height={18} rx={4} stroke={color} strokeWidth={2} />
    <Path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Circle cx={8} cy={15} r={1} fill={color} />
    <Circle cx={12} cy={15} r={1} fill={color} />
    <Circle cx={16} cy={15} r={1} fill={color} />
  </Svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={2} />
  </Svg>
);

export const SwapIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 4V20M7 4L3 8M7 4L11 8M17 20V4M17 20L21 16M17 20L13 16"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 20, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Path d="M12 7V12L15 15" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 20, color = colors.success }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowBackIcon: React.FC<IconProps> = ({ size = 24, color = colors.dark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowForwardIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 18, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </Svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 20, color = colors.success }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 12L11 14L15 10" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const SteeringWheelIcon: React.FC<IconProps> = ({ size = 24, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
    <Path d="M12 3V9M12 15V21M3 12H9M15 12H21" stroke={color} strokeWidth={2} />
  </Svg>
);

export const QrCodeIcon: React.FC<IconProps> = ({ size = 24, color = colors.dark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={3} width={7} height={7} rx={1} stroke={color} strokeWidth={2} />
    <Rect x={5} y={5} width={3} height={3} fill={color} />
    <Rect x={14} y={3} width={7} height={7} rx={1} stroke={color} strokeWidth={2} />
    <Rect x={16} y={5} width={3} height={3} fill={color} />
    <Rect x={3} y={14} width={7} height={7} rx={1} stroke={color} strokeWidth={2} />
    <Rect x={5} y={16} width={3} height={3} fill={color} />
    <Path d="M14 14H17V17H14V14ZM17 17H20V20H17V17ZM14 17V20M20 14V17" stroke={color} strokeWidth={2} />
  </Svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22 20.48 21.54 20.95 20.97 20.99C18.24 21.19 15.58 20.25 13.41 18.66C11.4 17.18 9.77 15.22 8.35 12.98C7.14 11.08 6.38 8.87 6.07 6.57C6.01 6.03 6.45 5.56 7 5.56H10C10.55 5.56 11 5.96 11.09 6.51C11.25 7.48 11.57 8.42 12.04 9.29C12.22 9.63 12.14 10.05 11.84 10.31L10.59 11.38C11.75 13.62 13.56 15.43 15.8 16.59L16.87 15.34C17.13 15.04 17.55 14.96 17.89 15.14C18.76 15.61 19.7 15.93 20.67 16.09C21.22 16.18 21.62 16.63 21.62 17.18L22 16.92Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
    <Path d="M20 20L16 16" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

export const WifiIcon: React.FC<IconProps> = ({ size = 18, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12.55C7.03 10.66 9.49 9.5 12 9.5C14.51 9.5 16.97 10.66 19 12.55M1.42 9C4.54 6.16 8.16 4.5 12 4.5C15.84 4.5 19.46 6.16 22.58 9M8.53 16.11C9.57 15.19 10.75 14.65 12 14.65C13.25 14.65 14.43 15.19 15.47 16.11M12 20H12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlugIcon: React.FC<IconProps> = ({ size = 18, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22V17M9 2V8M15 2V8M6 8H18V13C18 15.2091 16.2091 17 14 17H10C7.79086 17 6 15.2091 6 13V8Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const AcIcon: React.FC<IconProps> = ({ size = 18, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07M8 2L12 6L16 2M8 22L12 18L16 22M2 8L6 12L2 16M22 8L18 12L22 16"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LuggageIcon: React.FC<IconProps> = ({ size = 20, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={6} y={7} width={12} height={14} rx={3} stroke={color} strokeWidth={2} />
    <Path d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7M9 11V17M15 11V17" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

/**
 * High-End Luxury Coach Vector Illustration
 */
export const BusIllustration: React.FC<{ width?: number; height?: number }> = ({
  width = 280,
  height = 130,
}) => (
  <Svg width={width} height={height} viewBox="0 0 320 150" fill="none">
    <Defs>
      <LinearGradient id="busBodyGrad" x1="0" y1="0" x2="320" y2="150" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#1E1E24" />
        <Stop offset="0.6" stopColor="#171717" />
        <Stop offset="1" stopColor="#0B0B0E" />
      </LinearGradient>
      <LinearGradient id="orangeStripe" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#F97316" />
        <Stop offset="0.7" stopColor="#FB923C" />
        <Stop offset="1" stopColor="#EA580C" />
      </LinearGradient>
      <LinearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#38BDF8" stopOpacity={0.65} />
        <Stop offset="1" stopColor="#0284C7" stopOpacity={0.25} />
      </LinearGradient>
      <LinearGradient id="roadGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="transparent" />
        <Stop offset="0.2" stopColor="#F97316" stopOpacity={0.4} />
        <Stop offset="0.8" stopColor="#F97316" stopOpacity={0.4} />
        <Stop offset="1" stopColor="transparent" />
      </LinearGradient>
    </Defs>

    {/* Ground Shadow & Speed glow */}
    <Rect x="20" y="132" width="280" height="8" rx="4" fill="url(#roadGrad)" />
    <Circle cx="65" cy="132" r="14" fill="#000000" opacity={0.35} />
    <Circle cx="255" cy="132" r="14" fill="#000000" opacity={0.35} />

    {/* Bus Main Chassis Shell */}
    <Path
      d="M32 112H288C296.837 112 304 104.837 304 96V56C304 42.7452 293.255 32 280 32H60C44.536 32 32 44.536 32 60V112Z"
      fill="url(#busBodyGrad)"
      stroke="#2D3139"
      strokeWidth="2.5"
    />

    {/* Front Aerodynamic Windshield */}
    <Path
      d="M260 38H278C286.837 38 294 45.1634 294 54V74H260V38Z"
      fill="url(#glassGrad)"
      stroke="#38BDF8"
      strokeWidth="1.2"
    />

    {/* Executive Passenger Tinted Windows */}
    <Rect x="44" y="38" width="34" height="36" rx="4" fill="url(#glassGrad)" />
    <Rect x="84" y="38" width="38" height="36" rx="4" fill="url(#glassGrad)" />
    <Rect x="128" y="38" width="38" height="36" rx="4" fill="url(#glassGrad)" />
    <Rect x="172" y="38" width="38" height="36" rx="4" fill="url(#glassGrad)" />
    <Rect x="216" y="38" width="38" height="36" rx="4" fill="url(#glassGrad)" />

    {/* SaffarPK Iconic Dynamic Orange Stripe */}
    <Path
      d="M32 82L230 82C240 82 250 86 256 94L264 104H32V82Z"
      fill="url(#orangeStripe)"
    />

    {/* Brand Name on Livery */}
    <Rect x="55" y="88" width="80" height="12" rx="3" fill="#171717" opacity={0.8} />

    {/* Ultra LED Headlights (White/Cyan Glow) */}
    <Path d="M298 90H304V96H298C296.895 96 296 95.1046 296 94V92C296 90.8954 296.895 90 298 90Z" fill="#F8FAFC" />
    <Circle cx="302" cy="93" r="2.5" fill="#38BDF8" />

    {/* Taillights (Red) */}
    <Rect x="30" y="88" width="4" height="12" rx="2" fill="#EF4444" />

    {/* Wheel Well Cutouts */}
    <Circle cx="72" cy="116" r="24" fill="#0A0A0C" />
    <Circle cx="248" cy="116" r="24" fill="#0A0A0C" />

    {/* Front Wheel */}
    <Circle cx="248" cy="116" r="18" fill="#1E293B" stroke="#475569" strokeWidth="2" />
    <Circle cx="248" cy="116" r="10" fill="#334155" stroke="#F97316" strokeWidth="1.5" />
    <Circle cx="248" cy="116" r="4" fill="#E2E8F0" />

    {/* Rear Wheel */}
    <Circle cx="72" cy="116" r="18" fill="#1E293B" stroke="#475569" strokeWidth="2" />
    <Circle cx="72" cy="116" r="10" fill="#334155" stroke="#F97316" strokeWidth="1.5" />
    <Circle cx="72" cy="116" r="4" fill="#E2E8F0" />

    {/* Highway Speed Lines */}
    <Line x1="10" y1="50" x2="24" y2="50" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />
    <Line x1="2" y1="65" x2="20" y2="65" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" opacity={0.4} />
  </Svg>
);

/**
 * Easypaisa Official Brand Logo Component
 */
export const EasypaisaLogo: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Circle cx="50" cy="50" r="48" fill="#059669" />
    <Path
      d="M32 30H68C72.4183 30 76 33.5817 76 38V42C76 46.4183 72.4183 50 68 50H46V54H66C69.3137 54 72 56.6863 72 60V62C72 65.3137 69.3137 68 66 68H32V30Z"
      fill="#FFFFFF"
    />
    <Rect x="46" y="38" width="16" height="6" rx="2" fill="#059669" />
  </Svg>
);

/**
 * JazzCash Official Brand Logo Component
 */
export const JazzCashLogo: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <Circle cx="50" cy="50" r="48" fill="#B91C1C" />
    <Path
      d="M32 30H68L50 68H32L46 44H32V30Z"
      fill="#F59E0B"
    />
    <Circle cx="64" cy="62" r="8" fill="#FFFFFF" />
  </Svg>
);
