# Task 03 - Is slot available with buffer?

Every `CalendarEvent` can optionally have a buffer, which is reserved a block of time before and/or after the event in which no other event can be scheduled. For example: the meeting is 4pm–5pm but let's also block 30 minutes earlier for preparation, and 1 hour after in case the meeting takes longer than expected. The data structure is in `src/types/calendar-event`:

```ts
export type Buffer = {
  /** Pre-event buffer, in minutes */
  before: number;
  /** Post-event buffer, in minutes */
  after: number;
};

export type CalendarEvent = {
  start: Date;
  end: Date;
  buffer?: Buffer; // Optional Buffer
};
```

In the `src/3-is-slot-available-with-buffer/is-slot-available-with-buffer.ts` file, you need to implement a function that determines if a given calendar slot is available or not while also considering other `CalendarEvent`s that are already scheduled and may have `Buffer`.

Similar to `src/2-is-slot-available-with-events/is-slot-available-with-events.ts`, but now you have to deal with potential buffers. For example:

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

const events: Array<CalendarEvent> = [
  // January 16th 2024, Tuesday 18:00—19:00, with 30m of buffer before and 60m of buffer after
  {
    start: new Date(`2024-01-16T18:00`),
    end: new Date(`2024-01-16T19:00`),
    buffer: { before: 30, after: 60 }
  }
];

// January 16th 2024, Tuesday 19:00—19:30
const slot: CalendarSlot = {
  start: new Date(`2024-01-16T19:00`), // January 16th 2024, Tuesday 19:00
  durationM: 30 // 30 minutes
};

isSlotAvailableWithBuffer(availability, events, slot);
//=> Should return `false` because the `buffer.after` is blocking the doctor's calendar
```

You can also look at the tests to see more examples of how the function should behave.
