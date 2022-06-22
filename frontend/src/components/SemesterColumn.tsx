/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CourseCard, { CourseCardInfo } from './CourseCard';

interface SemesterColumnInfo {
  [x: string]: any;
  title: string,
  items: Array<CourseCardInfo>;
}

interface SemesterColumnProps {
  columnId: string;
  season: string;
  column: SemesterColumnInfo;
  index: number;
  year: number;
  runningCreditCount: number;
  semesterCreditCount: number;
  quarterIndexUntilGraduation: number;
  error: boolean;
  showNumberInsteadOfTitle: boolean;
  showCourseCredits: boolean;
  getCurrentCourseInfoDisplay: () => any;
  // eslint-disable-next-line no-unused-vars
  handleDeleteCourseCard(index: number, columnId: string);
  // eslint-disable-next-line no-unused-vars
  handleCourseInfoChange(courseObject: any);
}

// change colors as you get more credits? like the planner in my google spreadsheet

function SemesterColumn(props: SemesterColumnProps) {
  const {
    columnId,
    column,
    season,
    year,
    semesterCreditCount,
    runningCreditCount,
    handleDeleteCourseCard,
    handleCourseInfoChange,
    getCurrentCourseInfoDisplay,
    quarterIndexUntilGraduation,
    error,
    showNumberInsteadOfTitle,
    showCourseCredits,
  } = props;

  const defaultBackgroundColor = '#34495e';

  const beyondColor = 'bg-red-900';
  const freshmanYearColor = 'bg-red-400';
  const sophomoreYearColor = 'bg-red-500';
  const juniorYearColor = 'bg-red-700';
  const seniorYearColor = 'bg-red-800';

  const getSemesterBackgroundColor = () => {
    switch (quarterIndexUntilGraduation) {
      case 0:
        return freshmanYearColor;
      case 1:
        return sophomoreYearColor;
      case 2:
        return juniorYearColor;
      case 3:
        return seniorYearColor;
      default:
        return beyondColor;
    }
  };

  const getStudentClass = () => {
    switch (quarterIndexUntilGraduation) {
      case 0:
        return 'Freshman';
      case 1:
        return 'Sophomore';
      case 2:
        return 'Junior';
      case 3:
        return 'Senior';
      default:
        return 'Graduate';
    }
  };

  // TOOLTIP THAT EXPLAINS THE ERROR
  // EG MINIMUM CREDIT ERROR
  return (
    <div
      className="flex flex-col items-center w-full h-full select-none"
      key={columnId}
    >
      <div
        className={`w-full text-center py-2 my-2 rounded-sm text-white relative ${getSemesterBackgroundColor()}`}
        style={{
          // background: defaultBackgroundColor,
          boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div
          className={`${error ? 'w-24' : 'w-0'}
                     h-0.5 bg-white absolute top-4 mx-auto
                     left-0 right-0
                     transition-width duration-500 ease-in-out`}
        />
        <h2 className="font-semibold">
          {season}
          {' '}
          {year}
        </h2>
        {getStudentClass()}
        <span className="absolute right-1 top-0 text-sm">
          {semesterCreditCount}
        </span>
        <span className="absolute right-1 bottom-0 text-sm">
          {runningCreditCount}
        </span>
      </div>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          // eslint-disable-next-line no-unused-vars
          const backgroundColor = snapshot.isDraggingOver ? '#273340' : defaultBackgroundColor;
          return (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full h-full px-2 pb-2 rounded mb-2"
              style={{
                boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.10)'
              }}
            >
              {column.items.map((item, cardIndex) => {
                const courseCurrentlyDisplayedInInfoColumn = getCurrentCourseInfoDisplay();
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
                    handleDeleteCourseCard={handleDeleteCourseCard}
                    handleCourseInfoChange={handleCourseInfoChange}
                    columnId={columnId}
                    isCurrentlySelected={isSelected}
                    indicatorColor={getSemesterBackgroundColor()}
                    showNumberInsteadOfTitle={showNumberInsteadOfTitle}
                    showCourseCredits={showCourseCredits}
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
