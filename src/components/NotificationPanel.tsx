import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 12px;
`;

interface Notification {
  message: string;
  key: string;
  day: string;
}
interface NotificationPanelProps {
  notifications: Notification[];
  onDelete: (key: string) => void; 
}

export default function NotificationPanel({ notifications, onDelete  }: NotificationPanelProps) {
  
  const currentDay = new Date().toLocaleDateString('es-ES', { weekday: 'long' });

  const todayNotifications = notifications.filter(
    (notif) => notif.day.toLowerCase() === currentDay.toLowerCase()
  );
  
  return (
    <Container>
      <hr style={{ margin: '1rem 0' }} />

      <h3>📅 Reservas de Hoy ({currentDay})</h3>
      {todayNotifications.length === 0 ? (
        <p>No hay reservas programadas para hoy.</p>
      ) : (
        <ul>
          {todayNotifications.map((notif) => (
            <li key={notif.key}>
              {notif.message}
              <button
                onClick={() => onDelete(notif.key)}
                style={{
                  marginLeft: '1rem',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}