import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useViewportSize } from '@mantine/hooks';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';

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
  const firstRender = useRef(true);
  const event = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!event.current) return;
    if (!firstRender.current) return;
    firstRender.current = false;

    // console.log(window.getElementById('eventito'));
    new Draggable(event.current, {
      itemSelector: '.fc-event',
      eventData(eventEl) {
        return {
          title: eventEl.innerText,
          duration: '02:00',
        };
      },
    });
  }, []);

  return (
    <div className={classes.calendar}>
      <div ref={event} className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
          <div className="fc-event-main">My Event 1</div>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        allDaySlot={false}
        slotEventOverlap={false}
        expandRows
        droppable
        editable
        eventOverlap={() => false}
        eventDurationEditable={false}
        dayHeaderFormat={{ weekday: 'short' }}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="1:00:00"
        height={height - 40}
      />
    </div>
  );
}
