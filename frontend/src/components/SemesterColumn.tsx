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
  // eslint-disable-next-line no-unused-vars
  handleDeleteCourseCard(index: number, columnId: string);
  // eslint-disable-next-line no-unused-vars
  handleCourseInfoChange(courseObject: any);
}

// change colors as you get more credits? like the planner in my google spreadsheet

function SemesterColumn(props: SemesterColumnProps) {
  const { columnId, column, handleDeleteCourseCard, handleCourseInfoChange } = props;
  const defaultBackgroundColor = '#34495e';
  return (
    <div
      className="flex flex-col items-center w-full h-full select-none"
      key={columnId}
    >
      <div
        className="w-full text-center py-2 my-2 rounded-sm text-white"
        style={{
          background: defaultBackgroundColor
        }}
      >
        <h2 className="font-semibold">{column.title}</h2>
        <span className="relative">
          Test
        </span>
      </div>

      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          const backgroundColor = snapshot.isDraggingOver ? '#273340' : defaultBackgroundColor;
          return (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full h-full p-2 rounded"
              style={{
                background: backgroundColor,
              }}
            >
              {column.items.map((item, index) => {
                return (
                  <CourseCard
                    item={item}
                    index={index}
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
