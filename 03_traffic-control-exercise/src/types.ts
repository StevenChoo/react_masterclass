// Flight status types
export type FlightStatus = 'scheduled' | 'boarding' | 'departed' | 'landed' | 'delayed' | 'cancelled';

// Flight type (arrival or departure)
export type FlightType = 'arrival' | 'departure';

// Runway status
export type RunwayStatus = 'available' | 'occupied' | 'maintenance';

// Flight interface
export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  destination: string;
  origin: string;
  type: FlightType;
  scheduledTime: string;
  actualTime?: string;
  status: FlightStatus;
  gate?: string;
  runway?: string;
}

// Runway interface
export interface Runway {
  id: string;
  name: string;
  status: RunwayStatus;
  currentFlight?: string; // flight ID if occupied
}

// Mock data for initial setup
export const mockFlights: Flight[] = [
  {
    id: '1',
    flightNumber: 'KL1234',
    airline: 'KLM',
    destination: 'Amsterdam',
    origin: 'London',
    type: 'arrival',
    scheduledTime: '14:30',
    actualTime: '14:25',
    status: 'landed',
    gate: 'D4',
    runway: 'R1'
  },
  {
    id: '2',
    flightNumber: 'BA456',
    airline: 'British Airways',
    destination: 'Paris',
    origin: 'Amsterdam',
    type: 'departure',
    scheduledTime: '15:00',
    status: 'boarding',
    gate: 'C2'
  },
  {
    id: '3',
    flightNumber: 'LH789',
    airline: 'Lufthansa',
    destination: 'Berlin',
    origin: 'Amsterdam',
    type: 'departure',
    scheduledTime: '15:30',
    status: 'scheduled',
    gate: 'B7'
  },
  {
    id: '4',
    flightNumber: 'AF321',
    airline: 'Air France',
    destination: 'Amsterdam',
    origin: 'Nice',
    type: 'arrival',
    scheduledTime: '16:00',
    status: 'delayed',
    gate: 'E3'
  },
  {
    id: '5',
    flightNumber: 'EK654',
    airline: 'Emirates',
    destination: 'Dubai',
    origin: 'Amsterdam',
    type: 'departure',
    scheduledTime: '16:30',
    status: 'scheduled',
    gate: 'F1'
  }
];

export const mockRunways: Runway[] = [
  {
    id: 'r1',
    name: 'Runway 18R/36L',
    status: 'occupied',
    currentFlight: '1'
  },
  {
    id: 'r2',
    name: 'Runway 18C/36C',
    status: 'available'
  },
  {
    id: 'r3',
    name: 'Runway 18L/36R',
    status: 'maintenance'
  }
];
