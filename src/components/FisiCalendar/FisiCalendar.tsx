import styles from "./FisiCalendar.module.scss";
import CalendarColumn from "./CalendarColumn";

function FisiCalendar() {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <article className={styles.calendar}>
      {
        days.map(day => (
          <CalendarColumn
            key={day}
            dayName={day}
          />
        ))
      }
    </article>
  );
}

export default FisiCalendar;
