/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CourseSearchCard from './CourseSearchCard';

interface CourseCardInSearch {
  title: string;
  _id: string;
}

// const createRandomCards = () => {
//   const numberOfRandomCards = 50;
//   const cardQueryArray: CourseCardInSearch[] = [];

//   for (let cardIndex = 0; cardIndex < numberOfRandomCards; cardIndex += 1) {
//     cardQueryArray.push({
//       shortTitle: 'CS205',
//       fullTitle: 'Full Title of Course',
//       id: uuid(),
//     });
//   }

//   return cardQueryArray;
// };

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
    if (value.length === 0) return;

    axios.get('/api/v1/courses', { params: { search: value } })
      .then((res) => {
        console.log(res);
        setQueriedCards(res.data.coursesQuery);
        upstreamQuery(queriedCards);
      });
  }, [value]);

  return (
    <div className="w-2/10 h-100 bg-amber-500 flex flex-col">
      <input value={value} onChange={onChange} />
      <div className="grow bg-green-300 overflow-hidden overflow-y-scroll">
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
