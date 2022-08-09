/* eslint-disable import/prefer-default-export */
import { Course, SemesterColumnInfo } from '../interfaces/Course';

const getCreditSemesterCount = (column: SemesterColumnInfo) => column
  .items
  .reduce(
    (previous, current) => (previous + current.credits),
    0
  );

const getTransferCreditCount = (transferCourses: Course[]) => transferCourses
  .reduce((previous, current) => (previous + current.credits), 0);

const generateRunningCreditArray = (
  semesterCreditArray: number[],
  startingCredits: number
) => {
  const creditArrayLength = Object.keys(semesterCreditArray).length;
  const newRunningCreditArray = new Array(creditArrayLength).fill(0);

  for (let i = 0; i < semesterCreditArray.length; i += 1) {
    if (i === 0) {
      newRunningCreditArray[i] = semesterCreditArray[i] + startingCredits;
    } else {
      newRunningCreditArray[i] = newRunningCreditArray[i - 1] + semesterCreditArray[i];
    }
  }

  return newRunningCreditArray;
};

export {
  getCreditSemesterCount,
  generateRunningCreditArray,
  getTransferCreditCount
};
