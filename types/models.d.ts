import { UniqueIdentifier } from '@dnd-kit/core';

export enum STORE_NAMES {
  schedule = 'schedule',
  courses = 'courses',
  semesters = 'semesters',
}

type CourseID = string | UniqueIdentifier;
type SemesterID = string | UniqueIdentifier;
type CourseByID = Record<CourseID, Course>;
type CoursesBySemesterID = Record<SemesterID, CourseID[]>;
type SemestersByID = Record<SemesterID, Semester>;
type SemesterOrder = SemesterID[];

export interface Semester {
  id: SemesterID;
  courses: CourseID[]; //ordered
  title: string;
}

export interface Course {
  id: CourseID;
  name: string;
  credits: number;
  cores: string[];
}

export interface ScheduleState {
  semesterOrder: SemesterOrder;
  coursesBySemesterID: CoursesBySemesterID;
  semesterByID: SemestersByID;
  courses: CourseByID;
  globalCores: Set<string>;
  past: Array<Omit<ScheduleState, 'past' | 'future'>>;
  future: Array<Omit<ScheduleState, 'past' | 'future'>>;
}

export interface ScheduleActions {
  setSemesterOrder: (semOrder: SemesterOrder) => void;
  setCoursesBySemesterID: (
    semesters: CoursesBySemesterID,
    skipHistory?: boolean
  ) => void;
  setCourses: (courses: CourseByID) => void;
  addCourse: (name: string, credits: number, cores: string[]) => CourseID;
  addGlobalCores: (cores: string[]) => void;
  handleDragOperation: (
    semesters: CoursesBySemesterID,
    isNewContainerMove?: boolean
  ) => void;
  updateCourse: (id: CourseID, updates: Partial<Course>) => void;
  updateSemester: (id: SemesterID, updates: Partial<Semester>) => void;
  removeSemester: (id: SemesterID) => void;
  undo: () => void;
  redo: () => void;
  ___TEMP___populate: () => void;
  ______reset______(): void;
}

export interface CoreRequirement {
  id: string;
  name: string;
  requiredCredits: number;
}

export interface CoreCategory {
  id: string;
  name: string;
  cores: CoreRequirement[]; // The number of cores in this array determines the required cores
}

export interface CoreRequirementsState {
  categories: Record<string, CoreCategory>;
}

export interface CoreRequirementsActions {
  addCategory: (name: string) => void;
  removeCategory: (id: string) => void;
  addCoreToCategory: (
    categoryId: string,
    coreName: string,
    requiredCredits: number
  ) => void;
  removeCoreFromCategory: (categoryId: string, coreId: string) => void;
  updateCategory: (categoryId: string, updates: Partial<CoreCategory>) => void;
  updateCoreRequirement: (
    categoryId: string,
    coreId: string,
    updates: Partial<CoreRequirement>
  ) => void;
}
