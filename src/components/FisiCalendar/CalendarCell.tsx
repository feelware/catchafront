// import { useRef } from 'react';
import { useHover } from '@mantine/hooks';
import styles from './CalendarCell.module.scss';

interface Props {
  start: number,
  duration: number
  day?: string
}

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins < 10 ? '0' : ''}${mins}`;
}

/**
 * Time intervals are measured in minutes
 */
function CalendarCell({ start, duration, day }: Props) {
  const { hovered, ref } = useHover();

  return (
    <div
      className={`${styles.cell} ${!day ? styles.time : styles.block} ${hovered ? styles.hovered : ''}`}
      ref={ref}
    >
      {!day && minutesToTime(start)}
    </div>
  );
}

export default CalendarCell;
