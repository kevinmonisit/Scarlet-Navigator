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

function CourseCreate(
  course: String,
  credits: Number,
  prerequisites: Array<CourseSchema>
) {
  const courseDocument = new Course({ course, credits, prerequisites });
  Course.save(courseDocument, (err) => {
    if (err) console.warn(err);
  });
}

CourseCreate('h', 2, []);
