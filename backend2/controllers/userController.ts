require('../models/CourseModel');
import UserModel, { User } from '../models/UserModel';
import Schema from 'mongoose';

/**
 * Implements user db-level functions
 */

async function getScheduleOfUser(user_id: Schema.Types.ObjectId) {
  const userDocument = await getUser(user_id);
  if (!userDocument) {
    return null;
  }

  return userDocument.populate('courses').catch((err) => {
    console.warn('Error populating courses: ' + err);
  });
}

function getUser(user_id: Schema.Types.ObjectId) {
  return UserModel.findById(user_id)
    .exec()
    .catch((err) => {
      console.warn('Error finding user: ' + err);
    });
}

const UserController = {
  getScheduleOfUser,
  getUser,
};

export default UserController;
