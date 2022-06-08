import CourseModel, { Course } from '../models/CourseModel';

/**
 * Implements course dv-level functions
 */

async function getCourses(name: string) {
  const regexSearch = new RegExp(`${name}`);
  const coursesQuery = await CourseModel.find({
    title: { $regex: regexSearch, $options: 'i' },
  })
    .limit(100)
    .exec();
  return coursesQuery;
}

const CourseController = {
  getCourses,
};

export default CourseController;
