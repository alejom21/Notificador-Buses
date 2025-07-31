import { useState } from 'react';
import styled from 'styled-components';
import { ScheduleItem } from '../types';

const Container = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #111827;
  text-align: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const StyledSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 1rem;
  color: #374151;
  min-width: 200px;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    outline: none;
  }
`;

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  color: #374151;
  min-width: 150px;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    outline: none;
  }
`;

const Button = styled.button<{ danger?: boolean }>`
  padding: 0.75rem 1.2rem;
  background-color: ${({ danger }) => (danger ? '#ef4444' : '#4f46e5')};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ danger }) => (danger ? '#b91c1c' : '#3730a3')};
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const List = styled.ul`
  margin-top: 1rem;
  padding-left: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  color: #374151;
  font-size: 1rem;
`;

const Highlight = styled.strong`
  color: #111827;
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
      <Title>🗓️ Configura tu Semana</Title>

      <FormWrapper>
        <StyledSelect
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">-- Día --</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </StyledSelect>

        <StyledInput
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
      </FormWrapper>

      <List>
        {schedule.map((item, index) => (
          <ListItem key={index}>
            🗓️ Día: <Highlight>{item.day}</Highlight> | Hora: <Highlight>{item.time}</Highlight><br />
            🚌 Ruta: <Highlight>{item.busName}</Highlight><br />
            📍 Paradero origen: <Highlight>{item.stop}</Highlight><br />
            📍 Paradero destino: <Highlight>{item.destinationStop}</Highlight><br /> 
            ⏱️ Duración estimada: <Highlight>{item.duration} min</Highlight>
          </ListItem>
        ))}
      </List>

      {schedule.length > 0 && (
        <Button onClick={() => setSchedule([])} danger style={{ marginTop: '1.5rem' }}>
          Borrar Configuraciones
        </Button>
      )}
    </Container>
  );
}
