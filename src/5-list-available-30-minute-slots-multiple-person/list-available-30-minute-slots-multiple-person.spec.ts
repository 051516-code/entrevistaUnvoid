import { CalendarAvailability, CalendarEvent, Weekday } from '../types';
import { listAvailable30MinuteSlotsMultiplePerson } from './list-available-30-minute-slots-multiple-person';

describe(`05 - ${listAvailable30MinuteSlotsMultiplePerson.name}`, () => {
  const availabilityA: CalendarAvailability = {
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
          { hours: 12, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.wednesday,
        range: [
          { hours: 8, minutes: 0 },
          { hours: 22, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.thursday,
        range: [
          { hours: 15, minutes: 0 },
          { hours: 22, minutes: 0 },
        ],
      },
    ],
  };

  const eventsA: CalendarEvent[] = [
    {
      start: new Date('2024-01-15T10:30:00Z'),
      end: new Date('2024-01-15T11:30:00Z'),
      buffer: { before: 15, after: 0 },
    }, // Monday event with buffer
    {
      start: new Date('2024-01-16T14:00:00Z'),
      end: new Date('2024-01-16T15:00:00Z'),
      buffer: { before: 0, after: 0 },
    }, // Tuesday event without buffer
    {
      start: new Date('2024-01-16T16:00:00Z'),
      end: new Date('2024-01-16T17:00:00Z'),
      buffer: { before: 0, after: 0 },
    }, // Tuesday event without buffer
    {
      start: new Date('2024-01-16T17:30:00Z'),
      end: new Date('2024-01-16T18:00:00Z'),
      buffer: { before: 0, after: 0 },
    }, // Tuesday event without buffer
    {
      start: new Date('2024-01-17T09:00:00Z'),
      end: new Date('2024-01-17T12:00:00Z'),
      buffer: { before: 30, after: 25 },
    }, // Wednesday event with buffer
    {
      start: new Date('2024-01-17T14:00:00Z'),
      end: new Date('2024-01-17T17:00:00Z'),
      buffer: { before: 10, after: 0 },
    }, // Wednesday event with buffer
    {
      start: new Date('2024-01-17T21:00:00Z'),
      end: new Date('2024-01-17T21:30:00Z'),
      buffer: { before: 0, after: 45 },
    }, // Wednesday event with buffer

    {
      start: new Date('2024-01-18T15:00:00Z'),
      end: new Date('2024-01-18T18:00:00Z'),
      buffer: { before: 30, after: 25 },
    }, // Thursday event with buffer
    {
      start: new Date('2024-01-18T18:00:00Z'),
      end: new Date('2024-01-18T20:00:00Z'),
      buffer: { before: 10, after: 0 },
    }, // Thursday event with buffer
  ];

  const availabilityB: CalendarAvailability = {
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
          { hours: 15, minutes: 0 },
          { hours: 18, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.wednesday,
        range: [
          { hours: 10, minutes: 0 },
          { hours: 22, minutes: 0 },
        ],
      },
      {
        weekday: Weekday.thursday,
        range: [
          { hours: 16, minutes: 0 },
          { hours: 22, minutes: 0 },
        ],
      },
    ],
  };

  const eventsB: CalendarEvent[] = [
    {
      start: new Date('2024-01-15T09:30:00Z'),
      end: new Date('2024-01-15T11:30:00Z'),
      buffer: { before: 15, after: 0 },
    }, // Monday event with buffer
    {
      start: new Date('2024-01-16T15:00:00Z'),
      end: new Date('2024-01-16T16:00:00Z'),
      buffer: { before: 0, after: 0 },
    }, // Tuesday event without buffer
    {
      start: new Date('2024-01-16T17:30:00Z'),
      end: new Date('2024-01-16T18:00:00Z'),
      buffer: { before: 0, after: 0 },
    }, // Tuesday event without buffer
    {
      start: new Date('2024-01-17T10:00:00Z'),
      end: new Date('2024-01-17T12:00:00Z'),
      buffer: { before: 30, after: 25 },
    }, // Wednesday event with buffer
    {
      start: new Date('2024-01-17T14:00:00Z'),
      end: new Date('2024-01-17T15:00:00Z'),
      buffer: { before: 10, after: 0 },
    }, // Wednesday event with buffer
    {
      start: new Date('2024-01-17T19:00:00Z'),
      end: new Date('2024-01-17T21:30:00Z'),
      buffer: { before: 0, after: 45 },
    }, // Wednesday event with buffer
    {
      start: new Date('2024-01-18T20:00:00Z'),
      end: new Date('2024-01-18T22:00:00Z'),
      buffer: { before: 0, after: 45 },
    }, // Thursday event with buffer
  ];

  it('should return available slots between 9 and 13 Monday', () => {
    const startDate = new Date('2024-01-15T09:00:00Z'); // Monday at 09:00 UTC
    const endDate = new Date('2024-01-15T13:00:00Z'); // Monday at 13:00 UTC

    const result = listAvailable30MinuteSlotsMultiplePerson(
      [
        { availability: availabilityA, events: eventsA },
        { availability: availabilityB, events: eventsB },
      ],
      [startDate, endDate],
    );

    // Expected available slots on Monday:
    // 3. 11:30 - 12:00
    expect(result).toEqual([{ start: new Date('2024-01-15T11:30:00Z'), durationM: 30 }]);
  });
  it('should return available slots between 12 and 18 Tuesday', () => {
    const startDate = new Date('2024-01-16T12:00:00Z'); // Tuesday at 12:00 UTC
    const endDate = new Date('2024-01-16T18:00:00Z'); // Tuesday at 18:00 UTC

    const result = listAvailable30MinuteSlotsMultiplePerson(
      [
        { availability: availabilityA, events: eventsA },
        { availability: availabilityB, events: eventsB },
      ],
      [startDate, endDate],
    );

    // Expected available slots on Tuesday:
    // 7. 17:00 - 17:30
    expect(result).toEqual([{ start: new Date('2024-01-16T17:00:00Z'), durationM: 30 }]);
  });

  it('should return available slots between 8 and 22 Wednesday', () => {
    const startDate = new Date('2024-01-17T08:00:00Z'); // Wednesday at 08:00 UTC
    const endDate = new Date('2024-01-17T22:00:00Z'); // Wednesday at 22:00 UTC

    const result = listAvailable30MinuteSlotsMultiplePerson(
      [
        { availability: availabilityA, events: eventsA },
        { availability: availabilityB, events: eventsB },
      ],
      [startDate, endDate],
    );

    // Expected available slots on Wednesday:
    // 1. 12:30 - 13:00
    // 2. 13:00 - 13:30
    // 3. 17:00 - 17:30
    // 4. 17:30 - 18:00
    // 5. 18:00 - 18:30
    // 6. 18:30 - 19:00
    expect(result).toEqual([
      { durationM: 30, start: new Date('2024-01-17T12:30:00.000Z') },
      { durationM: 30, start: new Date('2024-01-17T13:00:00.000Z') },
      { durationM: 30, start: new Date('2024-01-17T17:00:00.000Z') },
      { durationM: 30, start: new Date('2024-01-17T17:30:00.000Z') },
      { durationM: 30, start: new Date('2024-01-17T18:00:00.000Z') },
      { durationM: 30, start: new Date('2024-01-17T18:30:00.000Z') },
    ]);
  });

  it('should return available slots between 15 and 22 Thursday', () => {
    const startDate = new Date('2024-01-18T15:00:00Z'); // Thursday at 15:00 UTC
    const endDate = new Date('2024-01-18T22:00:00Z'); // Thursday at 22:00 UTC

    const result = listAvailable30MinuteSlotsMultiplePerson(
      [
        { availability: availabilityA, events: eventsA },
        { availability: availabilityB, events: eventsB },
      ],
      [startDate, endDate],
    );

    expect(result).toEqual([]);
  });
});
