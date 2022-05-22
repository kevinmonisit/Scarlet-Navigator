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
  // ref={provided.innerRef}
  // // eslint-disable-next-line react/jsx-props-no-spreading
  // {...provided.draggableProps
  // }
  // // eslint-disable-next-line react/jsx-props-no-spreading
  // {...provided.dragHandleProps}
  // style={{
  //   userSelect: 'none',
  //   padding: 5,
  //   margin: '0 0 8px 0',
  //   minHeight: '20px',
  //   width: '100%',
  //   backgroundColor: snapshot.isDragging
  //     ? '#c0392b'
  //     : '#e74c3c',
  //   color: 'white',
  //   ...provided.draggableProps.style,
  // }}

  // useEffect(() => {
  //   console.log(index);
  // }, []);
  return (
    <Draggable
      key={item._id}
      draggableId={item._id}
      index={index}
    >
      {(provided, snapshot) => {
        // eslint-disable-next-line no-unused-vars
        const backgroundColor = snapshot.isDragging ? 'bg-red-700' : 'bg-red-500';

        return (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
            }}
            className={`${backgroundColor} w-full h-6 text-white pl-2 pt-0.5 my-2`}
          >
            <div className="flex flex-row">
              <div className="w-10/12 h-full">
                {item.title}
              </div>
              <div
                className="w-2/12 h-full text-right pr-2"
              >
                <span className="hover:underline hover:text-gray-400">X</span>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default CourseCard;
export type { CourseCardInfo };
