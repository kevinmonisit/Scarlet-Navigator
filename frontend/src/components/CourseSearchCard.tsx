/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Tooltip } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface CourseSearchCardProps {
  shortTitle: string;
  courseId: string;
  courseString: string;
  // numberOfCourses: number;
  // eslint-disable-next-line no-unused-vars
  // checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
  handleCourseInfoChange(id: string): void;
  alreadyInPlan: boolean | undefined;
}

interface PseudoCourseCardProps {
  shortTitle: string;
  // courseString: string;
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
      <div
        className={`
      ${currTheme.backgroundColor}
      ${currTheme.textColor}
      ${isAbsolute ? 'absolute' : ''}
      ${!isAbsolute ? 'mt-2' : ''}
      bg-gray-100 w-full px-2  text-lg
      font-semibold rounded-sm overflow-hidden text-ellipsis
      select-none`}
        style={{
          boxShadow: !disabled ? '0px 3px 5px rgba(0, 0, 0, 0.2)' : ''
        }}
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
    alreadyInPlan,
    courseString,
    handleCourseInfoChange
  } = props;

  const handleCourseClick = (event) => {
    event.stopPropagation();
    handleCourseInfoChange(courseId);
  };

  return (
    <div className="bg-gray-300 rounded-sm mr-2">
      <Droppable droppableId={shortTitle} key={shortTitle} isDropDisabled>
        {(providedDroppable) => (
          <div
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
            className="relative"
          >
            <Draggable
              key={courseId}
              draggableId={`searchCard-${courseId}`}
              index={0}
              isDragDisabled={alreadyInPlan}
            >
              {(provided, snapshot) => {
                // Lots of accessibility errors have been disabled.
                // Look into after MPV is done.

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
                          disabled={!alreadyInPlan}
                        />
                      )}

                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                      onClick={(e) => { handleCourseClick(e); }}
                      tabIndex={0}
                    >
                      <PseudoCourseCard
                        shortTitle={shortTitle}
                        backgroundColor={backgroundColor}
                        disabled={!alreadyInPlan}
                      />
                    </div>
                  </>
                );
              }}
            </Draggable>
            {/*
              Why the below div container exists:

              React beautiful dnd will throw an error when the placeholder is not present.
              As of now, I've (Kevin) added my own custom placeholder. However, I do not
              want the error throwing in the console nor do I want to disable all errors.
              Thus, I created a container that is absolute so there aren't weird resizing glitches.
             */}
            <div className="absolute hidden">{providedDroppable.placeholder}</div>
          </div>
        )}
      </Droppable>
      <div className="pl-1 pb-1 pr-1 pt-2">
        {courseString}
      </div>
    </div>
  );
}

export default React.memo(CourseSearchCard);
