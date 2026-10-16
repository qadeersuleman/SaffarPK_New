import routesData from '../data/routes.json';
import faresData from '../data/fares.json';
import { RouteStop, BusCategory } from '../types';

export const ALL_STOPS: RouteStop[] = routesData.stops;

/**
 * Validates if origin and destination are valid
 */
export function isValidJourney(originId: string, destinationId: string, allowReverse = true): boolean {
  if (originId === destinationId) return false;
  const origin = ALL_STOPS.find(s => s.id === originId);
  const dest = ALL_STOPS.find(s => s.id === destinationId);
  if (!origin || !dest) return false;

  if (allowReverse) {
    return origin.id !== dest.id;
  }
  return origin.sequence < dest.sequence;
}

/**
 * Calculates fare in PKR for selected origin, destination, and bus category
 */
export function getFare(originId: string, destinationId: string, category: BusCategory = 'Standard'): number {
  // Check direct rate
  const direct = faresData.rates.find(
    r => (r.from === originId && r.to === destinationId) || (r.from === destinationId && r.to === originId)
  );

  if (direct && (direct as any)[category]) {
    return (direct as any)[category];
  }

  // Fallback estimation based on stop sequence distance
  const origin = ALL_STOPS.find(s => s.id === originId);
  const dest = ALL_STOPS.find(s => s.id === destinationId);
  if (!origin || !dest) return 300;

  const hops = Math.abs(dest.sequence - origin.sequence);
  const baseRatePerHop = category === 'Royal' ? 260 : category === 'Executive' ? 200 : 160;
  return Math.max(200, hops * baseRatePerHop);
}

/**
 * Estimated travel time in minutes between two stops
 */
export function getEstimatedDurationMinutes(originId: string, destinationId: string): number {
  const origin = ALL_STOPS.find(s => s.id === originId);
  const dest = ALL_STOPS.find(s => s.id === destinationId);
  if (!origin || !dest) return 30;

  const hops = Math.abs(dest.sequence - origin.sequence);
  // Average ~25 mins per segment including boarding dwell time
  return hops * 25;
}

