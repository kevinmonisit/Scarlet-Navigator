import { CourseID, SemesterID } from '@/types/models';
import { create } from 'zustand';
import { RefObject } from 'react';

type AuxiliaryStore = {
  recentlyMovedToNewContainer: RefObject<boolean> | null;
  activeID: SemesterID;
  currentInfoCourseID: CourseID;
  setRecentlyMovedToNewContainer: (flag: RefObject<boolean>) => void;
  setActiveID: (id: SemesterID) => void;
  setCurrentInfoCourseID: (id: CourseID) => void;
};

/**
 * Stores auxiliary state for the drag and drop functionality.
 */
const useAuxiliaryStore = create<AuxiliaryStore>()((set) => ({
  recentlyMovedToNewContainer: null,
  activeID: "",
  currentInfoCourseID: "",
  setRecentlyMovedToNewContainer: (flag: RefObject<boolean>) =>
    set({ recentlyMovedToNewContainer: flag }),
  setActiveID: (id: SemesterID) => {
    console.log('new active id', id);
    set({ activeID: id })
  },
  setCurrentInfoCourseID: (id: CourseID) => set({ currentInfoCourseID: id })
}));

export default useAuxiliaryStore;
