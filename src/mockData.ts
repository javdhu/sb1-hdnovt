import { Event } from './types';

const generateSeatmap = (rows: number, columns: number): Event['seatmap'] => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, column) => ({
      id: `${row + 1}-${column + 1}`,
      row: row + 1,
      column: column + 1,
      status: 'available'
    }))
  );
};

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'A weekend of amazing music under the sun!',
    date: '2023-07-15T12:00:00Z',
    price: 50,
    availableTickets: 100,
    seatmap: generateSeatmap(10, 10)
  },
  {
    id: '2',
    title: 'Tech Conference 2023',
    description: 'Learn about the latest in technology and innovation.',
    date: '2023-08-10T09:00:00Z',
    price: 100,
    availableTickets: 50,
    seatmap: generateSeatmap(5, 10)
  },
  {
    id: '3',
    title: 'Food & Wine Expo',
    description: 'Taste exquisite dishes and fine wines from around the world.',
    date: '2023-09-05T11:00:00Z',
    price: 75,
    availableTickets: 75,
    seatmap: generateSeatmap(7, 7)
  }
];