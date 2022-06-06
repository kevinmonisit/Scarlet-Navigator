/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Tooltip } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface CourseSearchCardProps {
  shortTitle: string;
  courseId: string;
  // numberOfCourses: number;
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
}

interface PseudoCourseCardProps {
  shortTitle: string;
  backgroundColor?: string;
  isAbsolute?: boolean;
  disabled?: boolean;
}

function PseudoCourseCard(props: PseudoCourseCardProps) {
  const { shortTitle, backgroundColor, isAbsolute, disabled } = props;

  const regularTheme = {
    backgroundColor,
    textColor: 'text-black'
  };

  const disabledTheme = {
    backgroundColor: 'bg-gray-700',
    textColor: 'text-white'
  };

  const currTheme = !disabled ? disabledTheme : regularTheme;

  return (
    <Tooltip
      disableHoverListener={disabled}
      disableFocusListener={disabled}
      disableTouchListener={disabled}
      title="Course already in plan"
      placement="right"
      arrow
      enterDelay={500}
      enterNextDelay={500}
    >
      <div className={`
      ${currTheme.backgroundColor}
      ${currTheme.textColor}
      ${isAbsolute ? 'absolute' : ''}
      ${!isAbsolute ? 'mt-2' : ''}
      bg-gray-100 w-full pl-2 text-lg
      font-semibold rounded-sm `}
      >
        {shortTitle}
      </div>
    </Tooltip>

  );
}

PseudoCourseCard.defaultProps = {
  isAbsolute: false,
  backgroundColor: 'bg-gray-100',
  disabled: false
};

function CourseSearchCard(props: CourseSearchCardProps) {
  const {
    shortTitle,
    courseId,
    checkIfCourseAlreadyInPlan,
  } = props;
  const [draggable, setDraggable] = useState<boolean | undefined>(false);

  // useEffect(() => {
  //   setDraggable(checkIfCourseAlreadyInPlan(courseId));
  // }, [numberOfCourses]);

  console.log('search card re render');

  return (
    <div className="bg-gray-300 max-w-fit rounded-sm m-2">
      <Droppable droppableId={shortTitle} key={shortTitle} isDropDisabled>
        {(providedDroppable) => (
          <div
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
            className="relative h-8"
          >
            <Draggable
              key={courseId}
              draggableId={`searchCard-${courseId}`}
              index={0}
              isDragDisabled={draggable}
            >
              {(provided, snapshot) => {
                // eslint-disable-next-line no-unused-vars
                const backgroundColor = snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100';
                return (
                  <>
                    {!snapshot.isDragging
                      // this is basically the placeholder course item when course card is out of
                      // its original place
                      // eslint-disable-next-line react/jsx-no-useless-fragment
                      ? <></>
                      : (
                        <PseudoCourseCard
                          shortTitle={shortTitle}
                          isAbsolute
                          disabled={!draggable}
                        />
                      )}
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      <PseudoCourseCard
                        shortTitle={shortTitle}
                        backgroundColor={backgroundColor}
                        disabled={!draggable}
                      />
                    </div>
                  </>
                );
              }}
            </Draggable>

            {providedDroppable.placeholder}
          </div>
        )}
      </Droppable>
      <div className="pl-1 pb-1 pr-1">
        Introduction to Discrete Structures II
      </div>
    </div>
  );
}

export default CourseSearchCard;
