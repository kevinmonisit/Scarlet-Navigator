'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { Course, CourseByID, CoursesBySemesterID, ScheduleActions, ScheduleState, Semester, SemesterOrder } from '@/types/models';
import { COURSE_CREATION_CONTAINER_ID, COURSE_CREATION_COURSE_ID } from '@/app/features/leftPanel/courseCreation/CourseCreation';

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, 'has been retrieved')
    return (await get(name)) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, 'with value', value, 'has been saved')
    await set(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, 'has been deleted')
    await del(name)
  },
}
export const useScheduleStore = create<ScheduleActions & ScheduleState>()((set, get) => ({
  semesterOrder: [],
  coursesBySemesterID: {},
  semesterByID: {},
  courses: {},
  setSemesterOrder: (semOrder: SemesterOrder) => set({
    "semesterOrder": semOrder
  }),
  setCoursesBySemesterID: (semesters: CoursesBySemesterID) => set({
    "coursesBySemesterID": semesters
  }),
  setCourses: (courses: CourseByID) => set({
    "courses": courses
  }),
  ___TEMP___populate: () => {
    set(createDummySchedule());
  },
  ______reset______: () => {
    set({
      semesterOrder: [],
      coursesBySemesterID: {},
      semesterByID: {},
      courses: {},
    })
  },
}));

let counter = 0;
function createCourseArray() {
  return Array.from({ length: 5}, (_, i) => {
    const id = Math.random().toString(36).substring(2, 9);

    return {
      id,
      name: `Course ${++counter}`,
      credits: Math.floor(Math.random() * 4) + 1,
    };
  });
}

const NUM_SEMESTERS = 3;

const allCourses: Course[][] = Array.from({ length: NUM_SEMESTERS}, (_, i) => createCourseArray());
const semesterArray: Semester[] = Array.from({ length: NUM_SEMESTERS}, (_, i) => ({
  id: `semester${i}`,
  courses: allCourses[i].map(course => course.id),
}));

const semesterOrder = semesterArray.map(semester => semester.id);

export const createDummySchedule = (): ScheduleState => {
  const courses: CourseByID = {};

  allCourses.forEach(semester => {
    semester.forEach(course => {
      courses[course.id] = course;
    });
  });

  const coursesBySemesterID: CoursesBySemesterID = {};
  const semesterByID: Record<string, Semester> = {};

  semesterArray.forEach(semester => {
    coursesBySemesterID[semester.id] = semester.courses;
    semesterByID[semester.id] = semester;
  });

  coursesBySemesterID[COURSE_CREATION_CONTAINER_ID] = [COURSE_CREATION_COURSE_ID];

  return {
    semesterOrder,
    coursesBySemesterID,
    courses,
    semesterByID,
  };
}