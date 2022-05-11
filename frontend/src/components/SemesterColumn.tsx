import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CourseCard, { CourseCardInfo } from './CourseCard';

interface SemesterColumnInfo {
  title: string,
  items: Array<CourseCardInfo>;
}

interface SemesterColumnProps {
  columnId: string;
  column: SemesterColumnInfo;
}

function SemesterColumn(props: SemesterColumnProps) {
  const { columnId, column } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
      key={columnId}
    >
      <h2>{column.title}</h2>
      <div style={{
        width: '100%',
        height: '100%'
      }}
      >
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? '#273340'
                  : '#34495e',
                padding: 4,
                width: '100%',
                height: '100%',
                minHeight: 200,
              }}
            >
              {column.items.map((item, index) => (
                <CourseCard
                  item={item}
                  index={index}
                  // eslint-disable-next-line no-underscore-dangle
                  key={item._id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default SemesterColumn;
export type { SemesterColumnInfo };
