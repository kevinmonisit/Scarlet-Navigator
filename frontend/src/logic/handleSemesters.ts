import { Season, Settings } from '../interfaces/Settings';
import getSeasonArray from './handleSeasons';

interface MetadataState {
  creditQuartersCompleted: number;
  year: number;
  season: Season;
  semesterError: boolean;
}

const calculateSemesterMetadata = (
  index: number,
  settings: Settings,
  totalCreditsInSemester: number,
  runningCreditCountArray: number[],
): MetadataState => {
  if (index >= runningCreditCountArray.length) {
    throw Error(`Index of ${index} is longer than
    runningCreditCountArray with length of ${runningCreditCountArray.length}`);
  }
  const seasons = getSeasonArray(settings.startingSeason, settings.includeSummerSemesters);

  const percentageCompleted = runningCreditCountArray[index] / settings.creditsNeededToGraduate;
  const creditQuartersCompleted = Math.floor((percentageCompleted * 100) / 25);

  const offset = settings.startingSeason === Season.FALL ? 1 : 0;
  const year = settings.startingYear + Math.floor((index + offset) / seasons.length);

  const season = seasons[index % seasons.length];

  let semesterError = false;
  const numberOfCredits = totalCreditsInSemester;
  if (settings.enableMinimumCreditErrors
    && (numberOfCredits > settings.maxCredits
      || numberOfCredits < settings.minCredits)) {
    semesterError = true;
  }

  return {
    creditQuartersCompleted,
    year,
    season,
    semesterError,
  };
};

const beyondColor = 'bg-red-900';
const freshmanYearColor = 'bg-red-400';
const sophomoreYearColor = 'bg-red-500';
const juniorYearColor = 'bg-red-700';
const seniorYearColor = 'bg-red-800';

const getSemesterBackgroundColor = (creditQuartersCompleted: number) => {
  switch (creditQuartersCompleted) {
    case 0:
      return freshmanYearColor;
    case 1:
      return sophomoreYearColor;
    case 2:
      return juniorYearColor;
    case 3:
      return seniorYearColor;
    default:
      return beyondColor;
  }
};

const getStudentClass = (creditQuartersCompleted: number) => {
  switch (creditQuartersCompleted) {
    case 0:
      return 'Freshman';
    case 1:
      return 'Sophomore';
    case 2:
      return 'Junior';
    case 3:
      return 'Senior';
    default:
      return 'Graduate';
  }
};

export {
  calculateSemesterMetadata,
  getStudentClass,
  getSemesterBackgroundColor
};

export type { MetadataState };
