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
      }}
      key={columnId}
    >
      <h2>{column.title}</h2>
      <div style={{ margin: 8 }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? 'lightblue'
                  : 'lightgrey',
                padding: 4,
                width: 250,
                minHeight: 500,
              }}
            >
              {column.items.map((item, index) => (
                <CourseCard
                  item={item}
                  index={index}
                  key={item.id}
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
