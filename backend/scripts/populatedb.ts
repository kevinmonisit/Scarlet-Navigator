/* eslint-disable no-underscore-dangle */
import mongoose, { Schema, HydratedDocument } from 'mongoose';
import async from 'async';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import UserModel, { User } from '../models/UserModel';
import CourseModel, { Course } from '../models/CourseModel';

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

function getRandomInt(_min: number, _max: number) {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCourses(callbackOuter: CallableFunction) {
  console.log('Creating courses');
  const bogusCourses = [];

  for (let i = 0; i < 300; i += 1) {
    bogusCourses.push((callback: CallableFunction) => {
      createCourse(uuidv4().slice(0, 5), getRandomInt(1, 4), [], callback);
    });
  }

  async.parallel(
    [
      (callback: CallableFunction) => {
        createCourse('CS112', 2, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('CS111', 3, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('MAT205', 2, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('MAT201', 1, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('CS205', 4, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('EXPOS', 3, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('PHL101', 4, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('PHY103', 3, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('CS206', 2, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('CS211', 2, [], callback);
      },
      (callback: CallableFunction) => {
        createCourse('CS312', 2, [], callback);
      },
    ].concat(bogusCourses),
    (err, result) => {
      callbackOuter(err, result);
    }
  );
}

function createUsers(courses: Array<Course>, callback: CallableFunction) {
  console.log('Creating users');

  const startingYear = 2022;
  const plan: Array<Array<Schema.Types.ObjectId>> = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  createUser([], startingYear, plan, callback);
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
