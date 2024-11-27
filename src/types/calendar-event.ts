export type Buffer = {
  /** Pre-event buffer, in minutes */
  before: number;
  /** Post-event buffer, in minutes */
  after: number;
};

export type CalendarEvent = {
  start: Date;
  end: Date;
  buffer?: Buffer;
};
