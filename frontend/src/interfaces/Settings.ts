/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum Month {
  FALL = 'Fall',
  SPRING = 'Spring',
  SUMMER = 'Summer',
}

interface Settings {
  creditsNeededToGraduate: number;
  startingSemester: Month;
  startingYear: number;
  startingCredits: number;
  minCredits: number;
  maxCredits: number;
  numberOfSemesters: number;
}

export { Month };
export type { Settings };
