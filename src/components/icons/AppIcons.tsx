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
        <Stop offset="0" stopColor="#1A2234" />
        <Stop offset="0.6" stopColor="#121826" />
        <Stop offset="1" stopColor="#090D16" />
      </LinearGradient>
      <LinearGradient id="orangeStripe" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#FF5500" />
        <Stop offset="0.7" stopColor="#FF7A33" />
        <Stop offset="1" stopColor="#D94500" />
      </LinearGradient>
      <LinearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#38BDF8" stopOpacity={0.7} />
        <Stop offset="1" stopColor="#0284C7" stopOpacity={0.3} />
      </LinearGradient>
      <LinearGradient id="roadGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="transparent" />
        <Stop offset="0.2" stopColor="#FF5500" stopOpacity={0.4} />
        <Stop offset="0.8" stopColor="#FF5500" stopOpacity={0.4} />
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
      stroke="#26334D"
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
    <Rect x="55" y="88" width="80" height="12" rx="3" fill="#090D16" opacity={0.85} />

    {/* Ultra LED Headlights (White/Cyan Glow) */}
    <Path d="M298 90H304V96H298C296.895 96 296 95.1046 296 94V92C296 90.8954 296.895 90 298 90Z" fill="#F8FAFC" />
    <Circle cx="302" cy="93" r="2.5" fill="#38BDF8" />

    {/* Taillights (Red) */}
    <Rect x="30" y="88" width="4" height="12" rx="2" fill="#EF4444" />

    {/* Wheel Well Cutouts */}
    <Circle cx="72" cy="116" r="24" fill="#090D16" />
    <Circle cx="248" cy="116" r="24" fill="#090D16" />

    {/* Front Wheel */}
    <Circle cx="248" cy="116" r="18" fill="#1A2234" stroke="#475569" strokeWidth="2" />
    <Circle cx="248" cy="116" r="10" fill="#26334D" stroke="#FF5500" strokeWidth="1.5" />
    <Circle cx="248" cy="116" r="4" fill="#E2E8F0" />

    {/* Rear Wheel */}
    <Circle cx="72" cy="116" r="18" fill="#1A2234" stroke="#475569" strokeWidth="2" />
    <Circle cx="72" cy="116" r="10" fill="#26334D" stroke="#FF5500" strokeWidth="1.5" />
    <Circle cx="72" cy="116" r="4" fill="#E2E8F0" />

    {/* Highway Speed Lines */}
    <Line x1="10" y1="50" x2="24" y2="50" stroke="#FF5500" strokeWidth="2.5" strokeLinecap="round" opacity={0.7} />
    <Line x1="2" y1="65" x2="20" y2="65" stroke="#FF5500" strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
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

