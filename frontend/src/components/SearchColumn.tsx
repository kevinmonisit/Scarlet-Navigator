import React, { useEffect, useState } from 'react';
// import CourseSearchCard from './CourseSearchCard';

interface CourseCardInSearch {
  shortTitle: string;
  fullTitle: string;
}

const createRandomCards = () => {
  const numberOfRandomCards = 15;
  const cardQueryArray: CourseCardInSearch[] = [];

  for (let cardIndex = 0; cardIndex < numberOfRandomCards; cardIndex += 1) {
    cardQueryArray.push({
      shortTitle: `CS10${cardIndex}`,
      fullTitle: 'Full Title of Course'
    });
  }

  return cardQueryArray;
};

function SearchColumn() {
  const [queriedCards, setQueriedCards] = useState<CourseCardInSearch[] | null>(null);

  useEffect(() => {
    setQueriedCards(createRandomCards());
  }, []);

  return (
    <div className="w-1/5 h-100 bg-amber-500 flex flex-col">
      <input />
      <div className="grow bg-green-300">
        A
      </div>
    </div>
  );
}

export default SearchColumn;
