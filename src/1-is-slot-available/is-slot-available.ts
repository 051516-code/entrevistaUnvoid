import { CalendarAvailability, CalendarSlot, CalendarEvent, Weekday } from '../types';

/**
 * TODO> Convierte un objeto `Time` a minutos desde la medianoche.
 */
const timeToMinutes = ({ hours, minutes }: { hours: number, minutes: number }): number =>
  hours * 60 + minutes;

/**
 * TODO> Verifica si un horario está dentro del rango de disponibilidad.
 */
const isInAvailabilityRange = (
  slotStart: number,
  slotEnd: number,
  startRange: number,
  endRange: number
): boolean => slotStart >= startRange && slotEnd <= endRange;

/**
 * TODO> Verifica si un `slot` se solapa con un `event`, teniendo en cuenta los márgenes.
 */
const isConflictingWithEvent = (
  slotStart: number, 
  slotEnd: number, 
  eventStart: number, 
  eventEnd: number, 
  bufferBefore: number, 
  bufferAfter: number
): boolean => (
  (slotStart < eventEnd + bufferAfter) && (slotEnd > eventStart - bufferBefore)
);

/**
 * TODO> Verifica si un horario está disponible considerando la disponibilidad y los eventos existentes.
 */
export const isSlotAvailable = (
  availability: CalendarAvailability,
  slot: CalendarSlot,
  events: CalendarEvent[]
): boolean => {
  // TODO> Calcular el inicio y fin del slot en minutos desde la medianoche (zona horaria local)
  const slotStart = slot.start.getHours() * 60 + slot.start.getMinutes();
  const slotEnd = slotStart + slot.durationM;

  // TODO> Verificar si el día de la semana está cubierto por la disponibilidad
  const dayAvailability = availability.include.find(
    (rule) => rule.weekday === slot.start.getDay() as Weekday
  );
  if (!dayAvailability) return false;

  // TODO> Verificar si el slot está dentro del rango horario disponible
  const [rangeStart, rangeEnd] = dayAvailability.range;
  if (!isInAvailabilityRange(slotStart, slotEnd, timeToMinutes(rangeStart), timeToMinutes(rangeEnd))) {
    return false;
  }

  // TODO> Verificar si el slot se solapa con algún evento existente
  for (const event of events) {
    const bufferBefore = event.buffer?.before ?? 0;
    const bufferAfter = event.buffer?.after ?? 0;

    const eventStart = event.start.getTime();
    const eventEnd = event.end.getTime();

    // TODO> Convertir los tiempos a minutos para la comparación
    const eventStartMinutes = new Date(eventStart).getHours() * 60 + new Date(eventStart).getMinutes();
    const eventEndMinutes = new Date(eventEnd).getHours() * 60 + new Date(eventEnd).getMinutes();

    if (isConflictingWithEvent(slotStart, slotEnd, eventStartMinutes, eventEndMinutes, bufferBefore, bufferAfter)) {
      return false;
    }
  }

  return true; // TODO> El horario está disponible
};
