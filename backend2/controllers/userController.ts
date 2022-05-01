require('../models/CourseModel');
import UserModel, { User } from '../models/UserModel';
import CourseModel from '../models/CourseModel';
import mongoose, { Schema, HydratedDocument } from 'mongoose';
import { Course } from '../models/CourseModel';

/**
 * Implements user db-level functions
 */

async function getCoursesOfUser(user_id: Schema.Types.ObjectId) {
  const userDocument = await getUser(user_id);
  if (!userDocument) {
    return null;
  }

  return userDocument.populate('courses').catch((err) => {
    console.warn('Error populating courses: ' + err);
  });
}

async function getPlanOfUser(user_id: Schema.Types.ObjectId) {
  const userDocument = await getUser(user_id);
  if (userDocument == null) {
    return null;
  }

  const plan: Array<Array<Schema.Types.ObjectId>> = userDocument['plan'];
  const planWithCourseDocs: Array<Array<HydratedDocument<Course> | null>> = [];

  for (let semester = 0; semester < plan.length; semester++) {
    const classesOfSemester = plan[semester];
    planWithCourseDocs.push([]);

    for (
      let course = 0;
      classesOfSemester && course < classesOfSemester.length;
      course++
    ) {
      const courseId = classesOfSemester[course];
      const courseDocument = await CourseModel.findById(courseId)
        .exec()
        .catch((err) => {
          console.warn('Error: ' + err);

          return null;

          //https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
          //when i want to do error handling
        });

      planWithCourseDocs[semester]!.push(courseDocument);
    }
  }

  return planWithCourseDocs;
}

async function updatePlanOfUser(
  user_id: Schema.Types.ObjectId,
  newPlan: Array<Array<Schema.Types.ObjectId>>
) {}

async function getUser(user_id: Schema.Types.ObjectId) {
  return UserModel.findById(user_id)
    .exec()
    .catch((err) => {
      console.warn('Error finding user: ' + err);
    });
}

const UserController = {
  getCoursesOfUser,
  updatePlanOfUser,
  getPlanOfUser,
  getUser,
};

export default UserController;
