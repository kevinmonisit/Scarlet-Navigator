/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum Month {
  FALL = 'Fall',
  SPRING = 'Spring',
  SUMMER = 'Summer',
}

interface Settings {
  creditsNeededToGraduate: number;
  startingSeason: Month;
  startingYear: number;
  startingCredits: number;
  minCredits: number;
  maxCredits: number;
  numberOfSemesters: number;
  maxSearchQuery: number;
  enableMinimumCreditErrors: boolean;
}

export { Month };
export type { Settings };
