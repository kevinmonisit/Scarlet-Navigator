/* eslint-disable no-console */
const mongoose = require('mongoose');
const User = require('./models/user.ts');
const Course = require('./models/course.ts');

mongoose
  .connect('mongodb://localhost:27017/scarlet-navigator-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    mongoose.connection.db.dropDatabase();
  });

mongoose.connection.on('error', (err) => {
  console.warn(`Error: ${err}`);
});

interface CourseSchema {
  title: String;
  credits: Number;
  prerequisites: CourseSchema[];
}

function CreateUser(
  major: String,
  courses: Array<String>,
  startingYear: Number
) {
  const userDocument = new User({ major, courses, startingYear });
  User.save(userDocument, (err) => {
    if (err) console.warn(err);
  });
}

function CreateCourse(
  course: String,
  credits: Number,
  prerequisites: Array<String>
) {
  const courseDocument = new Course({ course, credits, prerequisites });
  Course.save(courseDocument, (err) => {
    if (err) console.warn(err);
  });
}

CreateCourse('test #1', 2, []);
CreateCourse('test #2', 2, []);
CreateCourse('test #3', 2, []);
CreateCourse('test #4', 2, []);
CreateCourse('test #5', 2, []);
CreateUser(
  'test_user',
  ['test #1', 'test #2', 'test #3', 'test #4', 'test #5'],
  2
);

export {};
