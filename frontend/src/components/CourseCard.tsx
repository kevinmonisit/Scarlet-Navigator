/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useRef } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Draggable } from 'react-beautiful-dnd';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { changeCourseDisplay, selectCurrentCourseDisplay } from '../redux/slices/courseDisplaySlice';
import { Course } from '../interfaces/Course';
import { deleteCourse, deleteTransferCourse } from '../redux/slices/planSlice';

interface CourseCardInfo {
  _id: string;
  title: string;
  credits: number;
  courseString: string;
  cores: string[];
}

interface CourseCardProps {
  item: Course;
  index: number;
  columnId: string;
  isCurrentlySelected: boolean;
  indicatorColor: string;
  showNumberInsteadOfTitle: boolean;
  showCourseCredits: boolean;
  isInTransferColumn?: boolean;
}

function CourseCard(props: CourseCardProps) {
  const dispatch = useAppDispatch();
  const currentDisplayCourse = useAppSelector(selectCurrentCourseDisplay);

  // eslint-disable-next-line no-unused-vars
  const {
    item,
    index,
    columnId,
    indicatorColor,
    showCourseCredits,
    isInTransferColumn,
    isCurrentlySelected,
    showNumberInsteadOfTitle,
  } = props;

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (isInTransferColumn) {
      dispatch(deleteTransferCourse(index));
    } else {
      dispatch(deleteCourse({
        index,
        columnId
      }));
    }
  };

  const handleCourseClick = (event) => {
    event.stopPropagation();
    dispatch(changeCourseDisplay(item));
  };

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
              // boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.05)',
              ...provided.draggableProps.style,
            }}
            className={`${backgroundColor} w-full
             text-black font-semibold mt-2 rounded-sm relative z-50
             `}
            onClick={(e) => { handleCourseClick(e); }}
            onKeyDown={(e) => { handleCourseClick(e); }}
            role="listitem"
          >

            <div
              className={
                `
               ${isCurrentlySelected ? 'h-full' : 'h-0'}
               ${indicatorColor}
               bottom-0 left-0 w-1 absolute
               transition-height duration-300 ease-out rounded-sm z-50
               `
              }
            />

            <div className="flex flex-row w-full">
              <div className="w-10/12 h-full pl-2 py-1 text-lg overflow-hidden text-ellipsis">
                {showNumberInsteadOfTitle ? item.courseString : item.title}
                {showCourseCredits ? <span className="font-normal text-xs ml-1 align-top">{item.credits}</span>
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  : <></>}
              </div>
              <div
                className="w-2/12 text-right h-full pt-1.5 pr-1"
              >
                <button
                  className="hover:underline hover:text-gray-400"
                  // eslint-disable-next-line max-len
                  onClick={(e) => { handleDeleteClick(e); }}
                  onKeyDown={(e) => { handleDeleteClick(e); }}
                  tabIndex={0}
                  type="button"
                >
                  <ClearIcon fontSize="inherit" />
                </button>
              </div>
            </div>

          </div>
        );
      }}
    </Draggable>
  );
}

CourseCard.defaultProps = {
  isInTransferColumn: false,
};

export default CourseCard;
export type { CourseCardInfo };
