import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

export const listAvailable30MinuteSlotsMultiplePerson = (
  attendees: Array<{
    availability: CalendarAvailability;
    events: Array<CalendarEvent>;
  }>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  // Your code goes here
  return [];
};
