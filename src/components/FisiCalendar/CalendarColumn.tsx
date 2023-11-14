import CalendarCell from './CalendarCell';
import classes from './CalendarCell.module.scss';

interface Props {
  label?: string
}

const DAY_START_MINUTE = 8 * 60;
const DAY_END_MINUTE = 22 * 60;
const DAY_SCHEDULE_INTERVAL_MINUTE = 60; // minutes

function CalendarColumn({ label }: Props) {
  const nSchedules = Math.floor(
    (DAY_END_MINUTE - DAY_START_MINUTE) / DAY_SCHEDULE_INTERVAL_MINUTE
  );
  const cells = Array(nSchedules).fill(null).map((_, i) => ({
    start: DAY_START_MINUTE + DAY_SCHEDULE_INTERVAL_MINUTE * i,
  }));

  return (
    <section className={classes.column}>
      <header className={classes.day}>{label || <>&nbsp;</>}</header>
      {
        cells.map((cell) => (
          <CalendarCell
            key={cell.start}
            duration={DAY_SCHEDULE_INTERVAL_MINUTE}
            start={cell.start}
            day={label}
          />
        ))
      }
    </section>
  );
}

export default CalendarColumn;
