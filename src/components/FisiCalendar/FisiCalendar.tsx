import FullCalendar from '@fullcalendar/react';
import CalendarColumn from './CalendarColumn';
import styles from './FisiCalendar.module.scss';

function FisiCalendar() {
  const days = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

  return (
    <main className={styles.main}>
      <article className={styles.calendar}>
        <FullCalendar />
        {/* <CalendarColumn />
        {
          days.map(day => (
            <CalendarColumn
              key={day}
              label={day}
            />
          ))
        } */}
      </article>
    </main>
  );
}

export default FisiCalendar;
