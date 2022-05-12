/* eslint-disable no-underscore-dangle */
import mongoose, { Schema, HydratedDocument } from 'mongoose';
import async from 'async';
import dotenv from 'dotenv';
import UserModel, { User } from './models/UserModel';
import CourseModel, { Course } from './models/CourseModel';

const coursesArray: Array<Schema.Types.ObjectId> = [];

dotenv.config();

function createUser(
  courses: Array<Schema.Types.ObjectId>,
  startingYear: Number,
  plan: Array<Array<Schema.Types.ObjectId>>,
  callback: CallableFunction
) {
  const userDocument: HydratedDocument<User> = new UserModel({
    courses,
    startingYear,
    plan,
  });
  userDocument.save((err: any) => {
    if (err) console.warn(err);
    console.log('User created');
    callback(null);
  });
}

function createCourse(
  title: String,
  credits: Number,
  prerequisites: Array<String>,
  callback: CallableFunction
) {
  console.log(`Creating course ${title}`);
  const courseDocument: HydratedDocument<Course> = new CourseModel({
    title,
    credits,
    prerequisites,
  });
  courseDocument.save((err: any) => {
    if (err) console.warn(err);
    coursesArray.push(courseDocument._id);
    callback(null, courseDocument);
  });
}

function createCourses(callbackOuter: CallableFunction) {
  console.log('Creating courses');
  async.parallel(
    [
      (callback) => {
        createCourse('CS112', 2, [], callback);
      },
      (callback) => {
        createCourse('CS111', 3, [], callback);
      },
      (callback) => {
        createCourse('MAT205', 2, [], callback);
      },
      (callback) => {
        createCourse('MAT201', 2, [], callback);
      },
      (callback) => {
        createCourse('CS205', 2, [], callback);
      },
      (callback) => {
        createCourse('EXPOS', 2, [], callback);
      },
      (callback) => {
        createCourse('PHL101', 2, [], callback);
      },
      (callback) => {
        createCourse('PHY103', 2, [], callback);
      },
      (callback) => {
        createCourse('CS206', 2, [], callback);
      },
    ],
    (err, result) => {
      callbackOuter(err, result);
    }
  );
}

function createUsers(courses: Array<Course>, callback: CallableFunction) {
  console.log('Creating users');

  const startingYear = 2022;
  const plan: Array<Array<Schema.Types.ObjectId>> = [
    [coursesArray[0]!, coursesArray[1]!],
    [],
    [coursesArray[2]!, coursesArray[3]!],
    [coursesArray[4]!, coursesArray[5]!, coursesArray[6]!],
    [],
    [coursesArray[7]!],
    [coursesArray[8]!],
    [],
  ];

  createUser(
    courses.map((course) => course._id),
    startingYear,
    plan,
    callback
  );
}

mongoose
  .connect('mongodb://localhost:27017/s-n-t')
  .catch((err) => {
    console.warn(err);
  })
  .then(() => {
    mongoose.connection.db.dropDatabase();
    console.log('Connected to MongoDB database and database dropped.');

    async.waterfall(
      [
        (callback: CallableFunction) => {
          createCourses(callback);
        },
        (courses: Array<Course>, callback: CallableFunction) => {
          createUsers(courses, callback);
        },
      ],
      (err) => {
        if (err) {
          console.warn(err);
        } else {
          console.log('Successful population of database');
        }

        process.exit();
      }
    );
  });

mongoose.connection.on('error', (err) => {
  console.warn(`Error: ${err}`);
});
