import { getDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

/**
 * TODO:
 * Combine these functions into one;
 */

const processSemesterColumnQuery = async (plainJSON: { plan: Array<Array<any>>; }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Fetching from db.');
  }

  const columns = {};
  const { plan } = plainJSON;

  for (let semesterIndex = 0; semesterIndex < plan.length; semesterIndex += 1) {
    const courseSemesterID = uuid();
    columns[courseSemesterID] = {};
    columns[courseSemesterID].title = 'Fall 2022';
    columns[courseSemesterID].items = [];

    for (let courseIndex = 0; courseIndex < plan[semesterIndex].length; courseIndex += 1) {
      columns[courseSemesterID].items.push(plan[semesterIndex][courseIndex]);
    }
  }
  return { columns };
};

const processTransferCourses = async (userDoc) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Fetching from db.');
  }

  const transferCoursesProcessed: any = [];

  const { transferCourses } = userDoc;
  const promises: any = [];

  for (let index = 0; index < transferCourses.length; index += 1) {
    const promise = getDoc(transferCourses[index]).then((courseDoc) => courseDoc);
    promises.push(promise);
  }

  await Promise.all(promises).then((courseDocArray) => {
    courseDocArray.forEach((course) => {
      transferCoursesProcessed.push(course.data());
    });
  });

  return transferCoursesProcessed;
};

const processUserDocumentPlan = async (userDoc, planIndex: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Fetching from db.');
  }

  const planProcessed = {};

  let planKey = 'plan';
  if (planIndex === 2) {
    planKey = 'secondPlan';
  } else if (planIndex === 3) {
    planKey = 'thirdPlan';
  }

  const { plan } = userDoc[planKey];
  if (!plan) return {};

  const { length } = Object.keys(plan);
  const promises: any = [];

  for (let semesterIndex = 0; semesterIndex < length; semesterIndex += 1) {
    planProcessed[semesterIndex] = {};
    planProcessed[semesterIndex].items = [];

    for (let courseIndex = 0; courseIndex < plan[semesterIndex].length; courseIndex += 1) {
      const promise = getDoc(plan[semesterIndex][courseIndex]).then((courseDoc) => ({
        courseDoc,
        semesterIndex
      }));

      promises.push(promise);
    }
  }

  // asynchronous calls that reduces load of plan by a lot
  await Promise.all(promises).then((courseDocArray) => {
    courseDocArray.forEach((courseDocWrapper) => {
      const { courseDoc, semesterIndex } = courseDocWrapper;
      if (courseDoc.exists()) {
        planProcessed[semesterIndex].items.push(courseDoc.data());
      }
    });
  });

  return planProcessed;
};

export {
  processUserDocumentPlan,
  processSemesterColumnQuery,
  processTransferCourses
};
