export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  availableTickets: number;
  seatmap: Seat[][];
}

export interface Seat {
  id: string;
  row: number;
  column: number;
  status: 'available' | 'reserved' | 'booked';
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  seats: string[];
}

export interface CartItem {
  eventId: string;
  seats: string[];
}