/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum Season {
  FALL = 'Fall',
  SPRING = 'Spring',
  SUMMER = 'Summer',
}

interface Settings {
  creditsNeededToGraduate: number;
  startingSeason: Season;
  startingYear: number;
  startingCredits: number;
  minCredits: number;
  maxCredits: number;
  numberOfSemesters: number;
  maxSearchQuery: number;
  /* This should be: enable credit errors */
  enableMinimumCreditErrors: boolean;
  showNumberInsteadOfTitle: boolean;
  includeSummerSemesters: boolean;
  prerequisiteValidationEnabled: boolean;
  showCourseCredits: boolean;
}

const defaultSettings: Settings = {
  creditsNeededToGraduate: 120,
  startingSeason: Season.FALL,
  startingYear: 2021,
  startingCredits: 17,
  minCredits: 12,
  maxCredits: 20,
  numberOfSemesters: 8,
  enableMinimumCreditErrors: false,
  maxSearchQuery: 20,
  showNumberInsteadOfTitle: false,
  includeSummerSemesters: false,
  prerequisiteValidationEnabled: true,
  showCourseCredits: false,
};

export { Season, defaultSettings };
export type { Settings };
