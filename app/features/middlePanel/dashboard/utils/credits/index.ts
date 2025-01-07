import {
  CourseID,
  SemesterID,
  Course,
  CoursesBySemesterID,
} from '@/types/models';

export function calculateSemesterCredits(
  courseIds: CourseID[],
  courses: Record<CourseID, Course>
): number {
  return courseIds.reduce((total: number, courseId) => {
    const course = courses[courseId];
    return total + (course ? course.credits : 0);
  }, 0);
}

export function calculateRunningCredits(
  semesterOrder: SemesterID[],
  coursesBySemesterID: CoursesBySemesterID,
  courses: Record<CourseID, Course>,
  currentSemesterId: SemesterID
): number {
  let total = 0;
  for (const semesterId of semesterOrder) {
    const credits = calculateSemesterCredits(
      coursesBySemesterID[semesterId] || [],
      courses
    );
    total += credits;
    if (semesterId === currentSemesterId) break;
  }
  return total;
}
