// src/4-list-available-30-minute-slots/list-available-30-minute-slots.ts

import { CalendarAvailability, CalendarEvent, Weekday } from '../types';

/**
 *TODO> Devuelve los slots disponibles de 30 minutos en un rango de fechas determinado, teniendo en cuenta la disponibilidad del doctor y los eventos existentes.

 */
export function listAvailable30MinuteSlots(
  availability: CalendarAvailability,
  events: CalendarEvent[],
  range: [Date, Date]
): { start: Date, durationM: number }[] {
  const availableSlots: { start: Date, durationM: number }[] = [];

  // Convertir las fechas de rango a minutos desde medianoche
  const rangeStart = range[0].getTime();
  const rangeEnd = range[1].getTime();

  // TODO> Iterar sobre los días de disponibilidad
  for (const day of availability.include) {
    // TODO> Verificar si el día está dentro del rango de fechas
    const currentDate = new Date(rangeStart);

    // TODO> Solo procesar días que estén dentro del rango y coincidan con el día de la semana
    while (currentDate.getTime() <= rangeEnd) {
      if (currentDate.getDay() === day.weekday) {
        // TODO> Establecer el inicio y fin del rango de disponibilidad del día
        let slotStartTime = new Date(currentDate);
        slotStartTime.setHours(day.range[0].hours, day.range[0].minutes, 0, 0); 

        const slotEndTime = new Date(currentDate);
        slotEndTime.setHours(day.range[1].hours, day.range[1].minutes, 0, 0); 
        //TODO>  Comprobar la disponibilidad de los slots de 30 minutos
        while (slotStartTime < slotEndTime) {
          const slotEnd = new Date(slotStartTime.getTime() + 30 * 60000); 

          //TODO>  Verificar si el slot está disponible
          const isAvailable = !events.some((event) => {
            const eventStart = event.start.getTime();
            const eventEnd = event.end.getTime();

            // TODO> Comprobación que considera eventos y buffers
            if (event.buffer) {
              const bufferBefore = event.buffer.before * 60000;
              const bufferAfter = event.buffer.after * 60000;

              return (
                (slotStartTime.getTime() >= eventStart - bufferBefore && slotStartTime.getTime() < eventEnd + bufferAfter) ||
                (slotEnd.getTime() > eventStart - bufferBefore && slotEnd.getTime() <= eventEnd + bufferAfter) ||
                (slotStartTime.getTime() <= eventStart - bufferBefore && slotEnd.getTime() >= eventEnd + bufferAfter)
              );
            }

            // TODO> Caso sin buffer
            return (
              (slotStartTime.getTime() >= eventStart && slotStartTime.getTime() < eventEnd) ||
              (slotEnd.getTime() > eventStart && slotEnd.getTime() <= eventEnd) ||
              (slotStartTime.getTime() <= eventStart && slotEnd.getTime() >= eventEnd)
            );
          });

          //TODO>  Si está disponible, añadirlo al array
          if (isAvailable) {
            availableSlots.push({
              start: slotStartTime,
              durationM: 30,
            });
          }

          // TODO> Incrementar el slot en 30 minutos
          slotStartTime = new Date(slotStartTime.getTime() + 30 * 60000);
        }
      }

      //TODO>  Avanzar al siguiente día
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return availableSlots;
}
