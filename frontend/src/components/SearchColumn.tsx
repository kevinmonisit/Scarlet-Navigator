/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { v4 as uuid } from 'uuid';
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

function SearchColumn() {
  const [queriedCards, setQueriedCards] = useState<CourseCardInSearch[] | null>(null);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setQueriedCards([]);
  }, []);

  useEffect(() => {
    axios.get('/api/v1/courses', { params: { search: value } })
      .then((res) => {
        setQueriedCards(res.data.coursesQuery);
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
            />
          ))}
      </div>
    </div>
  );
}

export default SearchColumn;
