import { UniqueIdentifier } from "@dnd-kit/core";

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
}

export interface Course {
  id: CourseID;
  name: string;
  credits: number;
}

export interface ScheduleState {
  semesterOrder: SemesterOrder;
  coursesBySemesterID: CoursesBySemesterID;
  semesterByID: SemestersByID;
  courses: CourseByID;
}

export interface ScheduleActions {
  setSemesterOrder: (semOrder: SemesterOrder) => void;
  setCoursesBySemesterID: (semesters: CoursesBySemesterID) => void;
  setCourses: (courses: CourseByID) => void;
  ___TEMP___populate: () => void;
  ______reset______(): void;
}