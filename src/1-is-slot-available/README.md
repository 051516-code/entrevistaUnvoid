# Task 01 - Is slot available?

Doctors have a `CalendarAvailability`, which is a definition of when they are available on a weekly basis (eg. Monday–Friday 9am–5pm). The data structure is in `src/types/calendar-availability`:

```ts
export type CalendarAvailability = {
  include: Array<{
    weekday: Weekday;
    range: [Time, Time];
  }>;
};
```

To schedule a consultation, patients must select a `CalendarSlot` (eg. January 15th 2024, Monday 3pm). The data structure is in `src/types/calendar-slot`:

```ts
export type CalendarSlot = {
  start: Date;
  /** The duration of the time slot, in minutes. */
  durationM: number;
};
```

In the `src/1-is-slot-available/is-slot-available.ts` file, you need to implement a function that determines if a given `CalendarSlot` is available for the given `CalendarAvailability`. For example:

```ts
// Every Tuesday 9:00—20:00
const availability: CalendarAvailability = {
  include: [
    {
      weekday: Weekday.tuesday,
      range: [
        { hours: 9, minutes: 0 },
        { hours: 20, minutes: 0 }
      ]
    }
  ]
};

// January 16th 2024, Tuesday 21:00—21:30
const slot: CalendarSlot = {
  start: new Date(`2024-01-16T21:00`), // January 16th 2024, Tuesday 21:00
  durationM: 30 // 30 minutes
};

isSlotAvailable(availability, slot);
//=> Should return `false` because the doctor is not available Tuesday 21:00–21:30
```

You can also look at the tests to see more examples of how the function should behave.
