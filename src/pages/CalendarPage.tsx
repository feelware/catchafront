import { Calendar } from '../components/Horarios/Horarios';

export function CalendarPage() {
  return (
    <>
      <div
        style={{
          width: '100%',
          overflowX: 'hidden',
          display: 'flex',
        }}
      >
        <Calendar />
      </div>
    </>
  );
}
