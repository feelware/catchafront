import { create } from 'zustand';

export interface User {
  user: null | {
    id: number,
    name: string,
    email: string,
    password: string,
    roles: Array<'horarios' | 'grupos' | 'semestres' | 'aulas' | 'admin'>,
  }
}

export const useUser = create<User>()(() => ({
  user: null,
}));
