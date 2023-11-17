import { useViewportSize } from '@mantine/hooks';
import Calendar from '../components/Horarios/Calendar';
import EventStack from '../components/Horarios/EventStack';

export function CalendarPage() {
  const { width } = useViewportSize();

  return (
    <div
      style={{
        width,
        display: 'flex',
      }}
    >
      <Calendar />
      <EventStack />
    </div>
  );
}
