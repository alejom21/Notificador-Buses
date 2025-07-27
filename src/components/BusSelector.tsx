import { useState } from 'react';
import styled from 'styled-components';
import { busRoutes } from '../data/buses';

const SelectorContainer = styled.div`
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

export default function BusSelector() {
  const [selectedBusId, setSelectedBusId] = useState<string>('');
  const [selectedStop, setSelectedStop] = useState<string>('');

  const selectedBus = busRoutes.find((bus) => bus.id === selectedBusId);

  return (
    <SelectorContainer>
      <h2>Selecciona tu Bus y Paradero</h2>
      
      <Select
        value={selectedBusId}
        onChange={(e) => {
          setSelectedBusId(e.target.value);
          setSelectedStop(''); // Resetear paradero si cambia bus
        }}
      >
        <option value="">-- Selecciona un Bus --</option>
        {busRoutes.map((bus) => (
          <option key={bus.id} value={bus.id}>
            {bus.name}
          </option>
        ))}
      </Select>

      {selectedBus && (
        <Select
          value={selectedStop}
          onChange={(e) => setSelectedStop(e.target.value)}
        >
          <option value="">-- Selecciona un Paradero --</option>
          {selectedBus.stops.map((stop, index) => (
            <option key={index} value={stop}>
              {stop}
            </option>
          ))}
        </Select>
      )}

      {selectedBusId && selectedStop && (
        <p>
          ✅ Bus seleccionado: <strong>{selectedBus?.name}</strong> | Paradero:{' '}
          <strong>{selectedStop}</strong>
        </p>
      )}
    </SelectorContainer>
  );
}
