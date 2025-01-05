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
      globalCores: new Set<string>(),

      setSemesterOrder: (semOrder: SemesterOrder) => set({
        "semesterOrder": semOrder
      }),
      setCoursesBySemesterID: (semesters: CoursesBySemesterID) => set({
        "coursesBySemesterID": semesters
      }),
      setCourses: (courses: CourseByID) => set({
        "courses": courses
      }),
      addGlobalCores: (cores: string[]) => {
        const state = get();
        const updatedCores = new Set(state.globalCores);
        cores.forEach(core => updatedCores.add(core));
        set({ globalCores: updatedCores });
      },
      addCourse: (name: string, credits: number, cores: string[] = []) => {
        const state = get();
        const newCourseId = `course_${Date.now()}`;
        const newCourse: Course = {
          id: newCourseId,
          name: name.trim(),
          credits: credits,
          cores: cores
        };

        // Add new cores to global set
        const updatedCores = new Set(state.globalCores);
        cores.forEach(core => updatedCores.add(core));

        // Update courses
        const updatedCourses = {
          ...state.courses,
          [newCourseId]: newCourse
        };

        // Update coursesBySemesterID
        const updatedCoursesBySemesterID = {
          ...state.coursesBySemesterID,
          [COURSE_CREATION_CONTAINER_ID]: [
            ...(state.coursesBySemesterID[COURSE_CREATION_CONTAINER_ID] || []),
            newCourseId
          ]
        };

        set({
          courses: updatedCourses,
          coursesBySemesterID: updatedCoursesBySemesterID,
          globalCores: updatedCores
        });

        return newCourseId;
      },
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
      cores: [`CORE${i + 1}`],
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

  // Create initial global cores set
  const globalCores = new Set<string>();
  allCourses.forEach(semester => {
    semester.forEach(course => {
      course.cores.forEach(core => globalCores.add(core));
    });
  });

  return {
    semesterOrder,
    coursesBySemesterID,
    courses,
    semesterByID,
    globalCores,
  };
}