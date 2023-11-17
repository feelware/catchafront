import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';
import uniqolor from 'uniqolor';
import { Button, Group, Loader, Modal, Text } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import { AssignedGroupsResponse } from './types';
import { repeat } from '../../utils';
import styles from './Horarios.module.scss';

export function Calendar() {
  const { height } = useViewportSize();
  const firstRender = useRef(true);
  const stackContainer = useRef<HTMLElement | null>(null);
  const [nGroups, setNGroups] = useState(0);
  const [currentGroup, setCurrentGroup] = useState<number>(1);
  const [assignedGroups, setAssignedGroups] = useState<AssignedGroupsResponse>({});
  const [opened, { open, close }] = useDisclosure(false);

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

  const handleConfirmSelections = () => {
    close();
  };

  return (
    <div className={styles.calendar}>
      <ToastContainer />
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmar la creción de los horarios"
        centered
      >
        <Group>
          <Text>
            Está apunto de asignar los horarios
          </Text>
        </Group>
        <Group mt="md">
          <Button onClick={handleConfirmSelections}>Confimar</Button>
        </Group>
      </Modal>
      <h2>Selección de horarios</h2>
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

      { nGroups > 0 ?
          <section style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '10px',
        }}
          >
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={false}
            allDaySlot={false}
            slotEventOverlap={false}
            expandRows
            droppable
            editable
            drop={info => {
              const course = info.draggedEl.dataset.courseCode!;
              const assignedCourse = assignedGroups[currentGroup]
                .find(c => c.curso.cur_vcCodigo === course);
              console.log(assignedCourse);
              // eslint-disable-next-line no-param-reassign
              info.draggedEl.style.backgroundColor = uniqolor(assignedCourse!.curso.cur_vcNombre, {
                saturation: 45,
                lightness: [60, 70],
              }).color;
              info.draggedEl.remove();
              console.log(info.draggedEl);
            }}
            eventOverlap={() => false}
            eventDurationEditable={false}
            dayHeaderFormat={{ weekday: 'short' }}
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            events={[]}
            slotDuration="0:30:00"
            height={height - 300}
          />
          <section ref={stackContainer} className={styles.stackContainer}>
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
          </section> : <Loader />}
      <Button
        style={{
          marginTop: '1rem',
        }}
        onClick={open}
      >
        Confirmar horarios
      </Button>
    </div>
  );
}
