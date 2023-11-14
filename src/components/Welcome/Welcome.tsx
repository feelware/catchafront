import { Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      {/* <Calendar
        static
        renderDay={(date) => {
          const day = date.getDate();
          return (
            <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
              <div>{day}</div>
            </Indicator>
          );
        }}
      /> */}
    </>
  );
}
