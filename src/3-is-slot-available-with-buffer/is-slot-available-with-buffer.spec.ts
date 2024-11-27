import { CalendarAvailability, CalendarEvent, CalendarSlot, Weekday } from '../types';
import { isSlotAvailableWithBuffer } from './is-slot-available-with-buffer';

describe(`03 - ${isSlotAvailableWithBuffer.name}`, () => {
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
          { hours: 8, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.saturday,
        range: [
          { hours: 8, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.sunday,
        range: [
          { hours: 8, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
    ],
  };

  const events: CalendarEvent[] = [
    {
      start: new Date('2024-01-15T08:30:00Z'),
      end: new Date('2024-01-15T09:30:00Z'),
      buffer: { before: 15, after: 15 },
    }, // Monday event with buffer
    {
      start: new Date('2024-01-16T10:30:00Z'),
      end: new Date('2024-01-16T11:30:00Z'),
      buffer: { before: 35, after: 25 },
    }, // Tuesday event with buffer
    {
      start: new Date('2024-01-17T17:00:00Z'),
      end: new Date('2024-01-17T17:30:00Z'),
      buffer: { before: 0, after: 0 },
    }, // Wednesday event without buffer
    {
      start: new Date('2024-01-18T15:00:00Z'),
      end: new Date('2024-01-18T16:00:00Z'),
      buffer: { before: 10, after: 10 },
    }, // Thursday event with buffer
    {
      start: new Date('2024-01-19T09:45:00Z'),
      end: new Date('2024-01-19T10:15:00Z'),
      buffer: { before: 5, after: 5 },
    }, // Friday event with buffer
  ];

  it('should return true for an available slot without conflicting events and buffers', () => {
    const availableSlots: CalendarSlot[] = [
      { start: new Date('2024-01-15T12:50:00Z'), durationM: 45 }, // Monday at 12:50 UTC
      { start: new Date('2024-01-16T13:45:00Z'), durationM: 45 }, // Tuesday at 13:45 UTC
      { start: new Date('2024-01-17T15:00:00Z'), durationM: 60 }, // Wednesday at 15:00 UTC
      { start: new Date('2024-01-18T16:20:00Z'), durationM: 20 }, // Thursday at 16:20 UTC
      { start: new Date('2024-01-19T16:30:00Z'), durationM: 60 }, // Friday at 16:30 UTC
    ];
    const result = availableSlots.every(slot => isSlotAvailableWithBuffer(availability, events, slot));

    expect(result).toBe(true);
  });

  it('should return false for a slot overlapping with an event and buffer', () => {
    const unavailableSlots: CalendarSlot[] = [
      { start: new Date('2024-01-15T09:40:00Z'), durationM: 45 }, // Monday at 9:40 UTC
      { start: new Date('2024-01-16T11:50:00Z'), durationM: 45 }, // Tuesday at 11:50 UTC
      { start: new Date('2024-01-17T17:10:00Z'), durationM: 60 }, // Wednesday at 17:10 UTC
      { start: new Date('2024-01-18T14:55:00Z'), durationM: 20 }, // Thursday at 14:55 UTC
      { start: new Date('2024-01-19T09:43:00Z'), durationM: 60 }, // Friday at 09:43 UTC
    ];

    const result = unavailableSlots.every(slot => isSlotAvailableWithBuffer(availability, events, slot) === false);

    expect(result).toBe(true);
  });
});
