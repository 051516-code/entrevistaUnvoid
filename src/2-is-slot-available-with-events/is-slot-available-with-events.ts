import { CalendarAvailability, CalendarEvent, CalendarSlot, Weekday } from '../types';

export function isSlotAvailableWithEvents(
  availability: CalendarAvailability,
  events: CalendarEvent[],
  slot: CalendarSlot
): boolean {
  // TODO> Verificar si el slot se encuentra dentro de un horario de disponibilidad válido
  const isWithinAvailability = availability.include.some((day) => {
    if (day.weekday !== new Date(slot.start).getDay()) {
      return false; // No es el mismo día de la semana
    }

    const slotStartTime = slot.start.getHours() * 60 + slot.start.getMinutes();
    const rangeStartTime = day.range[0].hours * 60 + day.range[0].minutes;
    const rangeEndTime = day.range[1].hours * 60 + day.range[1].minutes;

    return slotStartTime >= rangeStartTime && slotStartTime + slot.durationM <= rangeEndTime;
  });

  if (!isWithinAvailability) {
    return false; // TODO> Si el slot no está dentro del rango de disponibilidad, no está disponible
  }

  //   TODO> Verificar si el slot se solapa con algún evento
  const isOverlapping = events.some((event) => {
    const eventStart = event.start.getTime();
    const eventEnd = event.end.getTime();
    const slotStart = slot.start.getTime();
    const slotEnd = new Date(slot.start.getTime() + slot.durationM * 60000).getTime();

    return (
      (slotStart >= eventStart && slotStart < eventEnd) ||
      (slotEnd > eventStart && slotEnd <= eventEnd) ||
      (slotStart <= eventStart && slotEnd >= eventEnd)
    );
  });

  return !isOverlapping; // TODO>  Si el slot se solapa con un evento, no está disponible
}
