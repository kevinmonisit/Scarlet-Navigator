import { CourseID, SemesterID } from '@/types/models';
import { create } from 'zustand';
import { RefObject } from 'react';

type AuxiliaryStore = {
  recentlyMovedToNewContainer: RefObject<boolean> | null;
  activeID: SemesterID;
  currentInfoCourseID: CourseID;
  activeTab: 'info' | 'core' | 'settings';
  setRecentlyMovedToNewContainer: (flag: RefObject<boolean>) => void;
  setActiveID: (id: SemesterID) => void;
  setCurrentInfoCourseID: (id: CourseID) => void;
  setActiveTab: (tab: 'info' | 'core' | 'settings') => void;
};

/**
 * Stores auxiliary state for the drag and drop functionality.
 */
const useAuxiliaryStore = create<AuxiliaryStore>()((set) => ({
  recentlyMovedToNewContainer: null,
  activeID: "",
  currentInfoCourseID: "",
  activeTab: "info",
  setRecentlyMovedToNewContainer: (flag: RefObject<boolean>) =>
    set({ recentlyMovedToNewContainer: flag }),
  setActiveID: (id: SemesterID) => {
    console.log('new active id', id);
    set({ activeID: id })
  },
  setCurrentInfoCourseID: (id: CourseID) => {
    set({
      currentInfoCourseID: id,
      activeTab: "info" // Switch to info tab when course changes
    })
  },
  setActiveTab: (tab: 'info' | 'core' | 'settings') => set({ activeTab: tab })
}));

export default useAuxiliaryStore;
