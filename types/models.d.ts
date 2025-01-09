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

/*

TODO:
Certainly, I think the Schedule store API can be improved greatly.
As I code to reach the MVP, I will set aside this task to a later point.

I think the overall engine API can be improved as well. However, the featureset
of the MVP is not so crazy that it'd be near impossible to refactor. I will have
some time at the end of the semester to clean this up, and make sure that the
foundation of this project is insured for the future
(so peeps don't replicate inefficiencies for the sake of consistency)

*/
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

export interface ProgramOfStudy {
  id: string;
  name: string;
  categoryIds: string[];
}

export interface ProgramFulfillmentState {
  categories: Record<string, CoreCategory>;
  programs: Record<string, ProgramOfStudy>;
}

export interface ProgramFulfillmentActions {
  // Category actions
  addCategory: (name: string) => string;
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

  // Program actions
  addProgram: (name: string) => void;
  removeProgram: (id: string) => void;
  updateProgram: (id: string, updates: Partial<ProgramOfStudy>) => void;
  addCategoryToProgram: (programId: string, categoryId: string) => void;
  removeCategoryFromProgram: (programId: string, categoryId: string) => void;
}
