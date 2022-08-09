/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Tooltip } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectCurrentCourseDisplay, changeCourseDisplay } from '../redux/slices/courseDisplaySlice';
import { Course } from '../interfaces/Course';

interface CourseSearchCardProps {
  showCourseCredits: boolean;
  alreadyInPlan: boolean | undefined;
  courseDocument: Course;
}

interface PseudoCourseCardProps {
  shortTitle: string;
  isCurrentlySelected: boolean;
  // courseString: string;
  backgroundColor?: string;
  isAbsolute?: boolean;
  disabled?: boolean;
  showCourseCredits: boolean;
  credits: number;
}

function PseudoCourseCard(props: PseudoCourseCardProps) {
  const {
    shortTitle,
    backgroundColor,
    isAbsolute,
    disabled,
    isCurrentlySelected,
    showCourseCredits,
    credits
  } = props;

  const regularTheme = {
    backgroundColor,
    textColor: 'text-black'
  };

  const disabledTheme = {
    backgroundColor: 'bg-gray-700',
    textColor: 'text-white'
  };

  const currTheme = !disabled ? disabledTheme : regularTheme;
  const indicatorTheme = disabled ? disabledTheme : regularTheme;

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
      select-none relative py-1
      `}
        style={{
          boxShadow: !disabled ? '0px 3px 5px rgba(0, 0, 0, 0.2)' : ''
        }}
      >
        <div
          className={
            `
               ${isCurrentlySelected ? 'h-full' : 'h-0'}
               ${indicatorTheme.backgroundColor}
               bottom-0 left-0 w-1 absolute w-full
               transition-height duration-300 ease-out rounded-sm
               z-50
               `
          }
        />
        {shortTitle}
        {showCourseCredits ? <span className="font-normal text-xs ml-1 align-top">{credits}</span>
          // eslint-disable-next-line react/jsx-no-useless-fragment
          : <></>}
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
  const { courseDocument, alreadyInPlan, showCourseCredits } = props;
  const { title, courseString, _id, credits } = courseDocument;
  const dispatch = useAppDispatch();

  const handleCourseClick = (event) => {
    event.stopPropagation();
    dispatch(changeCourseDisplay(courseDocument));
  };

  const currentCourseDisplayed = useAppSelector(selectCurrentCourseDisplay);
  const [isCurrentlySelected, setIsCurrentlySelected] = useState<boolean>(false);
  const widthToUse = '100px';

  useEffect(() => {
    if (currentCourseDisplayed && currentCourseDisplayed._id === _id) {
      setIsCurrentlySelected(true);
    } else {
      setIsCurrentlySelected(false);
    }
  }, [currentCourseDisplayed]);

  return (
    <div className="bg-gray-300 rounded-sm mr-3 ml-2">
      <Droppable droppableId={title} key={title} isDropDisabled>
        {(providedDroppable) => (
          <div
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
            className="relative"
          >
            <Draggable
              key={_id}
              draggableId={`searchCard*${_id}`}
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
                          shortTitle={title}
                          disabled={!alreadyInPlan}
                          isCurrentlySelected={isCurrentlySelected}
                          showCourseCredits={showCourseCredits}
                          credits={credits}
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
                        shortTitle={title}
                        backgroundColor={backgroundColor}
                        disabled={!alreadyInPlan}
                        isCurrentlySelected={isCurrentlySelected}
                        showCourseCredits={showCourseCredits}
                        credits={credits}
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

export default CourseSearchCard;
