/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface CourseCardInfo {
  _id: string;
  title: string;
}

interface CourseCardProps {
  item: CourseCardInfo;
  index: number;
}

function CourseCard(props: CourseCardProps) {
  const { item, index } = props;

  return (<Draggable
    key={item._id}
    draggableId={item._id}
    index={index}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.draggableProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.dragHandleProps}
        style={{
          userSelect: 'none',
          padding: 16,
          margin: '0 0 8px 0',
          minHeight: '20px',
          backgroundColor: snapshot.isDragging
            ? '#c0392b'
            : '#e74c3c',
          color: 'white',
          ...provided.draggableProps.style,
        }}
      >
        {item.title}
      </div>
    )}
  </Draggable>);
}

export default CourseCard;
export type { CourseCardInfo };
