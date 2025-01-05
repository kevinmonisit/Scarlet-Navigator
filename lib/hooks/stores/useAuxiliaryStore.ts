import { CourseID, SemesterID } from '@/types/models';
import { create } from 'zustand';

type AuxiliaryStore = {
  recentlyMovedToNewContainer: React.MutableRefObject<boolean> | null;
  activeID: SemesterID;
  currentInfoCourseID: CourseID;
  setRecentlyMovedToNewContainer: (flag: React.MutableRefObject<boolean>) => void;
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
  setRecentlyMovedToNewContainer: (flag: React.MutableRefObject<boolean>) =>
    set({ recentlyMovedToNewContainer: flag }),
  setActiveID: (id: SemesterID) => {
    console.log('new active id', id);
    set({ activeID: id })
  },
  setCurrentInfoCourseID: (id: CourseID) => set({ currentInfoCourseID: id })
}));

export default useAuxiliaryStore;
