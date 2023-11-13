import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useViewportSize } from '@mantine/hooks'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

export function CalendarPage() {
  const { height, width } = useViewportSize()

  return (
    <main style = {{
      // display: 'flex',
      // flexDirection: 'row',
    }}>
      <FullCalendar
        plugins={[ timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        headerToolbar={false}
        allDaySlot={false}
        slotEventOverlap={false}
        expandRows={true}
        droppable={true}
        editable={true}
        dayHeaderFormat={ { weekday: 'short' } }
        slotMinTime={'08:00:00'}
        slotMaxTime={'22:00:00'}
        slotDuration={'1:00:00'}
        height={height}
      />
    </main>
  )
}