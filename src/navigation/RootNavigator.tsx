import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import {
  HomeIcon,
  BookmarkIcon,
  BellIcon,
  ChatIcon,
  BusIcon,
  LocationPinIcon,
  CalendarIcon,
  UserIcon,
} from '../components/icons/AppIcons';
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

// New Screens matching Figma Prototypes
import { SearchHotelScreen } from '../screens/search/SearchHotelScreen';
import { HotelSearchScreen, HotelSearchResultItem } from '../screens/search/HotelSearchScreen';
import { HotelDetailsScreen, HotelDetailsData } from '../screens/hotel/HotelDetailsScreen';
import { SelectRoomScreen, RoomItem } from '../screens/hotel/SelectRoomScreen';
import { NotificationScreen } from '../screens/notifications/NotificationScreen';
import { SavedScreen } from '../screens/saved/SavedScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { ConversationScreen } from '../screens/chat/ConversationScreen';
import { MostVisitedScreen, FamousPlaceItem } from '../screens/places/MostVisitedScreen';
import { PlaceDetailsScreen } from '../screens/places/PlaceDetailsScreen';
import { ServicesScreen, ServiceItem } from '../screens/services/ServicesScreen';
import { CategoriesScreen, CategoryGridItem } from '../screens/categories/CategoriesScreen';
import { ExtraServicesScreen } from '../screens/services/ExtraServicesScreen';

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
  | 'ticket'
  | 'search_hotel'
  | 'hotel_search'
  | 'hotel_details'
  | 'select_room'
  | 'notifications'
  | 'most_visited'
  | 'place_details'
  | 'services'
  | 'categories'
  | 'extra_services'
  | 'profile';

type MainTab = 'home' | 'saved' | 'notification' | 'chat';

