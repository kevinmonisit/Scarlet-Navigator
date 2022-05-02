/* eslint-disable import/no-unresolved */
import { Schema, HydratedDocument } from 'mongoose';
import UserModel from '../models/UserModel';
import CourseModel, { Course } from '../models/CourseModel';

require('../models/CourseModel.ts');

/**
 * Implements user db-level functions
 */

async function getUser(userID: Schema.Types.ObjectId) {
  return UserModel.findById(userID)
    .exec()
    .catch((err) => {
      console.warn(`Error finding user: ${err}`);
    });
}

async function getCoursesOfUser(userID: Schema.Types.ObjectId) {
  const userDocument = await getUser(userID);
  if (!userDocument) {
    return null;
  }

  return userDocument.populate('courses').catch((err) => {
    console.warn(`Error populating courses: ${err}`);
  });
}

async function getPlanOfUser(userID: Schema.Types.ObjectId) {
  const userDocument = await getUser(userID);
  if (userDocument == null) {
    return null;
  }

  const { plan } = userDocument;

  const planWithCourseDocs: Array<Array<HydratedDocument<Course> | null>> = [];

  for (let semester = 0; semester < plan.length; semester += 1) {
    const classesOfSemester = plan[semester];
    planWithCourseDocs.push([]);

    for (
      let course = 0;
      classesOfSemester && course < classesOfSemester.length;
      course += 1
    ) {
      const courseId = classesOfSemester[course];
      // eslint-disable-next-line no-await-in-loop
      const courseDocument = await CourseModel.findById(courseId)
        .exec()
        .catch((err) => {
          console.warn(`Error: ${err}`);

          return null;

          // https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
          // when i want to do error handling
        });

      planWithCourseDocs[semester]!.push(courseDocument);
    }
  }

  return planWithCourseDocs;
}

async function updatePlanOfUser(
  userID: Schema.Types.ObjectId,
  newPlan: Array<Array<Schema.Types.ObjectId>>
) {
  // send back an array of arrays of objectids from the frontend
}

const UserController = {
  getCoursesOfUser,
  updatePlanOfUser,
  getPlanOfUser,
  getUser,
};

export default UserController;