export const HotelIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V21M3 21H21M3 21H1M21 21H23M7 7H9M15 7H17M7 11H9M15 11H17M10 21V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LandmarkIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 21H21M4 18H20M5 18V10M9 18V10M15 18V10M19 18V10M12 2L2 8H22L12 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({
  size = 20,
  color = '#EF4444',
  filled = false,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CoffeeIcon: React.FC<IconProps> = ({ size = 18, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8H19C20.1046 8 21 8.89543 21 10C21 11.1046 20.1046 12 19 12H18M2 8H18V15C18 17.2091 16.2091 19 14 19H6C3.79086 19 2 17.2091 2 15V8ZM6 2V4M10 2V4M14 2V4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PoolIcon: React.FC<IconProps> = ({ size = 18, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 18C4 18 5 19 7 19C9 19 10 18 12 18C14 18 15 19 17 19C19 19 20 18 22 18M2 21C4 21 5 22 7 22C9 22 10 21 12 21C14 21 15 22 17 22C19 22 20 21 22 21M17 14V6C17 4.89543 16.1046 4 15 4C13.8954 4 13 4.89543 13 6V14M13 8H17M13 11H17"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3ZM19 17L19.9 19.1L22 20L19.9 20.9L19 23L18.1 20.9L16 20L18.1 19.1L19 17ZM5 3L5.6 4.4L7 5L5.6 5.6L5 7L4.4 5.6L3 5L4.4 4.4L5 3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      fillOpacity={0.15}
    />
  </Svg>
);

export const CompassIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Path
      d="M14.5 9.5L10 10.75L9.5 14.5L14 13.25L14.5 9.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 18, color = colors.textSecondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6H20M7 12H17M10 18H14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TicketIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 8V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V8C19.8954 8 19 8.89543 19 10C19 11.1046 19.8954 12 21 12V14C19.8954 14 19 14.8954 19 16C19 17.1046 19.8954 18 21 18V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V18C4.10457 18 5 17.1046 5 16C5 14.8954 4.10457 14 3 14V12C4.10457 12 5 11.1046 5 10C5 8.89543 4.10457 8 3 8Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 12H15M9 8H15M9 16H15" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeDasharray="2 2" />
  </Svg>
);

export const CopyIcon: React.FC<IconProps> = ({ size = 18, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={9} y={9} width={13} height={13} rx={3} stroke={color} strokeWidth={2} />
    <Path
      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const RoadIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 22L8 2M20 22L16 2M12 4V7M12 11V14M12 18V21" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const GoogleIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </Svg>
);

export const FacebookIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill="#1877F2" />
    <Path
      d="M13.5 18V12.5H15.2L15.5 10.5H13.5V9.2C13.5 8.6 13.8 8.1 14.7 8.1H15.6V6.3C15.2 6.2 14.4 6.1 13.6 6.1C11.8 6.1 10.6 7.2 10.6 9.1V10.5H8.7V12.5H10.6V18H13.5Z"
      fill="#FFFFFF"
    />
  </Svg>
);

export const EyeIcon: React.FC<IconProps> = ({ size = 20, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12S5 5 12 5S23 12 23 12S19 19 12 19S1 12 1 12Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
  </Svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ size = 20, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 19C5 19 1 12 1 12A18.45 18.45 0 0 1 5.06 7.06M9.9 4.24A9.12 9.12 0 0 1 12 4C19 4 23 11 23 11A18.5 18.5 0 0 1 19.46 15.6M1 1L23 23M14.12 14.12A3 3 0 1 1 9.88 9.88"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CheckCircleFilledIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colors.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={11} fill={color} />
    <Path
      d="M8 12L10.8 14.8L16 9.6"
      stroke="#FFFFFF"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 22, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 6H20M4 12H20M4 18H20" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);


export const BookmarkIcon: React.FC<{ size?: number; color?: string; filled?: boolean }> = ({
  size = 20,
  color = colors.primary,
  filled = false,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path
      d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MountainIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 20L9.5 7L13 14L16 9L21 20H3Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={18} cy={5} r={2} fill={color} />
  </Svg>
);

export const BeachIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 8C13 14 12 17 11 20M11 20H4M11 20H18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M13 8C10 6 7 7 6 9M13 8C15 5 18 5 20 7M13 8C11 11 8 12 7 14M13 8C16 10 18 11 19 13"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <Circle cx={6} cy={5} r={2} fill={color} />
  </Svg>
);

export const LakeIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 15C5 13.5 7 13.5 9 15C11 16.5 13 16.5 15 15C17 13.5 19 13.5 21 15M4 18C6 16.5 8 16.5 10 18C12 19.5 14 19.5 16 18C18 16.5 20 16.5 21 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path d="M7 11L10 5L13 11H7Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    <Path d="M14 11L16.5 7L19 11H14Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const CampIcon: React.FC<IconProps> = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3C12 3 7 8 7 13C7 16.3137 9.68629 19 13 19C15.5 19 17.5 17.5 18 15C17.5 15 16.5 14.5 16 14C15.5 13.5 15 11.5 15 10.5C14 11.5 13 12 12 13C11 12 11 10 12 8C12.5 7 13.5 5 12 3Z"
      stroke={color}
      strokeWidth={1.8}
      fill={color}
      strokeLinejoin="round"
    />
    <Path d="M4 21L20 21M5 19L19 19" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const FlightIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
      fill={color}
    />
  </Svg>
);

export const BoatIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 18L5 20H19L21 18L22 15H2L3 18Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    <Path d="M12 4V15M12 4L18 9H12M12 6L7 10H12" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const BedIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 19V5M2 14H22M22 19V11C22 9.89543 21.1046 9 20 9H12M2 14H12M12 14V9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={7} cy={9} r={2} stroke={color} strokeWidth={1.8} />
  </Svg>
);

export const NonSmokingIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Line x1={5} y1={5} x2={19} y2={19} stroke={color} strokeWidth={2} />
    <Path d="M7 11H13M7 14H15" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const PencilEditIcon: React.FC<IconProps> = ({ size = 18, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 3L21 7L7 21H3V17L17 3Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SortFilterIcon: React.FC<IconProps> = ({ size = 20, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 6H20M4 12H15M4 18H10"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChatIcon: React.FC<IconProps> = ({ size = 22, color = '#94A3B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3H13C15.0843 3.115 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 22V12H15V22" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CloseCircleFilledIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colors.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={11} fill={color} />
    <Path
      d="M15 9L9 15M9 9L15 15"
      stroke="#FFFFFF"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 20, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PaperclipIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59714 21.9983 8.005 21.9983C6.41286 21.9983 4.8858 21.3658 3.76 20.24C2.6342 19.1142 2.00171 17.5871 2.00171 15.995C2.00171 14.4029 2.6342 12.8758 3.76 11.75L12.95 2.56C13.7006 1.80945 14.7186 1.38779 15.78 1.38779C16.8414 1.38779 17.8594 1.80945 18.61 2.56C19.3605 3.31055 19.7822 4.32858 19.7822 5.39C19.7822 6.45142 19.3605 7.46945 18.61 8.22L9.41 17.41C9.03473 17.7853 8.52571 17.9961 7.995 17.9961C7.46429 17.9961 6.95527 17.7853 6.58 17.41C6.20473 17.0347 5.99389 16.5257 5.99389 15.995C5.99389 15.4643 6.20473 14.9553 6.58 14.58L15.07 6.1"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SmileIcon: React.FC<IconProps> = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path d="M8 14C8 14 9.5 16.5 12 16.5C14.5 16.5 16 14 16 14" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={9} y1={9} x2={9.01} y2={9} stroke={color} strokeWidth={3} strokeLinecap="round" />
    <Line x1={15} y1={9} x2={15.01} y2={9} stroke={color} strokeWidth={3} strokeLinecap="round" />
  </Svg>
);

export const SendIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#FFFFFF',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const OfflineMapIcon: React.FC<IconProps> = ({ size = 28, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z"
      fill={color}
    />
    <Circle cx={12} cy={9} r={3} fill="#FFFFFF" />
    <Circle cx={17} cy={16} r={5} fill="#1E293B" />
    <Path d="M15 14L19 18M19 14L15 18" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

export const WeatherIcon: React.FC<IconProps> = ({ size = 28, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.5 19H7C4.24 19 2 16.76 2 14C2 11.5 3.84 9.42 6.27 9.06C7.14 5.54 10.28 3 14 3C18.42 3 22 6.58 22 11C22 11.34 21.97 11.67 21.93 12C22.58 12.55 23 13.37 23 14.3C23 15.96 21.66 17.3 20 17.3M17.5 19C19.43 19 21 17.43 21 15.5C21 13.57 19.43 12 17.5 12"
      fill={color}
    />
  </Svg>
);

export const TranslatorIcon: React.FC<IconProps> = ({ size = 28, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={5} width={12} height={14} rx={3} fill={color} />
    <Rect x={9} y={5} width={12} height={14} rx={3} stroke={color} strokeWidth={2} fill="none" />
    <Path d="M6 15L9 8L12 15M7 13H11" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M13 11H17M15 11V14C15 15 14 16 13 16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

export const ExchangeCurrencyIcon: React.FC<IconProps> = ({ size = 28, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={8} cy={14} r={6} fill={color} />
    <Circle cx={16} cy={10} r={6} fill={color} />
    <Path d="M8 12V16M7 13H9" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M15 8H17M15 12H17" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" />
    <Path d="M11 4L15 2M15 2V5" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const CurrencyConverterIcon: React.FC<IconProps> = ({ size = 28, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 4V20M7 20L3 16M7 20L11 16M17 20V4M17 4L21 8M17 4L13 8"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EmergencyPhoneIcon: React.FC<IconProps> = ({ size = 28, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4743 21.8325 20.7294C21.7209 20.9845 21.5573 21.2132 21.3521 21.3999C21.1469 21.5866 20.9046 21.7271 20.6407 21.8118C20.3768 21.8965 20.097 21.9235 19.82 21.89C16.7428 21.5557 13.787 20.5047 11.19 18.82C8.77382 17.2792 6.72077 15.2262 5.18 12.81C3.49003 10.203 2.43884 7.23468 2.11 4.14C2.07656 3.86377 2.10352 3.58461 2.18823 3.32131C2.27294 3.05801 2.41348 2.81643 2.59998 2.61177C2.78648 2.40711 3.01479 2.24403 3.26938 2.13289C3.52398 2.02175 3.79932 1.96502 4.077 1.966H7.077C7.56277 1.96144 8.03348 2.13459 8.39999 2.45326C8.7665 2.77193 9.00392 3.21469 9.067 3.699C9.18429 4.60677 9.40618 5.49884 9.728 6.36C9.86241 6.71698 9.89196 7.10651 9.81315 7.48006C9.73434 7.85362 9.55038 8.19522 9.284 8.46L8.014 9.73C9.44976 12.2536 11.5364 14.3402 14.06 15.776L15.33 14.506C15.6037 14.2323 15.9576 14.0435 16.3444 13.9651C16.7312 13.8867 17.1324 13.9224 17.498 14.067C18.3582 14.3912 19.2497 14.6151 20.157 14.733C20.6481 14.7969 21.0967 15.0396 21.4172 15.4137C21.7377 15.7879 21.9084 16.2678 21.897 16.76L22 16.92Z"
      fill={color}
    />
    <Circle cx={19} cy={6} r={5} fill="#EF4444" />
    <Path d="M19 4V8M17 6H21" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const EmergencyAgentIcon: React.FC<IconProps> = ({ size = 28, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={10} r={5} fill={color} />
    <Path
      d="M3 21C3 16.5817 7.02944 13 12 13C16.9706 13 21 16.5817 21 21"
      fill={color}
    />
    <Path
      d="M4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11V13H18V11C18 7.68629 15.3137 5 12 5C8.68629 5 6 7.68629 6 11V13H4V11Z"
      stroke="#1E293B"
      strokeWidth={2}
    />
    <Path d="M19 13V15C19 16.1 18.1 17 17 17H15" stroke="#1E293B" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const EditPencilIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56263 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ReceiptSearchIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M14 2V8H20" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx={11} cy={14} r={3} stroke={color} strokeWidth={2} />
    <Path d="M13.5 16.5L16 19" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const HistoryClockIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C8.13401 21 4.86392 18.5583 3.63941 15.08"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path d="M3 8V12H7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 7V12L15 15" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18H15M10 22H14M12 2C8.13401 2 5 5.13401 5 9C5 11.3821 6.19 13.4744 8 14.7432V17C8 17.5523 8.44772 18 9 18H15C15.5523 18 16 17.5523 16 17V14.7432C17.81 13.4744 19 11.3821 19 9C19 5.13401 15.866 2 12 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const DollarPaymentIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path
      d="M12 6V18M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const HelpCircleIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path
      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.39913C11.0108 7.03015 11.7301 6.87905 12.4344 6.97194C13.1387 7.06484 13.7842 7.39617 14.2587 7.90875C14.7332 8.42133 15.0093 9.08339 15.0384 9.77977C15.0675 10.4761 14.8479 11.1633 14.4179 11.722C13.9878 12.2807 13.3732 12.6773 12.68 12.8437C12.18 12.9637 12 13.4437 12 14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={17} r={1} fill={color} />
  </Svg>
);

export const InfoCircleIcon: React.FC<IconProps> = ({ size = 22, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path d="M12 16V12M12 8H12.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const MedalBadgeIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={9} r={7} fill="#F59E0B" />
    <Circle cx={12} cy={9} r={5} fill="#FBBF24" />
    <Path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" fill="#EF4444" />
    <Path d="M12 6.5L12.9 8.3L14.9 8.6L13.45 10L13.8 12L12 11.05L10.2 12L10.55 10L9.1 8.6L11.1 8.3L12 6.5Z" fill="#FFFFFF" />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 18, color = '#64748B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const SquareCloseIcon: React.FC<{ size?: number; bgColor?: string }> = ({
  size = 36,
  bgColor = '#F65D3A',
}) => (
  <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <Rect width={36} height={36} rx={8} fill={bgColor} />
    <Path d="M12 12L24 24M24 12L12 24" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);
