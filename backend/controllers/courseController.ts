import CourseModel, { Course } from '../models/CourseModel';

/**
 * Implements course dv-level functions
 */

async function getCourses(name: string) {
  const coursesQuery = await CourseModel.find({
    title: { $regex: /CS/, $options: 'i' },
  }).exec();

  return coursesQuery;
}

const CourseController = {
  getCourses,
};

export default CourseController;
