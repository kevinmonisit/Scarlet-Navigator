/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Item {
  id: string;
  content: string;
}

interface CourseCardProps {
  item: Item;
  index: number;
}

function CourseCard(props: CourseCardProps) {
  const { item, index } = props;

  return (<Draggable
    key={item.id}
    draggableId={item.id}
    index={index}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.draggableProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...provided.dragHandleProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: 'none',
          padding: 16,
          margin: '0 0 8px 0',
          minHeight: '50px',
          backgroundColor: snapshot.isDragging
            ? '#263B4A'
            : '#456C86',
          color: 'white',
          ...provided.draggableProps.style,
        }}
      >
        {item.content}
      </div>
    )}
  </Draggable>);
}

export default CourseCard;
