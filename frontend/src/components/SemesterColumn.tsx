/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { SemesterColumnInfo } from '../interfaces/Course';
import CourseCard from './CourseCard';
import { useAppSelector } from '../redux/store';
import { selectCurrentCourseDisplay } from '../redux/slices/courseDisplaySlice';
import { selectRunningCreditArray, updateSemesterCreditArrayByIndex } from '../redux/slices/creditTrackingSlice';
import { useAppDispatch } from '../redux/hooks';
import { getCreditSemesterCount } from '../logic/handleCredits';
import { selectCurrentSettings } from '../redux/slices/settingsSlice';
import { Season } from '../interfaces/Settings';
import { calculateSemesterMetadata, getSemesterBackgroundColor, getStudentClass, MetadataState } from '../logic/handleSemesters';

interface SemesterColumnProps {
  columnId: string;
  column: SemesterColumnInfo;
  index: number;
}

function SemesterColumn(props: SemesterColumnProps) {
  const {
    columnId,
    column,
    index,
  } = props;

  const useDispatch = useAppDispatch();
  const courseCurrentlyDisplayedInInfoColumn = useAppSelector(selectCurrentCourseDisplay);
  const currentSettings = useAppSelector(selectCurrentSettings);
  const runningCreditCountArray = useAppSelector(selectRunningCreditArray);

  const [totalCreditsOfSemester, setTotalCreditsOfSemester] = useState<number>(0);
  const [currentMetadata, setCurrentMetadata] = useState<MetadataState>({
    creditQuartersCompleted: 0,
    year: 2022,
    season: Season.FALL,
    semesterError: false
  });

  useEffect(() => {
    const calculateTotalCredits = getCreditSemesterCount(column);
    setTotalCreditsOfSemester(calculateTotalCredits);

    const updateByIndex = {
      index,
      value: calculateTotalCredits
    };

    useDispatch(updateSemesterCreditArrayByIndex(updateByIndex));
  }, [column]);

  useEffect(() => {
    const metaData = calculateSemesterMetadata(
      index,
      currentSettings,
      totalCreditsOfSemester,
      runningCreditCountArray
    );

    setCurrentMetadata(metaData);
  }, [totalCreditsOfSemester, runningCreditCountArray, currentSettings]);

  return (
    <div
      className="flex flex-col items-center w-full h-full select-none bg-white grow"
      key={columnId}
    >
      <div
        className={`
        w-full text-center xl:py-2 py-4 mb-2 rounded-sm text-white
        relative ${getSemesterBackgroundColor(currentMetadata.creditQuartersCompleted)}
        `}
        style={{
          // background: defaultBackgroundColor,
          boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div
          className={`${currentMetadata.semesterError ? 'w-24' : 'w-0'}
                     h-0.5 bg-white absolute xl:top-4 top-6 mx-auto
                     left-0 right-0
                     transition-width duration-500 ease-in-out`}
        />
        <h2 className="font-semibold">
          {currentMetadata.season}
          {' '}
          {currentMetadata.year}
        </h2>
        {getStudentClass(currentMetadata.creditQuartersCompleted)}
        <span className="absolute right-1 top-0 text-sm">
          {totalCreditsOfSemester}
        </span>
        <span className="absolute right-1 bottom-0 text-sm">
          {runningCreditCountArray[index]}
        </span>
      </div>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => {
          // eslint-disable-next-line no-unused-vars
          // const backgroundColor = snapshot.isDraggingOver ? '#273340' : defaultBackgroundColor;
          return (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full h-full px-2 pb-2 rounded mb-2 shadow-md"
              key={columnId}
              style={{
                minHeight: '150px'
              }}
            >
              {column.items.map((item, cardIndex) => {
                let isSelected = false;
                if (courseCurrentlyDisplayedInInfoColumn) {
                  const { _id } = courseCurrentlyDisplayedInInfoColumn;
                  isSelected = item._id === _id;
                }

                return (
                  <CourseCard
                    item={item}
                    index={cardIndex}
                    // eslint-disable-next-line no-underscore-dangle
                    key={item._id}
                    columnId={columnId}
                    isCurrentlySelected={isSelected}
                    indicatorColor={getSemesterBackgroundColor(
                      currentMetadata.creditQuartersCompleted
                    )}
                    showNumberInsteadOfTitle={currentSettings.showNumberInsteadOfTitle}
                    showCourseCredits={currentSettings.showCourseCredits}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default SemesterColumn;
export type { SemesterColumnInfo };
