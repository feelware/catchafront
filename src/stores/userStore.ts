import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type LoggedUserInformation = {
  id: number,
  name: string,
  email: string,
  password: string,
  roles: Array<'horarios' | 'grupos' | 'semestres' | 'aulas' | 'admin'>,
};

export interface LoggedUser {
  user: null | LoggedUserInformation
}

export const useUser = create<LoggedUser>()(
  persist(
    (_) => ({ // eslint-disable-line @typescript-eslint/no-unused-vars
      user: null,
    }),
    {
      name: 'group-selection',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
