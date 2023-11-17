import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useViewportSize } from '@mantine/hooks';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';

import { AssignedGroupsResponse } from './types';
import { repeat } from '../../utils';
import styles from './Horarios.module.scss';

export function EventStack() {
  return (
    <article id="external-events" className={styles.stack}>
      <h3>Cursos disponibles</h3>
      <div className={styles.event}>Curso 1</div>
      <div className={styles.event}>Curso 2</div>
      <div className={styles.event}>Curso 3</div>
      <div className={styles.event}>Curso 4</div>
      <div className={styles.event}>Curso 5</div>
    </article>
  );
}

export function Calendar() {
  const { height } = useViewportSize();
  const firstRender = useRef(true);
  const [nGroups, setNGroups] = useState(0);
  const [currentGroup, setCurrentGroup] = useState<number>(1);
  const [assignedGroups, setAssignedGroups] = useState<AssignedGroupsResponse[]>([]);
  const event = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!event.current) return;
    if (!firstRender.current) return;
    firstRender.current = false;

    fetch(`${import.meta.env.VITE_API_URL}/secciones/epis/${'2023-II'}`)
      .then(response => response.json())
      .then((groups: AssignedGroupsResponse[]) => {
        setNGroups(Object.keys(groups).length);
        setAssignedGroups(groups);
      });

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

  useEffect(() => {
    console.log({ assignedGroups });
    console.log(assignedGroups[currentGroup]);
  }, [assignedGroups]);

  return (
    <div className={styles.calendar}>
      <nav>
        {
          repeat(nGroups, (g) => (
            <li
              className={styles.navGroupItem}
              key={g}
              onClick={() => setCurrentGroup(g + 1)}
            >{g + 1}
            </li>
          ))
        }
      </nav>
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
      <EventStack />
    </div>
  );
}
