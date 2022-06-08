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
  column: SemesterColumnInfo;
  index: number;
  runningCreditCount: number;
  semesterCreditCount: number;
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
    semesterCreditCount,
    runningCreditCount,
    handleDeleteCourseCard,
    handleCourseInfoChange,
  } = props;

  const defaultBackgroundColor = '#34495e';
  // TOOLTIP THAT EXPLAINS THE ERROR
  // EG MINIMUM CREDIT ERROR
  return (
    <div
      className="flex flex-col items-center w-full h-full select-none"
      key={columnId}
    >
      <div
        className="w-full text-center py-2 my-2 rounded-sm text-white relative bg-red-700"
        style={{
          // background: defaultBackgroundColor,
          boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        <h2 className="font-semibold">{column.title}</h2>
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
                return (
                  <CourseCard
                    item={item}
                    index={cardIndex}
                    // eslint-disable-next-line no-underscore-dangle
                    key={item._id}
                    handleDeleteCourseCard={handleDeleteCourseCard}
                    handleCourseInfoChange={handleCourseInfoChange}
                    columnId={columnId}
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
