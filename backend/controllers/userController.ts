/* eslint-disable import/no-unresolved */
import { Schema, HydratedDocument } from 'mongoose';
import UserModel from '../models/UserModel';
import CourseModel, { Course } from '../models/CourseModel';

require('../models/CourseModel');

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

async function getPlanOfUser(userID: Schema.Types.ObjectId, planIndex: number) {
  const userDocument = await getUser(userID);
  if (userDocument == null) {
    return null;
  }

  let { plan } = userDocument;

  const planIndexAsNumber = parseInt(planIndex as unknown as string, 10);

  if ((planIndexAsNumber as unknown as number) === 2) {
    plan = userDocument.secondPlan;
  } else if ((planIndexAsNumber as unknown as number) === 3) {
    plan = userDocument.thirdPlan;
  }

  console.log(plan);

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
      // possible way to make it more optimized
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
  newPlan: Array<Array<Schema.Types.ObjectId>>,
  planIndex: 1 | 2 | 3
) {
  const userDocument = await getUser(userID);
  if (userDocument == null) {
    return null;
  }

  if (planIndex === 1) {
    userDocument.plan = newPlan;
  } else if (planIndex === 2) {
    userDocument.secondPlan = newPlan;
  } else if (planIndex === 3) {
    userDocument.thirdPlan = newPlan;
  }

  return userDocument.save();
}

const UserController = {
  getCoursesOfUser,
  updatePlanOfUser,
  getPlanOfUser,
  getUser,
};

export default UserController;
