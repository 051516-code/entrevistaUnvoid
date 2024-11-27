import { CalendarAvailability, CalendarEvent, CalendarSlot, Weekday } from '../types';

/**
 * TODO> Verifica si un slot de calendario está disponible, considerando los eventos programados y sus buffers.
 */
export function isSlotAvailableWithBuffer(
  availability: CalendarAvailability,
  events: CalendarEvent[],
  slot: CalendarSlot
): boolean {
  // TODO>  Verificar si el slot solicitado está dentro de la disponibilidad del calendario.
  const slotStartTime = slot.start.getTime();
  const slotEndTime = new Date(slot.start.getTime() + slot.durationM * 60000).getTime();

  // TODO> Verificar si el slot está dentro de la disponibilidad permitida para el día
  const weekday = slot.start.getDay();
  const availableRanges = availability.include.filter(range => range.weekday === weekday);

  const isWithinAvailability = availableRanges.some(range => {
    const rangeStart = new Date(slot.start);
    rangeStart.setHours(range.range[0].hours, range.range[0].minutes, 0, 0);
    const rangeEnd = new Date(slot.start);
    rangeEnd.setHours(range.range[1].hours, range.range[1].minutes, 0, 0);

    return slotStartTime >= rangeStart.getTime() && slotEndTime <= rangeEnd.getTime();
  });

  if (!isWithinAvailability) return false;

  // TODO> Comprobar si el slot se solapa con algún evento y sus buffers
  return !events.some(event => {
    const eventStartTime = event.start.getTime();
    const eventEndTime = event.end.getTime();

    // TODO> Considerar el buffer antes y después del evento
    const beforeBuffer = (event.buffer?.before ?? 0) * 60000;
    const afterBuffer = (event.buffer?.after ?? 0) * 60000;

    const eventWithBufferStart = eventStartTime - beforeBuffer;
    const eventWithBufferEnd = eventEndTime + afterBuffer;

    // TODO> Comprobar si el slot solicitado se solapa con el evento + buffer
    return (slotStartTime < eventWithBufferEnd && slotEndTime > eventWithBufferStart);
  });
}
