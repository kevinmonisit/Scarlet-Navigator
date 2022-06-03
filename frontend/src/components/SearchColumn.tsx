/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CourseSearchCard from './CourseSearchCard';

interface CourseCardInSearch {
  title: string;
  _id: string;
}

interface SearchColumnProps {
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
  // eslint-disable-next-line no-unused-vars
  upstreamQuery(queryList: any);
}

function SearchColumn(props: SearchColumnProps) {
  const { checkIfCourseAlreadyInPlan, upstreamQuery } = props;
  const [queriedCards, setQueriedCards] = useState<CourseCardInSearch[] | null>([]);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    axios.get('/api/v1/courses', { params: { search: value } })
      .then((res) => {
        setQueriedCards(res.data.coursesQuery);
        upstreamQuery(queriedCards);
      });
  }, [value]);

  return (
    <div className="w-2/12 h-full bg-amber-500 flex flex-col max-w-fit">
      <input value={value} onChange={onChange} />
      <div className="w-full h-10 grow bg-green-300 overflow-hidden overflow-y-scroll">
        {queriedCards == null ? <>Loading search...</>
          : queriedCards.map((courseCardSearch) => (
            <CourseSearchCard
              shortTitle={courseCardSearch.title}
              key={courseCardSearch._id}
              courseId={courseCardSearch._id}
              checkIfCourseAlreadyInPlan={checkIfCourseAlreadyInPlan}
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
