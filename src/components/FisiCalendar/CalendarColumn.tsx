import CalendarCell from "./CalendarCell";

interface Props {
  dayName: string
};

const DAY_START_MINUTE = 8 * 60;
const DAY_END_MINUTE = 22 * 60;
const DAY_SCHEDULE_INTERVAL_MINUTE = 60; // minutes

function CalendarColumn({ dayName }: Props) {
  const nSchedules = Math.floor(
    (DAY_END_MINUTE - DAY_START_MINUTE) / DAY_SCHEDULE_INTERVAL_MINUTE
  );
  const cells = Array(nSchedules).fill(null).map((_, i) => ({
    start: DAY_START_MINUTE + DAY_SCHEDULE_INTERVAL_MINUTE * i
  }));

  return (
    <section style={{ minWidth: 100 }}>
      <header>{dayName}</header>
      {
        cells.map((cell) => (
          <CalendarCell
            key={cell.start}
            duration={DAY_SCHEDULE_INTERVAL_MINUTE}
            start={cell.start}
          />
        ))
      }
    </section>
  );
}

export default CalendarColumn;
