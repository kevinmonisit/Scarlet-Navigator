/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  columnId: string;
  // eslint-disable-next-line no-unused-vars
  handleDeleteCourseCard(index: number, columnId: string);
  // eslint-disable-next-line no-unused-vars
  handleCourseInfoChange(courseObject: any);
}

function CourseCard(props: CourseCardProps) {
  // eslint-disable-next-line no-unused-vars
  const { item, index, handleDeleteCourseCard, handleCourseInfoChange, columnId } = props;

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    handleDeleteCourseCard(index, columnId);
  };

  const handleCourseClick = (event) => {
    event.stopPropagation();
    handleCourseInfoChange(item);
  };

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
        const backgroundColor = snapshot.isDragging ? 'bg-gray-300' : 'bg-gray-100';

        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
            }}
            className={`${backgroundColor} w-full text-black font-semibold mt-2 rounded-sm`}
            onClick={(e) => { handleCourseClick(e); }}
            onKeyDown={(e) => { handleCourseClick(e); }}
            role="listitem"
          >
            <div className="flex flex-row h-full">
              <div className="w-10/12 h-full pl-2 py-1 text-lg">
                {item.title}
              </div>
              <div
                className="w-2/12 h-full text-right pr-2 py-1"
              >
                <span
                  className="hover:underline hover:text-gray-400"
                  // eslint-disable-next-line max-len
                  onClick={(e) => { handleDeleteClick(e); }}
                  onKeyDown={(e) => { handleDeleteClick(e); }}
                  role="button"
                  tabIndex={0}
                >
                  X
                </span>
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
