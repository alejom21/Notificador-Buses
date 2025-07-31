import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #111827;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MessageItem = styled.li`
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageText = styled.span`
  font-size: 1rem;
  color: #374151;
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #b91c1c;
  }
`;

const EmptyMessage = styled.p`
  color: #6b7280;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
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
      <Divider />
      <Title>📅 Reservas de Hoy ({currentDay})</Title>
      {todayNotifications.length === 0 ? (
        <EmptyMessage>No hay reservas programadas para hoy.</EmptyMessage>
      ) : (
        <MessageList>
          {todayNotifications.map((notif) => (
            <MessageItem key={notif.key}>
              <MessageText>{notif.message}</MessageText>
              <DeleteButton onClick={() => onDelete(notif.key)}>❌</DeleteButton>
            </MessageItem>
          ))}
        </MessageList>
      )}
    </Container>
  );
}