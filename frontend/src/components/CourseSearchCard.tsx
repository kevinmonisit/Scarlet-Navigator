/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface CourseSearchCardProps {
  shortTitle: string;
  courseId: string;
  numberOfCourses: number;
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
}

interface PseudoCourseCardProps {
  shortTitle: string;
  backgroundColor?: string;
  isAbsolute?: boolean;
}

function PseudoCourseCard(props: PseudoCourseCardProps) {
  const { shortTitle, backgroundColor, isAbsolute } = props;

  return (
    <div className={`${backgroundColor}
     bg-gray-100 w-full text-black pl-2 text-lg
     font-semibold rounded-sm ${isAbsolute ? 'absolute' : ''}`}
    >
      {shortTitle}
    </div>
  );
}

PseudoCourseCard.defaultProps = {
  isAbsolute: false,
  backgroundColor: 'bg-gray-100'
};

function CourseSearchCard(props: CourseSearchCardProps) {
  const {
    shortTitle,
    courseId,
    checkIfCourseAlreadyInPlan,
    numberOfCourses } = props;
  const [draggable, setDraggable] = useState<boolean | undefined>(true);

  useEffect(() => {
    setDraggable(checkIfCourseAlreadyInPlan(courseId));
  }, [numberOfCourses]);

  return (
    <div className="bg-gray-300 max-w-fit rounded-sm m-1">
      <Droppable droppableId={shortTitle} key={shortTitle} isDropDisabled>
        {(providedDroppable) => (
          <div
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
            className="relative h-10"
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
      <div className="pl-1 py-1 pr-1">
        Introduction to Discrete Structures II
      </div>
    </div>
  );
}

export default CourseSearchCard;
