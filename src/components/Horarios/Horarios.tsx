import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useViewportSize } from '@mantine/hooks';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';

import classes from './Horarios.module.scss';

export function EventStack() {
  return (
    <article id="external-events" className={classes.stack}>
      <h3>Cursos disponibles</h3>
      <div className={classes.event}>Curso 1</div>
      <div className={classes.event}>Curso 2</div>
      <div className={classes.event}>Curso 3</div>
      <div className={classes.event}>Curso 4</div>
      <div className={classes.event}>Curso 5</div>
    </article>
  );
}

export function Calendar() {
  const { height } = useViewportSize();

  return (
    <div className={classes.calendar}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        allDaySlot={false}
        slotEventOverlap={false}
        expandRows
        droppable
        editable
        dayHeaderFormat={{ weekday: 'short' }}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="1:00:00"
        height={height - 40}
      />
    </div>
  );
}
