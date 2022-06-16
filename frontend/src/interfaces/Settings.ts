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
  showNumberInsteadOfTitle: boolean;
  includeSummerSemesters: boolean;
  prerequisiteValidationEnabled: boolean;
  showCourseCredits: boolean;
}

const defaultSettings: Settings = {
  creditsNeededToGraduate: 120,
  startingSeason: Month.FALL,
  startingYear: 2021,
  startingCredits: 17,
  minCredits: 12,
  maxCredits: 20,
  numberOfSemesters: 8,
  enableMinimumCreditErrors: false,
  maxSearchQuery: 30,
  showNumberInsteadOfTitle: false,
  includeSummerSemesters: false,
  prerequisiteValidationEnabled: true,
  showCourseCredits: false,
};

export { Month, defaultSettings };
export type { Settings };
