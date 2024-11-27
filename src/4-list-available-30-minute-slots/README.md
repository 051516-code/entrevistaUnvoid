# Task 04 - List available slots

In the `src/4-list-available-30-minute-slots/list-available-30-minute-slots.ts` file, you need to implement a function that returns the available 30-minute slots in a doctor's calendar availability between a specific date range. For example: which 30-minute slots the doctor has available between Monday and Tuesday?

```ts
// Every Tuesday 9:00—14:00
const availability: CalendarAvailability = {
  include: [
    {
      weekday: Weekday.tuesday,
      range: [
        { hours: 9, minutes: 0 },
        { hours: 14, minutes: 0 }
      ]
    }
  ]
};

const events: Array<CalendarEvent> = [
  // January 16th 2024, Tuesday 10:00—11:00, with 30m of buffer before and 60m of buffer after
  {
    start: new Date(`2024-01-16T10:00`),
    end: new Date(`2024-01-16T11:00`),
    buffer: { before: 30, after: 60 }
  }
];

// January 15th 2024, Monday 00:00 -> January 16th 2024, Tuesday 23:59
const range: [Date, Date] = [
  new Date(`2024-01-15T00:00`),
  new Date(`2024-01-16T23:59`)
];

listAvailableSlots(availability, events, range);
//=> Should return:
//=>     - Tuesday 9:00
//=>     - Tuesday 12:00
//=>     - Tuesday 12:30
//=>     - Tuesday 13:00
//=>     - Tuesday 13:30
```

You can also look at the tests to see more examples of how the function should behave.
