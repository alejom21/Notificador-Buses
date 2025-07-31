import styled from 'styled-components';
/* import { busRoutes } from '../data/buses'; */
import { useAgencies } from '../hooks/useAgencies';
import { useRoutes } from '../hooks/useRoutes';
/* import { parseStringPromise } from 'xml2js'; */

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
  const { agencies, loading: loadingAgencies } = useAgencies();
  const { routes, loading: loadingRoutes } = useRoutes(selectedAgency);
  const selectedRouteObj = routes.find((r) => r.tag === selectedRoute);
  

  return (
    <SelectorContainer>
      <h2>Selecciona Agencia, Ruta y Paradero</h2>

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
    </SelectorContainer>
  );
}
