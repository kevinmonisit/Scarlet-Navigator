/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CourseSearchCard from './CourseSearchCard';

interface CourseCardInSearch {
  title: string;
  _id: string;
}

interface SearchColumnProps {
  numberOfCourses: number;
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
  // eslint-disable-next-line no-unused-vars
  upstreamQuery(queryList: any);
}

function SearchColumn(props: SearchColumnProps) {
  const { checkIfCourseAlreadyInPlan, upstreamQuery, numberOfCourses } = props;
  const [queriedCards, setQueriedCards] = useState<CourseCardInSearch[] | null>([]);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const queryCourses = () => {
    axios.get('/api/v1/courses', { params: { search: value } })
      .then((res) => {
        setQueriedCards(res.data.coursesQuery);
      });
  };

  useEffect(queryCourses, []);
  useEffect(() => { upstreamQuery(queriedCards); }, [queriedCards]);
  useEffect(queryCourses, [value]);

  return (
    <div className="w-2/12 h-full flex flex-col max-w-fit">
      <Input
        placeholder="Search Course"
        onChange={onChange}
        sx={{
          '& .MuiInput-input': {
            paddingLeft: '3px',
          },
          marginRight: '1rem',
          marginLeft: '0.25rem'
        }}
      />
      <div className="w-full h-10 grow overflow-hidden overflow-y-scroll">
        {queriedCards == null ? <>Loading search...</>
          : queriedCards.map((courseCardSearch) => (
            <CourseSearchCard
              shortTitle={courseCardSearch.title}
              key={courseCardSearch._id}
              courseId={courseCardSearch._id}
              checkIfCourseAlreadyInPlan={checkIfCourseAlreadyInPlan}
              numberOfCourses={numberOfCourses}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchColumn;
export type {
  CourseCardInSearch
};
