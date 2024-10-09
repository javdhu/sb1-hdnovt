import { Event, Booking } from './types';
import { mockEvents } from './mockData';

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getEvents = async (): Promise<Event[]> => {
  await delay(500); // Simulate network delay
  return mockEvents;
};

export const getEvent = async (id: string): Promise<Event> => {
  await delay(300);
  const event = mockEvents.find(event => event.id === id);
  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

export const createBooking = async (booking: Omit<Booking, 'id'>): Promise<Booking> => {
  await delay(500);
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...booking
  };
};