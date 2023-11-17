import { create } from 'zustand';

export interface CalendarState {
  events: Array<{
    cur_vcCodigo: string,
    inStack: boolean,
    durationMinutes: number,
  }>
}
