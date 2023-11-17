import { useViewportSize } from '@mantine/hooks';
import { Calendar, EventStack } from '../components/Horarios/Horarios';

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
