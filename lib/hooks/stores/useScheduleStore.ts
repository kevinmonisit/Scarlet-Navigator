'use client';

import { StateCreator, create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { Course, CourseByID, CoursesBySemesterID, ScheduleActions, ScheduleState, Semester, SemesterOrder } from '@/types/models';
import { COURSE_CREATION_CONTAINER_ID, COURSE_CREATION_COURSE_ID } from '@/app/features/leftPanel/courseCreation/CourseCreation';

type ScheduleStore = ScheduleActions & ScheduleState;
type SchedulePersist = (
  config: StateCreator<ScheduleStore>,
  options: PersistOptions<ScheduleStore>
) => StateCreator<ScheduleStore>;

export const useScheduleStore = create<ScheduleStore>()(
  (persist as SchedulePersist)(
    (set: (state: Partial<ScheduleStore>) => void, get: () => ScheduleStore) => ({
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
    }),
    {
      name: 'schedule-storage',
    }
  )
);

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