# Task 05 - List available slots multiple person

In the `src/5-list-available-30-minute-slots-multiple-person/list-available-30-minute-slots-multiple-person.ts` file, you need to implement a function that returns the slots to which ALL doctors are available between a specific date range.

Similar to `src/4-list-available-30-minute-slots/list-available-30-minute-slots.ts`, but now you have to deal with multiple doctors. For example:

```ts
const doctorJames = {
  // Every Tuesday 9:00—14:00
  availability: {
    include: [
      {
        weekday: Weekday.tuesday,
        range: [
          { hours: 9, minutes: 0 },
          { hours: 14, minutes: 0 }
        ]
      }
    ]
  },
  events: [
    // January 16th 2024, Tuesday 12:00—13:00, with no buffer
    {
      start: new Date(`2024-01-16T12:00`),
      end: new Date(`2024-01-16T13:00`),
      buffer: { before: 0, after: 0 }
    }
  ]
};

const doctorLarissa = {
  // Every Tuesday 12:00—18:00
  availability: {
    include: [
      {
        weekday: Weekday.tuesday,
        range: [
          { hours: 12, minutes: 0 },
          { hours: 18, minutes: 0 }
        ]
      }
    ]
  },
  events: []
};

// January 15th 2024, Monday 00:00 -> January 16th 2024, Tuesday 23:59
const range: [Date, Date] = [
  new Date(`2024-01-15T00:00`),
  new Date(`2024-01-16T23:59`)
];

listAvailableSlotsMultiplePerson([doctorJames, doctorLarissa], range);
//=> Should return the slots where James and Larissa are available:
//=>     - Tuesday 13:00
//=>     - Tuesday 13:30
```

You can also look at the tests to see more examples of how the function should behave.
