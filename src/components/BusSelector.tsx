import styled from 'styled-components';
import { useAgencies } from '../hooks/useAgencies';
import { useRoutes } from '../hooks/useRoutes';

const SelectorContainer = styled.div`
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

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 1rem;
  color: #374151;
  min-width: 220px;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
    outline: none;
  }
`;

interface BusSelectorProps {
  selectedAgency: string;
  setSelectedAgency: (agency: string) => void;
  selectedRoute: string;
  setSelectedRoute: (route: string) => void;
  selectedStop: string;
  setSelectedStop: (stop: string) => void;
  selectedDestinationStop: string;
  setSelectedDestinationStop: (stop: string) => void;
}

export default function BusSelector({
  selectedAgency,
  setSelectedAgency,
  selectedRoute,
  setSelectedRoute,
  selectedStop,
  setSelectedStop,
  selectedDestinationStop,
  setSelectedDestinationStop, 
}: BusSelectorProps) {
  const { agencies/* , loading: loadingAgencies */ } = useAgencies();
  const { routes/* , loading: loadingRoutes */ } = useRoutes(selectedAgency);
  const selectedRouteObj = routes.find((r) => r.tag === selectedRoute);
  

  return (
    <SelectorContainer>
      <Title>Selecciona Agencia, Ruta y Paradero</Title>

      <SelectWrapper>
        <Select
        value={selectedAgency}
        onChange={(e) => {
          setSelectedAgency(e.target.value);
          setSelectedRoute('');
          setSelectedStop('');
          setSelectedDestinationStop(''); 
        }}
      >
        <option value="">-- Agencia --</option>
        {agencies.map((a) => (
          <option key={a.tag} value={a.tag}>
            {a.title}
          </option>
        ))}
        </Select>

        {selectedAgency && (
        <Select
          value={selectedRoute}
          onChange={(e) => {
            setSelectedRoute(e.target.value);
            setSelectedStop('');
            setSelectedDestinationStop(''); 
          }}
        >
          <option value="">-- Ruta --</option>
          {routes.map((r) => (
            <option key={r.tag} value={r.tag}>
              {r.title}
            </option>
          ))}
        </Select>
        )}

        {selectedRoute && selectedRouteObj && (
        <>
          <Select 
              value={selectedStop} 
              onChange={(e) => {
                setSelectedStop(e.target.value);
              }}>
            <option value="">-- Paradero Origen --</option>
            {selectedRouteObj.stops.map((s) => (
              <option key={s.stopId} value={s.title}>
                {s.title}
              </option>
            ))}
          </Select>

          <Select 
            value={selectedDestinationStop} 
            onChange={(e) => setSelectedDestinationStop(e.target.value)}
          >
            <option value="">-- Paradero Destino --</option>
            {selectedRouteObj.stops.map((s) => (
              <option key={s.stopId} value={s.title}> 
                {s.title}
              </option>
            ))}
          </Select>
        </>        
        )}
      </SelectWrapper>
    </SelectorContainer>
  );
}
