import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// En el localStorage guardamos un mapeo de código->checkboxes
interface GroupSelectionStore {
  selections: {
    [groupCode: string]: boolean[]
  },
  nGroups: number,
  toggleSelection: (courseCode: string, column: number) => void,
  toggleEntireColumn: (column: number, value: boolean) => void,
  addNewGroup: () => void,
}

export const useGroupSelections = create<GroupSelectionStore>()(
  persist(
    (set, get) => ({
      selections: {},
      nGroups: 0,
      toggleSelection: (groupCode: string, column: number) => {
        // toggles the index of the groupCode
        const { selections } = get();
        const newSelections = {
          ...selections,
          [groupCode]: [
            ...selections[groupCode].slice(0, column),
            !selections[groupCode][column],
            ...selections[groupCode].slice(column + 1)
          ]
        };
        console.log({newSelections})
        set({ selections: newSelections });
      },
      toggleEntireColumn: (column: number, value: boolean) => {
        const { selections } = get();
        Object.values(selections).forEach((selection) => {
          selection[column] = value;
        });
        set({ selections });
      },
      addNewGroup: () => {
        const { selections, nGroups } = get();
        // add one empty (false) selection to each group
        Object.values(selections).forEach((selection, groupCode) => {
          selection.push(false);
        });
        set({ selections, nGroups: nGroups + 1 });
      }
    }),
    {
      name: 'group-selection',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
