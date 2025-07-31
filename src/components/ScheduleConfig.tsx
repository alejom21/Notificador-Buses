import { useState } from 'react';
import styled from 'styled-components';
import { ScheduleItem } from '../types';

const Container = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-right: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

const List = styled.ul`
  margin-top: 1rem;
  padding-left: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f0f0f0;
  border-radius: 8px;
`;

const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

interface ScheduleConfigProps {
  selectedBus: { name: string } | undefined;
  selectedStop: string;
  selectedDestinationStop: string;
  schedule: ScheduleItem[];
  setSchedule: (s: ScheduleItem[]) => void;
}

export default function ScheduleConfig({
  selectedBus,
  selectedStop,
  selectedDestinationStop,
  schedule,
  setSchedule,
}: ScheduleConfigProps) {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleAddSchedule = () => {
    if (!selectedDay || !selectedTime || !selectedBus || !selectedStop || !selectedDestinationStop) return;

    const randomDuration = Math.floor(Math.random() * (45 - 15 + 1)) + 15; 

    setSchedule([
      ...schedule,
      {
        day: selectedDay,
        time: selectedTime,
        busName: selectedBus.name,
        stop: selectedStop,
        destinationStop: selectedDestinationStop,
        duration: randomDuration,
      },
    ]);

    setSelectedDay('');
    setSelectedTime('');
};

  return (
    <Container>
      <h2>Configura tu Semana</h2>
      <Select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        <option value="">-- Día --</option>
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </Select>

      <Input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />

      <Button 
        onClick={handleAddSchedule}
        disabled={!selectedDay || !selectedTime || !selectedBus || !selectedStop || !selectedDestinationStop}
        >
          Agregar
        </Button>

      <List>
        {schedule.map((item, index) => (
          <ListItem  key={index}>
            
            🗓️ Día: <strong>{item.day}</strong> | Hora: <strong>{item.time}</strong><br />
            🚌 Ruta: <strong>{item.busName}</strong><br />
            📍 Paradero origen: <strong>{item.stop}</strong><br />
            📍 Paradero destino: <strong>{item.destinationStop}</strong><br /> 
            ⏱️ Duración estimada: <strong>{item.duration} min</strong>
          </ListItem>
        ))}
      </List>
        <Button onClick={() => setSchedule([])} style={{ marginTop: '1rem', background: '#d32f2f' }}>
            Borrar Configuraciones
        </Button>  
    </Container>
  );
}