export const RootNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [currentFlow, setCurrentFlow] = useState<ActiveFlow>('splash');
  const [activeTab, setActiveTab] = useState<MainTab>('home');

  // User state
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  // Selected hotel/place state for details & room selection
  const [selectedHotel, setSelectedHotel] = useState<any>(null);

  // Hotel Search Criteria state
  const [hotelSearchCriteria, setHotelSearchCriteria] = useState({
    location: 'Hunza Valley, Gilgit-Baltistan',
    checkIn: '25 July',
    checkOut: '27 July',
    guests: '02 Guests',
    rooms: '01 Room',
  });

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
          setActiveTab('home');
          setCurrentFlow('main');
        }}
        onHome={() => {
          setActiveTab('home');
          setCurrentFlow('main');
        }}
      />
    );
  }

  // 1. Search Hotel Form flow (Figma Image: Search Hotel)
  if (currentFlow === 'search_hotel') {
    return (
      <SearchHotelScreen
        onBack={() => setCurrentFlow('main')}
        onSearch={params => {
          setHotelSearchCriteria(params);
          setCurrentFlow('hotel_search');
        }}
      />
    );
  }

  // 2. Hotel Search Results flow (Figma Image: Search Results)
  if (currentFlow === 'hotel_search') {
    return (
      <HotelSearchScreen
        initialLocation={hotelSearchCriteria.location}
        initialDates={`${hotelSearchCriteria.checkIn} to ${hotelSearchCriteria.checkOut}`}
        initialGuests={`${hotelSearchCriteria.guests} | ${hotelSearchCriteria.rooms}`}
        onBack={() => setCurrentFlow('main')}
        onSelectHotel={hotel => {
          setSelectedHotel(hotel);
          setCurrentFlow('hotel_details');
        }}
      />
    );
  }

  // 3. Most Visited Screen (Figma Image: Most Visited Places in Pakistan)
  if (currentFlow === 'most_visited') {
    return (
      <MostVisitedScreen
        onBack={() => setCurrentFlow('main')}
        onSelectPlace={place => {
          setSelectedHotel({
            id: place.id,
            name: place.name,
            location: `${place.location}, ${place.country}`,
            pricePerNight: place.price,
            currency: place.currency,
            rating: place.rating,
            image: place.image,
          });
          setCurrentFlow('hotel_details');
        }}
      />
    );
  }

  // 4. Hotel Details flow (Figma Image: Hotel Details)
  if (currentFlow === 'hotel_details') {
    return (
      <HotelDetailsScreen
        hotel={
          selectedHotel
            ? {
                id: selectedHotel.id,
                name: selectedHotel.name,
                location: selectedHotel.location,
                pricePerNight: selectedHotel.pricePerNight,
                currency: selectedHotel.currency || '$',
                rating: selectedHotel.rating,
                reviewsCount: 150,
                aboutText:
                  'Experience bespoke luxury with panoramic mountain and ocean vistas. SaffarPK verified accommodations feature authentic regional architecture, world-class hospitality, tranquil suites, and personalized guided tours across Pakistan.',
                images: [
                  selectedHotel.image || require('../assets/images/hotel_details_hero.jpg'),
                  require('../assets/images/room_deluxe.jpg'),
                  require('../assets/images/hotel_thumb_1.jpg'),
                  require('../assets/images/hotel_thumb_2.jpg'),
                ],
                facilities: ['Free Wifi', 'Pool', 'Breakfast', 'Lunch'],
              }
            : undefined
        }
        onBack={() => setCurrentFlow('main')}
        onSelectRoom={() => setCurrentFlow('select_room')}
      />
    );
  }

  // 5. Select Room flow (Figma Image: Select Room)
  if (currentFlow === 'select_room') {
    return (
      <SelectRoomScreen
        hotelName={selectedHotel?.name || 'Hotel Niribili'}
        onBack={() => setCurrentFlow('hotel_details')}
        onSelectRoom={room => {
          Alert.alert(
            'Reservation Complete! 🎉',
            `Your stay in ${room.name} has been successfully reserved! Check Notification tab for details.`,
            [
              {
                text: 'View My Stays',
                onPress: () => {
                  setActiveTab('saved');
                  setCurrentFlow('main');
                },
              },
              {
                text: 'Return Home',
                onPress: () => {
                  setActiveTab('home');
                  setCurrentFlow('main');
                },
              },
            ],
          );
        }}
      />
    );
  }

  // 6. Notifications Screen as flow if opened with back button
  if (currentFlow === 'notifications') {
    return (
      <NotificationScreen
        showBackButton
        onBack={() => setCurrentFlow('main')}
      />
    );
  }

  // 7. Place Details flow (Figma Image: Place Details)
  if (currentFlow === 'place_details') {
    return (
      <PlaceDetailsScreen
        place={
          selectedHotel
            ? {
                id: selectedHotel.id,
                name: selectedHotel.name,
                location: selectedHotel.location,
                country: 'Pakistan',
                price: selectedHotel.pricePerNight || 150,
                currency: selectedHotel.currency || '$',
                rating: selectedHotel.rating || 4.8,
                reviewsCount: 150,
                aboutText:
                  'Experience bespoke luxury with panoramic mountain and ocean vistas. SaffarPK verified accommodations feature authentic regional architecture, world-class hospitality, tranquil suites, and personalized guided tours across Pakistan.',
                images: [
                  selectedHotel.image || require('../assets/images/place_mountain.jpg'),
                  require('../assets/images/place_beach.jpg'),
                  require('../assets/images/hotel_details_hero.jpg'),
                ],
                facilities: ['Free Wifi', 'Pool', 'Breakfast', 'Lunch'],
              }
            : undefined
        }
        onBack={() => setCurrentFlow('main')}
        onBookNow={() => setCurrentFlow('select_room')}
      />
    );
  }

  // 8. Services flow (Figma Image: Services with Hotel/Flight/Bus/Boat tabs)
  if (currentFlow === 'services') {
    return (
      <ServicesScreen
        onBack={() => setCurrentFlow('main')}
        onSelectServiceItem={item => {
          setSelectedHotel(item);
          setCurrentFlow('hotel_details');
        }}
        onBookBus={() => setCurrentFlow('search')}
      />
    );
  }

  // 9. Categories Grid flow (Figma Image: Categories 4-col grid)
  if (currentFlow === 'categories') {
    return (
      <CategoriesScreen
        onBack={() => setCurrentFlow('main')}
        onSelectCategory={() => setCurrentFlow('most_visited')}
      />
    );
  }

  // 10. Extra Services flow (Figma Image: 7 Travel Utility Tools)
  if (currentFlow === 'extra_services') {
    return (
      <ExtraServicesScreen
        onBack={() => setCurrentFlow('main')}
      />
    );
  }

  // 11. Profile flow (Figma Image: My Profile)
  if (currentFlow === 'profile') {
    return (
      <ProfileScreen
        user={
          user
            ? {
                name: user.name,
                phone: user.phone,
                address: 'Sukkur, Sindh - Pakistan',
              }
            : undefined
        }
        onBack={() => setCurrentFlow('main')}
        onLogout={() => {
          setUser(null);
          setCurrentFlow('auth');
        }}
        onTrackBookings={() => {
          if (latestBooking) {
            setCurrentFlow('ticket');
          } else {
            Alert.alert(
              'Active Booking Tracking',
              'Saffar Prime Executive (SFK-9901-EX)\nSukkur Central ➔ Ghotki Bypass\nStatus: On-Time (ETA 40 mins)',
            );
          }
        }}
        onMyHistory={() => {
          Alert.alert(
            'Travel History',
            '• Sukkur ⇄ Obuaro Corridor (16 Oct 2026)\n• Hunza Valley Tour (10 Sep 2026)\n• Lahore Heritage Visit (15 Aug 2026)',
          );
        }}
      />
    );
  }

  // Main Bottom-Tab Layout (Figma Images 1 & 2)
  return (
    <View style={styles.mainContainer}>
      <View style={styles.tabContent}>
        {activeTab === 'home' && (
          <HomeScreen
            userName={user?.name || 'Raju Ahamed'}
            onSearch={handleSearch}
            onOpenSearchHotelForm={() => setCurrentFlow('search_hotel')}
            onOpenHotelSearch={() => setCurrentFlow('hotel_search')}
            onOpenMostVisited={() => setCurrentFlow('most_visited')}
            onOpenHotelDetails={id => setCurrentFlow('hotel_details')}
            onOpenPlaceDetails={id => setCurrentFlow('place_details')}
            onOpenCategories={() => setCurrentFlow('categories')}
            onOpenServices={() => setCurrentFlow('services')}
            onOpenExtraServices={() => setCurrentFlow('extra_services')}
            onOpenProfile={() => setCurrentFlow('profile')}
            onOpenNotifications={() => setActiveTab('notification')}
            onLogout={() => {
              setUser(null);
              setCurrentFlow('auth');
            }}
          />
        )}
        {activeTab === 'saved' && (
          <SavedScreen
            onSelectPlace={place => {
              setSelectedHotel({
                id: place.id,
                name: place.name,
                location: `${place.location}, ${place.country}`,
                pricePerNight: 150,
                rating: place.rating,
                image: place.image,
              });
              setCurrentFlow('place_details');
            }}
            onSelectEvent={event => {
              Alert.alert(
                event.title,
                `${event.location}\n${event.joinedText}\nBooking is open! Would you like to reserve your pass?`,
                [
                  {
                    text: 'Reserve Pass',
                    onPress: () => setCurrentFlow('select_room'),
                  },
                  { text: 'Close', style: 'cancel' },
                ],
              );
            }}
          />
        )}
        {activeTab === 'notification' && (
          <NotificationScreen onBack={() => setActiveTab('home')} />
        )}
        {activeTab === 'chat' && <ChatScreen />}
      </View>

      {/* Exact Figma Bottom Navigation Bar (Home | Saved | Notification | Chat) */}
      <View
        style={[
          styles.bottomNav,
          {
            paddingBottom: insets.bottom > 0 ? insets.bottom + 4 : spacing.md,
          },
        ]}
      >
        {/* Home */}
        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('home')}
          style={[styles.navItem, activeTab === 'home' ? styles.navItemActive : null]}
        >
          <HomeIcon size={24} color={activeTab === 'home' ? colors.primary : '#94A3B8'} />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'home' ? styles.navLabelActive : null,
            ]}
          >
            Home
          </Text>
        </ScalePressable>

        {/* Saved */}
        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('saved')}
          style={[styles.navItem, activeTab === 'saved' ? styles.navItemActive : null]}
        >
          <BookmarkIcon
            size={24}
            color={activeTab === 'saved' ? colors.primary : '#94A3B8'}
            filled={activeTab === 'saved'}
          />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'saved' ? styles.navLabelActive : null,
            ]}
          >
            Saved
          </Text>
        </ScalePressable>

        {/* Notification */}
        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('notification')}
          style={[styles.navItem, activeTab === 'notification' ? styles.navItemActive : null]}
        >
          <BellIcon size={24} color={activeTab === 'notification' ? colors.primary : '#94A3B8'} />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'notification' ? styles.navLabelActive : null,
            ]}
          >
            Notification
          </Text>
        </ScalePressable>

        {/* Chat */}
        <ScalePressable
          activeScale={0.88}
          onPress={() => setActiveTab('chat')}
          style={[styles.navItem, activeTab === 'chat' ? styles.navItemActive : null]}
        >
          <ChatIcon size={24} color={activeTab === 'chat' ? colors.primary : '#94A3B8'} />
          <Text
            style={[
              styles.navLabel,
              activeTab === 'chat' ? styles.navLabelActive : null,
            ]}
          >
            Chat
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
