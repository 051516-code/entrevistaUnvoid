import { CalendarAvailability, CalendarEvent, CalendarSlot, Weekday } from '../types';
import { isSlotAvailableWithEvents } from './is-slot-available-with-events';

describe(`02 - ${isSlotAvailableWithEvents.name}`, () => {
  const availability: CalendarAvailability = {
    include: [
      {
        weekday: Weekday.monday,
        range: [
          { hours: 8, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.tuesday,
        range: [
          { hours: 8, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.wednesday,
        range: [
          { hours: 8, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.thursday,
        range: [
          { hours: 8, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.friday,
        range: [
          { hours: 12, minutes: 0 },
          { hours: 20, minutes: 0 },
        ],
      },
    ],
  };

  const events: CalendarEvent[] = [
    {
      start: new Date('2024-01-15T11:00:00Z'),
      end: new Date('2024-01-15T12:00:00Z'),
    }, // Monday event
    {
      start: new Date('2024-01-16T10:30:00Z'),
      end: new Date('2024-01-16T11:30:00Z'),
    }, // Tuesday event
    {
      start: new Date('2024-01-17T13:00:00Z'),
      end: new Date('2024-01-17T14:00:00Z'),
    }, // Wednesday event
    {
      start: new Date('2024-01-18T15:30:00Z'),
      end: new Date('2024-01-18T16:50:00Z'),
    }, // Thursday event
    {
      start: new Date('2024-01-19T18:00:00Z'),
      end: new Date('2024-01-19T19:55:00Z'),
    }, // Friday event
  ];

  it('should return true for an available slot without conflicting events', () => {
    const availableSlots: CalendarSlot[] = [
      { start: new Date('2024-01-15T17:15:00Z'), durationM: 45 }, // Monday at 17:15 UTC
      { start: new Date('2024-01-16T13:45:00Z'), durationM: 45 }, // Tuesday at 13:45 UTC
      { start: new Date('2024-01-17T15:00:00Z'), durationM: 60 }, // Wednesday at 15:00 UTC
      { start: new Date('2024-01-18T15:00:00Z'), durationM: 20 }, // Thursday at 15:00 UTC
      { start: new Date('2024-01-19T16:30:00Z'), durationM: 60 }, // Friday at 16:30 UTC
    ];
    for (const slot of availableSlots) {
      const actual = isSlotAvailableWithEvents(availability, events, slot);
      const expected = true;
      expect(actual)
        .withContext(`Slot with ${slot.durationM} minutes at ${slot.start} should be available`)
        .toBe(expected);
    }
  });

  it('should return false for a slot overlapping with an event', () => {
    const unavailableSlots: CalendarSlot[] = [
      { start: new Date('2024-01-15T11:15:00Z'), durationM: 45 }, // Monday at 11:15 UTC
      { start: new Date('2024-01-16T10:45:00Z'), durationM: 45 }, // Tuesday at 10:45 UTC
      { start: new Date('2024-01-17T13:00:00Z'), durationM: 60 }, // Wednesday at 13:00 UTC
      { start: new Date('2024-01-18T15:30:00Z'), durationM: 20 }, // Thursday at 15:30 UTC
      { start: new Date('2024-01-19T18:30:00Z'), durationM: 60 }, // Friday at 18:30 UTC
    ];

    for (const slot of unavailableSlots) {
      const actual = isSlotAvailableWithEvents(availability, events, slot);
      const expected = false;
      expect(actual)
        .withContext(`Slot with ${slot.durationM} minutes at ${slot.start} should be unavailable`)
        .toBe(expected);
    }
  });
});
