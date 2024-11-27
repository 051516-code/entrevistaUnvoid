import { CalendarAvailability, CalendarSlot, Weekday } from '../types';
import { isSlotAvailable } from './is-slot-available';

describe(`01 - ${isSlotAvailable.name}`, () => {
  const availability: CalendarAvailability = {
    include: [
      {
        weekday: Weekday.monday,
        range: [
          { hours: 9, minutes: 0 },
          { hours: 12, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.tuesday,
        range: [
          { hours: 14, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.wednesday,
        range: [
          { hours: 10, minutes: 0 },
          { hours: 16, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.thursday,
        range: [
          { hours: 8, minutes: 30 },
          { hours: 11, minutes: 30 },
        ],
      },
      {
        weekday: Weekday.friday,
        range: [
          { hours: 13, minutes: 0 },
          { hours: 17, minutes: 0 },
        ],
      },
    ],
  };

  it('should return true for an available slot', () => {
    const availableSlots: CalendarSlot[] = [
      { start: new Date('2024-01-15T09:15:00'), durationM: 45 }, // Monday at 9:15 local time
      { start: new Date('2024-01-16T16:45:00'), durationM: 45 }, // Tuesday at 16:45 local time
      { start: new Date('2024-01-17T14:00:00'), durationM: 60 }, // Wednesday at 14:00 local time
      { start: new Date('2024-01-18T08:30:00'), durationM: 30 }, // Thursday at 8:30 local time
      { start: new Date('2024-01-19T15:30:00'), durationM: 60 }, // Friday at 15:30 local time
    ];

    const result = availableSlots.every(slot => isSlotAvailable(availability, slot, [])); // No events for this test

    expect(result).toBe(true);
  });

  it('should return false for an unavailable slot', () => {
    const unavailableSlots: CalendarSlot[] = [
      { start: new Date('2024-01-15T17:15:00'), durationM: 45 }, // Monday at 17:15 local time
      { start: new Date('2024-01-16T13:45:00'), durationM: 45 }, // Tuesday at 13:45 local time
      { start: new Date('2024-01-17T08:00:00'), durationM: 60 }, // Wednesday at 08:00 local time
      { start: new Date('2024-01-18T08:30:00'), durationM: 240 }, // Thursday at 08:30 local time (overlapping with the range)
      { start: new Date('2024-01-19T12:30:00'), durationM: 60 }, // Friday at 12:30 local time
    ];

    const result = unavailableSlots.every(slot => isSlotAvailable(availability, slot, []) === false); // No events for this test

    expect(result).toBe(true);
  });
});
