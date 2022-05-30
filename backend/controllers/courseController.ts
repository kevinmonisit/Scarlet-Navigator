import CourseModel, { Course } from '../models/CourseModel';

/**
 * Implements course dv-level functions
 */

async function getCourses(name: string) {
  const query = name.length === 0 ? '.*' : name;
  const regexSearch = new RegExp(`${query}`);
  const coursesQuery = await CourseModel.find({
    title: { $regex: regexSearch, $options: 'i' },
  }).exec();
  return coursesQuery;
}

const CourseController = {
  getCourses,
};

export default CourseController;
