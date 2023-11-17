import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useViewportSize } from '@mantine/hooks';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';

import uniqolor from 'uniqolor';
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
  const stackContainer = useRef<HTMLElement | null>(null);
  const [nGroups, setNGroups] = useState(0);
  const [currentGroup, setCurrentGroup] = useState<number>(1);
  const [assignedGroups, setAssignedGroups] = useState<AssignedGroupsResponse>({});

  useEffect(() => {
    console.log('fetching...');
    fetch(`${import.meta.env.VITE_API_URL}/secciones/epis/${'2023-II'}`)
      .then(response => response.json())
      .then((groups: AssignedGroupsResponse) => {
        console.log({ groups });
        setNGroups(Object.keys(groups).length);
        setAssignedGroups(groups);
      });
  }, []);

  useEffect(() => {
    console.log(nGroups, stackContainer.current, firstRender.current);
    if (nGroups === 0) return;
    if (!stackContainer.current) return;
    if (!firstRender.current) return;
    firstRender.current = false;

    new Draggable(stackContainer.current, {
      itemSelector: '.fc-event',
      eventData(eventEl) {
        return {
          title: assignedGroups[currentGroup]
            .find(({ curso }) => (
              curso.cur_vcCodigo === eventEl.dataset.courseCode
            ))?.curso.cur_vcNombre,
          duration: '02:00',
        };
      },
    });
  }, [assignedGroups, currentGroup]);

  return (
    <div className={styles.calendar}>
      <nav>
        {
          repeat(nGroups, (g) => (
            <li
              className={styles.navGroupItem}
              data-active={currentGroup === g + 1}
              key={g}
              onClick={() => setCurrentGroup(g + 1)}
            >Sección {g + 1}
            </li>
          ))
        }
      </nav>
      <section ref={stackContainer}>
        {
          assignedGroups[currentGroup] &&
          assignedGroups[currentGroup].map(({ curso }, i) => (
            <div
              key={i}
              data-course-code={curso.cur_vcCodigo}
              className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
              style={{ backgroundColor: uniqolor(curso.cur_vcNombre, {
                saturation: 45,
                lightness: [60, 70],
              }).color }}
            >
                <div className="fc-event-main">
                  {curso.cur_vcNombre}
                </div>
            </div>
          ))
        }
      </section>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        allDaySlot={false}
        slotEventOverlap={false}
        expandRows
        droppable
        editable
        drop={info => console.log(info)}
        eventOverlap={() => false}
        eventDurationEditable={false}
        dayHeaderFormat={{ weekday: 'short' }}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        slotDuration="0:30:00"
        height={height - 40}
      />
      <EventStack />
    </div>
  );
}
