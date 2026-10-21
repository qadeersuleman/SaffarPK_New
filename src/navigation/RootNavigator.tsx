import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { BusIcon, LocationPinIcon, CalendarIcon, UserIcon } from '../components/icons/AppIcons';
import { ScalePressable } from '../components/animations';
import { SplashScreen } from '../screens/splash/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { SeatSelectionScreen } from '../screens/seats/SeatSelectionScreen';
import { PassengerDetailsScreen } from '../screens/passenger/PassengerDetailsScreen';
import { PaymentScreen } from '../screens/payment/PaymentScreen';
import { TicketScreen } from '../screens/tickets/TicketScreen';
import { TrackingScreen } from '../screens/tracking/TrackingScreen';
import { TripsScreen } from '../screens/trips/TripsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { RouteStop, BusSchedule, PassengerInfo, Booking, PaymentMethod } from '../types';
import routesData from '../data/routes.json';

type ActiveFlow =
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'main'
  | 'search'
  | 'seats'
  | 'passenger'
  | 'payment'
  | 'ticket';

type MainTab = 'home' | 'trips' | 'track' | 'profile';

export const RootNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [currentFlow, setCurrentFlow] = useState<ActiveFlow>('splash');
  const [activeTab, setActiveTab] = useState<MainTab>('home');

  // User state
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  // Booking Flow State
  const [searchParams, setSearchParams] = useState<{
    origin: RouteStop;
    destination: RouteStop;
    date: string;
    passengers: number;
  }>({
    origin: routesData.stops[0],
    destination: routesData.stops[routesData.stops.length - 1],
    date: 'Today',
    passengers: 1,
  });

  const [selectedSchedule, setSelectedSchedule] = useState<BusSchedule | null>(null);
  const [calculatedFare, setCalculatedFare] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalFare, setTotalFare] = useState<number>(0);
  const [passengerDetails, setPassengerDetails] = useState<PassengerInfo | null>(null);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  // Dummy Initial Bookings for My Trips
  const [allBookings, setAllBookings] = useState<Booking[]>([
    {
      bookingId: 'BK-1001',
      bookingRef: 'SFK-9901-EX',
      scheduleId: 'SCH-101',
      busName: 'Saffar Prime Executive',
      busCategory: 'Executive',
      originStop: routesData.stops[0], // Sukkur
      destinationStop: routesData.stops[2], // Ghotki
      departureDate: 'Today',
      departureTime: '07:00 AM',
      seats: ['3A', '3B'],
      passenger: {
        fullName: 'Muhammad Ali',
        phoneNumber: '03001234567',
        gender: 'male',
      },
      fareBreakdown: {
        seatFare: 1200,
        serviceFee: 30,
        totalAmount: 1230,
      },
      paymentMethod: 'easypaisa',
      paymentStatus: 'paid',
      ticketStatus: 'confirmed',
      qrCodePayload: 'SFK-9901-EX-SUKKUR-GHOTKI-3A-3B',
      createdAt: '2026-10-16 04:30',
    },
  ]);

  // Handlers
  const handleSearch = (params: typeof searchParams) => {
    setSearchParams(params);
    setCurrentFlow('search');
  };

  const handleSelectSchedule = (schedule: BusSchedule, fare: number) => {
    setSelectedSchedule(schedule);
    setCalculatedFare(fare);
    setCurrentFlow('seats');
  };

  const handleSeatsProceed = (seats: string[], fare: number) => {
    setSelectedSeats(seats);
    setTotalFare(fare);
    setCurrentFlow('passenger');
  };

  const handlePassengerProceed = (passenger: PassengerInfo) => {
    setPassengerDetails(passenger);
    setCurrentFlow('payment');
  };

  const handlePaymentSuccess = (method: PaymentMethod, txnId: string) => {
    if (!selectedSchedule || !passengerDetails) return;

    const newBooking: Booking = {
      bookingId: `BK-${Date.now().toString().slice(-4)}`,
      bookingRef: `SFK-${Math.floor(1000 + Math.random() * 9000)}-${selectedSchedule.busCategory.slice(0, 2).toUpperCase()}`,
      scheduleId: selectedSchedule.id,
      busName: selectedSchedule.busName,
      busCategory: selectedSchedule.busCategory,
      originStop: searchParams.origin,
      destinationStop: searchParams.destination,
      departureDate: searchParams.date,
      departureTime: selectedSchedule.departureTime,
      seats: selectedSeats,
      passenger: passengerDetails,
      fareBreakdown: {
        seatFare: totalFare,
        serviceFee: 30,
        totalAmount: totalFare + 30,
      },
      paymentMethod: method,
      paymentStatus: 'paid',
      ticketStatus: 'confirmed',
      qrCodePayload: `SFK-TICKET-${txnId}-${selectedSeats.join('-')}`,
      createdAt: new Date().toISOString(),
    };

    setLatestBooking(newBooking);
    setAllBookings([newBooking, ...allBookings]);
    setCurrentFlow('ticket');
  };

  // Render Flows
  if (currentFlow === 'splash') {
    return <SplashScreen onFinish={() => setCurrentFlow('onboarding')} />;
  }

  if (currentFlow === 'onboarding') {
    return <OnboardingScreen onComplete={() => setCurrentFlow('auth')} />;
  }

  if (currentFlow === 'auth') {
    return (
      <LoginScreen
        onSuccess={loggedUser => {
          setUser(loggedUser);
          setCurrentFlow('main');
        }}
        onSkipGuest={() => {
          setUser(null);
          setCurrentFlow('main');
        }}
      />
    );
  }

  if (currentFlow === 'search') {
    return (
      <SearchScreen
        origin={searchParams.origin}
        destination={searchParams.destination}
        travelDate={searchParams.date}
        passengers={searchParams.passengers}
        onBack={() => setCurrentFlow('main')}
        onSelectSchedule={handleSelectSchedule}
      />
    );
  }

  if (currentFlow === 'seats' && selectedSchedule) {
    return (
      <SeatSelectionScreen
        schedule={selectedSchedule}
        origin={searchParams.origin}
        destination={searchParams.destination}
        farePerSeat={calculatedFare}
        passengerCount={searchParams.passengers}
        onBack={() => setCurrentFlow('search')}
        onProceed={handleSeatsProceed}
      />
    );
  }

  if (currentFlow === 'passenger' && selectedSchedule) {
    return (
      <PassengerDetailsScreen
        schedule={selectedSchedule}
        origin={searchParams.origin}
        destination={searchParams.destination}
        selectedSeats={selectedSeats}
        totalFare={totalFare}
        initialPassenger={user || undefined}
        onBack={() => setCurrentFlow('seats')}
        onProceedToPayment={handlePassengerProceed}
      />
    );
  }

  if (currentFlow === 'payment') {
    return (
      <PaymentScreen
        amount={totalFare + 30}
        passengerPhone={passengerDetails?.phoneNumber || user?.phone || '03001234567'}
        onBack={() => setCurrentFlow('passenger')}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  if (currentFlow === 'ticket' && latestBooking) {
    return (
      <TicketScreen
        booking={latestBooking}
        onTrackBus={() => {
          setActiveTab('track');
          setCurrentFlow('main');
        }}
        onHome={() => {
          setActiveTab('home');
          setCurrentFlow('main');
        }}
      />
    );
  }

  // Main Bottom-Tab Layout
  return (
    <View style={styles.mainContainer}>
      <View style={styles.tabContent}>
        {activeTab === 'home' && (
          <HomeScreen
            userName={user?.name || 'Traveler'}
            onSearch={handleSearch}
            onNavigateToTracking={() => setActiveTab('track')}
          />
        )}
        {activeTab === 'trips' && (
          <TripsScreen
            bookings={allBookings}
            onSelectBooking={booking => {
              setLatestBooking(booking);
              setCurrentFlow('ticket');
            }}
            onTrackBus={() => setActiveTab('track')}
            onNewBooking={() => setActiveTab('home')}
          />
        )}
        {activeTab === 'track' && (
          <TrackingScreen onBack={() => setActiveTab('home')} />
        )}
        {activeTab === 'profile' && (
          <ProfileScreen
            user={user || undefined}
            onLogout={() => {
              setUser(null);
              setCurrentFlow('auth');
            }}
          />
        )}
      </View>

      {/* Modern High-End Bottom Navigation Bar */}
      <View
        style={[
          styles.bottomNav,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : spacing.md,
          },
        ]}
      >
        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('home')}
          style={[styles.navItem, activeTab === 'home' ? styles.navItemActive : null]}
        >
          <BusIcon size={24} color={activeTab === 'home' ? colors.primary : '#94A3B8'} />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'home' ? styles.navLabelActive : null,
            ]}
          >
            Home
          </Text>
        </ScalePressable>

        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('trips')}
          style={[styles.navItem, activeTab === 'trips' ? styles.navItemActive : null]}
        >
          <CalendarIcon size={24} color={activeTab === 'trips' ? colors.primary : '#94A3B8'} />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'trips' ? styles.navLabelActive : null,
            ]}
          >
            My Trips
          </Text>
        </ScalePressable>

        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('track')}
          style={[styles.navItem, activeTab === 'track' ? styles.navItemActive : null]}
        >
          <LocationPinIcon size={24} color={activeTab === 'track' ? colors.primary : '#94A3B8'} />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'track' ? styles.navLabelActive : null,
            ]}
          >
            Live Track
          </Text>
        </ScalePressable>

        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('profile')}
          style={[styles.navItem, activeTab === 'profile' ? styles.navItemActive : null]}
        >
          <UserIcon size={24} color={activeTab === 'profile' ? colors.primary : '#94A3B8'} />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'profile' ? styles.navLabelActive : null,
            ]}
          >
            Profile
          </Text>
        </ScalePressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContent: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    borderTopWidth: 1.5,
    borderTopColor: '#E2E8F0',
    ...shadows.lg,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navItemActive: {},
  navLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 3,
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: '900',
  },
});
