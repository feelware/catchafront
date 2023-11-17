import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CourseAPIResponse } from '../components/GroupsSelection/types';

// En el localStorage guardamos un mapeo de código->checkboxes
interface GroupSelectionStore {
  selections: {
    [groupCode: string]: boolean[]
  },
  nGroups: number,
  toggleSelection: (courseCode: string, column: number) => void,
  toggleEntireColumn: (column: number, value: boolean) => void,
  addNewGroup: () => void,
  updateWithFetchedCourses: (groups: CourseAPIResponse[]) => void
}

export const useGroupSelections = create<GroupSelectionStore>()(
  persist(
    (set, get) => ({
      selections: {},
      nGroups: 0,
      toggleSelection: (groupCode: string, column: number) => {
        // toggles the index of the groupCode
        const { selections } = get();
        const toggled = selections[groupCode][column];
        const newSelections = {
          ...selections,
          [groupCode]: selections[groupCode].map((value, i) => {
            if (toggled === false && i <= column) {
              return true;
            }
            if (toggled === true && i === column) {
              return false;
            }
            return value;
          }),
        };
        set({ selections: newSelections });
      },
      toggleEntireColumn: (column: number, value: boolean) => {
        const { selections } = get();
        Object.values(selections).forEach((selection) => {
          selection[column] = value; // eslint-disable-line no-param-reassign
        });
        set({ selections });
      },
      addNewGroup: () => {
        const { selections, nGroups } = get();
        // add one empty (false) selection to each group
        Object.values(selections).forEach((selection) => {
          selection.push(false);
        });
        set({ selections, nGroups: nGroups + 1 });
      },
      updateWithFetchedCourses: (courses) => {
        const { selections } = get();
        if (Object.values(selections).length === 0) {
          useGroupSelections.setState({
            nGroups: 1,
            selections: {
              ...courses.reduce((acc, course) => ({
                ...acc,
                [course.cur_vcCodigo]: [false],
              }), {}),
            },
          });
        }
      },
    }),
    {
      name: 'group-selection',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
