/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Button, Chip, IconButton } from '@mui/material';
import Input from '@mui/material/Input';
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react';
import CourseSearchCard from './CourseSearchCard';

interface CourseCardInSearch {
  title: string;
  courseString: string;
  _id: string;
}

interface SearchColumnProps {
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
  handleCourseInfoChange(id: string): void;
  // eslint-disable-next-line no-unused-vars
  upstreamQuery(queryList: any);
}

function SearchColumn(props: SearchColumnProps) {
  const { checkIfCourseAlreadyInPlan, upstreamQuery, handleCourseInfoChange } = props;
  const [queriedCards, setQueriedCards] = useState<CourseCardInSearch[] | null>([]);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleCourseClick = (id: string) => {
    handleCourseInfoChange(id);
  };

  const queryCourses = () => {
    // keep this in the back burner
    // if it's more performant to keep it empty
    // then do so. only when it's a problem.
    // if (value.length === 0) {
    //   setQueriedCards([]);
    //   return;
    // }

    axios.get('/api/v1/courses', { params: { search: value } })
      .then((res) => {
        setQueriedCards(res.data.coursesQuery);
      });
  };

  useEffect(queryCourses, []);
  useEffect(() => { upstreamQuery(queriedCards); }, [queriedCards]);
  useEffect(queryCourses, [value]);

  console.log('re render search column');

  return (
    <div className="w-2/12 h-full flex flex-col max-w-fit">
      <div
        className="flex flex-row z-50 mr-2"
        style={{
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Input
          placeholder="Search Course"
          onChange={onChange}
          disableUnderline
          sx={{
            '& .MuiInput-input': {
              paddingLeft: '3px',
            },
            // marginRight: '1rem',
            marginLeft: '0.5rem',
          }}
        />
        <IconButton
          aria-label="show search options"
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      <div
        className="w-full grow relative"
      >
        <div className="absolute h-full w-full">
          <div className="w-full h-full overflow-hidden overflow-y-scroll">
            {queriedCards == null ? <>Loading search...</>
              : queriedCards.map((courseCardSearch) => {
                // React memo only runs when props change.
                // Thus, run this function outside of the search card component,
                // instead of inside the search card component.
                const checkAlreadyExists = checkIfCourseAlreadyInPlan(courseCardSearch._id);
                return (
                  <CourseSearchCard
                    shortTitle={courseCardSearch.title}
                    courseString={courseCardSearch.courseString}
                    key={courseCardSearch._id}
                    courseId={courseCardSearch._id}
                    alreadyInPlan={checkAlreadyExists}
                    handleCourseInfoChange={handleCourseClick}
                  />
                );
              })}
            {queriedCards && queriedCards!.length >= 100 && (
              <div className="w-full flex justify-center mt-1 mb-2">
                <Chip label="Showing first 100 courses." />
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default SearchColumn;
export type {
  CourseCardInSearch
};
