export interface RouteStop {
  id: string;
  name: string;
  urduName: string;
  sequence: number;
  landmark: string;
  latitude: number;
  longitude: number;
}

export interface BusRoute {
  routeId: string;
  routeName: string;
  direction: 'northbound' | 'southbound'; // Sukkur to Obuaro is Northbound, Obuaro to Sukkur is Southbound
  origin: string;
  destination: string;
  stops: RouteStop[];
  totalDistanceKm: number;
  estimatedDurationMinutes: number;
}

export type BusCategory = 'Executive' | 'Standard' | 'Royal';

export interface BusAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface BusVehicle {
  id: string;
  name: string;
  operator: string;
  category: BusCategory;
  registrationNumber: string;
  totalSeats: number;
  rating: number;
  amenities: string[];
  layout: {
    rows: number;
    leftSeatsPerRow: number;
    rightSeatsPerRow: number;
    hasBackRow: boolean;
  };
}

export interface ScheduleStopTiming {
  stopId: string;
  stopName: string;
  scheduledTime: string;
  sequence: number;
}

export interface BusSchedule {
  id: string;
  routeId: string;
  busId: string;
  busName: string;
  busCategory: BusCategory;
  bus: BusVehicle;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  originStopId: string;
  destinationStopId: string;
  stopTimings: ScheduleStopTiming[];
  baseFare: number;
  availableSeatsCount: number;
  status: 'on_time' | 'boarding' | 'departed' | 'delayed' | 'completed';
}

export type SeatStatus = 'available' | 'selected' | 'booked' | 'female_reserved';

export interface SeatItem {
  id: string;
  seatNumber: string;
  row: number;
  col: number; // 0: left outer, 1: left inner, 2: right inner, 3: right outer
  status: SeatStatus;
  genderRestriction?: 'none' | 'female_only';
  priceMultiplier?: number;
}

export interface PassengerInfo {
  fullName: string;
  phoneNumber: string; // e.g. 03001234567
  cnic?: string;
  gender: 'male' | 'female';
}

export type PaymentMethod = 'easypaisa' | 'jazzcash' | 'demo';

export interface Booking {
  bookingId: string;
  bookingRef: string; // e.g. SFK-2026-8910
  scheduleId: string;
  busName: string;
  busCategory: BusCategory;
  originStop: RouteStop;
  destinationStop: RouteStop;
  departureDate: string;
  departureTime: string;
  seats: string[];
  passenger: PassengerInfo;
  fareBreakdown: {
    seatFare: number;
    serviceFee: number;
    totalAmount: number;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  ticketStatus: 'confirmed' | 'cancelled' | 'used';
  qrCodePayload: string;
  createdAt: string;
}

export interface LiveBusLocation {
  busId: string;
  scheduleId: string;
  currentLatitude: number;
  currentLongitude: number;
  currentStopId: string;
  nextStopId: string;
  etaMinutesNextStop: number;
  speedKmH: number;
  isDelayed: boolean;
  delayMinutes: number;
  lastUpdated: string;
}

