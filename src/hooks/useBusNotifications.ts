import { useEffect, useState } from 'react';
import { ScheduleItem } from '../types';

interface Notification {
  message: string;
  key: string;
  day: string;
}

export function useBusNotifications(
  schedule: ScheduleItem[],
  agency: string,
  routeTagMap: Record<string, string>
) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const checkBuses = async () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;

      const newNotifications: Notification[] = [];

      for (const item of schedule) {
        const reservationDay = item.day.toLowerCase();
        const [reservedHourStr, reservedMinuteStr] = item.time.split(':');
        const reservedHour = parseInt(reservedHourStr);
        const reservedMinute = parseInt(reservedMinuteStr);
        const reservedTotalMinutes = reservedHour * 60 + reservedMinute;

        let message = '';

        if (reservationDay === currentDay) {
          let nextBusHour: number;
          let nextBusMinute: number;

          if (currentMinute < 20) {
            nextBusHour = currentHour;
            nextBusMinute = 20;
          } else if (currentMinute < 40) {
            nextBusHour = currentHour;
            nextBusMinute = 40;
          } else {
            nextBusHour = (currentHour + 1) % 24;
            nextBusMinute = 0;
          }

          const nextBusTotalMinutes = nextBusHour * 60 + nextBusMinute;
          const nextBusFormatted = `${String(nextBusHour).padStart(2, '0')}:${String(nextBusMinute).padStart(2, '0')}`;

          if (currentTotalMinutes < reservedTotalMinutes) {
            const estimatedArrival = new Date();
            estimatedArrival.setHours(nextBusHour);
            estimatedArrival.setMinutes(nextBusMinute);
            estimatedArrival.setMinutes(estimatedArrival.getMinutes() + item.duration);

            const arrivalHour = estimatedArrival.getHours().toString().padStart(2, '0');
            const arrivalMinute = estimatedArrival.getMinutes().toString().padStart(2, '0');
            const arrivalFormatted = `${arrivalHour}:${arrivalMinute}`;

            message = `🕒 Reservaste a las ${reservedHourStr}:${reservedMinuteStr}, próximo bus pasa a las ${nextBusFormatted}, llegada estimada a las ${arrivalFormatted} (aprox. ${item.duration} min) en 📍${item.stop}`;
          } else {
            let futureBusHour: number;
            let futureBusMinute: number;

            if (currentMinute < 20) {
              futureBusHour = currentHour;
              futureBusMinute = 20;
            } else if (currentMinute < 40) {
              futureBusHour = currentHour;
              futureBusMinute = 40;
            } else {
              futureBusHour = (currentHour + 1) % 24;
              futureBusMinute = 0;
            }

            const futureBusFormatted = `${String(futureBusHour).padStart(2, '0')}:${String(futureBusMinute).padStart(2, '0')}`;

            message = `❌ Reservaste a las ${reservedHourStr}:${reservedMinuteStr}, el bus ya pasó. Próximo bus pasa a las ${futureBusFormatted} en 📍${item.stop}`;
          }
        } else {
          message = `🗓️ Reserva para ${item.day} a las ${reservedHourStr}:${reservedMinuteStr} en 📍${item.stop}`;
        }

        newNotifications.push({
          message,
          key: `${item.busName}-${item.stop}-${item.time}`,
          day: item.day,
        });
      }

      setNotifications(newNotifications);
    };

    checkBuses();
    const interval = setInterval(checkBuses, 60000);
    return () => clearInterval(interval);
  }, [schedule, agency, routeTagMap]);

  return notifications;
}
