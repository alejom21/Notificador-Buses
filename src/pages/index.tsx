
import Head from 'next/head';
import styled from 'styled-components';
import GlobalStyle from '../styles/GlobalStyles';
import BusSelector from '../components/BusSelector';
//import ScheduleConfig from '../components/ScheduleConfig';
//import NotificationPanel from '../components/NotificationPanel';


const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Notificador de proximos Buses</title>
        <meta name="description" content="Recibe alertas de tu bus favorito" />
      </Head>
      <GlobalStyle />
      <Container>
        <h1>Notificador de proximos Buses</h1>
        <BusSelector />
        {/* <ScheduleConfig />
        <NotificationPanel /> */}
      </Container>
    </>
  );
}