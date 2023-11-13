import { useRef } from "react";
import styles from "./CalendarCell.module.scss";
import { useHover } from "@mantine/hooks";

interface Props {
  start: number,
  duration: number
}

/**
 * Time intervals are measured in minutes
 */
function CalendarCell({ start, duration }: Props) {
  const { hovered, ref } = useHover();

  return (
    <div
      className={`${styles.cell} ${hovered && styles.hovered}`}
      ref={ref}
    >
      {start}
    </div>
  );
}

export default CalendarCell;
