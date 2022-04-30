import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import UserModel from './models/UserModel';
import CourseModel, { Course } from './models/CourseModel';
import async from 'async';

dotenv.config();

mongoose
  .connect('mongodb://localhost:27017/scarlet-navigator-test')
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

function createUser(
  courses: Array<Schema.Types.ObjectId>,
  startingYear: Number,
  callback: CallableFunction
) {
  const userDocument = new UserModel({ courses, startingYear });
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
  const courseDocument = new CourseModel({ title, credits, prerequisites });
  courseDocument.save((err: any) => {
    if (err) console.warn(err);
    callback(null, courseDocument);
  });
}

function createCourses(callback: CallableFunction) {
  console.log('Creating courses');
  async.parallel(
    [
      (callback) => {
        createCourse('test #1', 2, [], callback);
      },
      (callback) => {
        createCourse('test #2', 3, [], callback);
      },
      (callback) => {
        createCourse('test #3', 2, [], callback);
      },
      (callback) => {
        createCourse('test #4', 2, [], callback);
      },
    ],
    (err, result) => {
      callback(err, result);
    }
  );
}

function createUsers(courses: Array<Course>, callback: CallableFunction) {
  console.log('Creating users');
  createUser(
    courses.map((course: Course) => {
      return course._id;
    }),
    2,
    callback
  );
}
