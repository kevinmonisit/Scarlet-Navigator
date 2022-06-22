import CourseModel, { Course } from '../models/CourseModel';

/**
 * Implements course dv-level functions
 */

// eslint-disable-next-line no-shadow
enum SEARCH_BY {
  TITLE = 0,
  NUMBER = 1,
  EXPANDED_TITLE = 2,
}

/**
 *
 * TODO: ADD ERROR HANDLING
 * The entire app crashes when you search a slash '/'
 */
async function getCourses(
  name: string,
  numberToQuery: number,
  searchType: SEARCH_BY = SEARCH_BY.TITLE
) {
  const regexSearch = new RegExp(`${name}`);
  const byTitle = {
    title: { $regex: regexSearch, $options: 'i' },
  };
  const byCourseNumbers = {
    courseString: { $regex: regexSearch, $options: 'i' },
  };
  const byExpandedTitle = {
    queryTitle: { $regex: regexSearch, $options: 'i' },
  };

  let query: any = byTitle;
  const searchTypeAsNumber = parseInt(searchType as unknown as string, 10);
  if (searchTypeAsNumber === SEARCH_BY.NUMBER) {
    query = byCourseNumbers;
  } else if (searchTypeAsNumber === SEARCH_BY.EXPANDED_TITLE) {
    query = byExpandedTitle;
  }
  const coursesQuery = await CourseModel.find(query)
    .limit(numberToQuery)
    .exec();
  return coursesQuery;
}

const CourseController = {
  getCourses,
};

export default CourseController;
