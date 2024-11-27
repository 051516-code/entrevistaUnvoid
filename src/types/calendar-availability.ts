/** Use `Date.getDay()` to convert a `Date` to a `Weekday`. */
export enum Weekday {
  sunday = 0,
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
}

export type Time = {
  hours: number;
  minutes: number;
};

export type CalendarAvailability = {
  include: Array<{
    weekday: Weekday;
    range: [Time, Time];
  }>;
};
