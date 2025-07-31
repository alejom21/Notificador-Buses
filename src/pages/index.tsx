import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import GlobalStyle from '../styles/GlobalStyles';
import BusSelector from '../components/BusSelector';
import ScheduleConfig from '../components/ScheduleConfig';
import NotificationPanel from '../components/NotificationPanel';
import { useRoutes } from '../hooks/useRoutes';
import {useBusNotifications} from '../hooks/useBusNotifications';
import { ScheduleItem } from '../types';


const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export default function Home() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

  const [selectedAgency, setSelectedAgency] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedStop, setSelectedStop] = useState<string>('');
  const [selectedDestinationStop, setSelectedDestinationStop] = useState<string>('');

  const { routes, loading: loadingRoutes } = useRoutes(selectedAgency);

  const selectedRouteObj = routes.find((r) => r.tag === selectedRoute);
  const selectedBus = selectedRouteObj ? { name: selectedRouteObj.title } : undefined;

  const routeTagMap = routes.reduce((acc, r) => {
    acc[r.title] = r.tag;
    return acc;
  }, {} as Record<string, string>);

  const notifications = useBusNotifications(schedule, selectedAgency, routeTagMap);

  const handleDeleteReservation = (keyToDelete: string) => {
    setSchedule((prev) =>
      prev.filter((item) => {
        const generatedKey = `${item.busName}-${item.stop}-${item.time}`;
        return generatedKey !== keyToDelete;
      })
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem('schedule');
    if (saved) {
      setSchedule(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  return (
    <>
      <Head>
        <title>Reserva tus Buses</title>
        <meta name="description" content="Recibe alertas de tu bus favorito" />
      </Head>
      <GlobalStyle />
      <Container>
        <h1>Reserva tus Buses</h1>

        <BusSelector
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
          selectedDestinationStop={selectedDestinationStop}
          setSelectedDestinationStop={setSelectedDestinationStop} 
        />

        <ScheduleConfig
          selectedBus={selectedBus}       
          selectedStop={selectedStop}  
          selectedDestinationStop={selectedDestinationStop}       
          schedule={schedule}
          setSchedule={setSchedule}
        />

        <NotificationPanel 
          notifications={notifications}
          onDelete={handleDeleteReservation}
        />

      </Container>
    </>
  );
}
