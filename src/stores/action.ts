import { create } from 'zustand';

interface CalendarActionState {
  isDragging: boolean;
}

const useCalendarAction = create<CalendarActionState>()((set) => ({
  isDragging: false
}));

// watch for drag and release

window.addEventListener('mousedown', () => {
  useCalendarAction.setState({ isDragging: true });
});

window.addEventListener('mouseup', () => {
  useCalendarAction.setState({ isDragging: false });
});
