/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface CourseSearchCardProps {
  shortTitle: string;
  courseId: string;
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
}

interface PseudoCourseCardProps {
  shortTitle: string;
  backgroundColor: string;
  isAbsolute?: boolean;
}

function PseudoCourseCard(props: PseudoCourseCardProps) {
  const { shortTitle, backgroundColor, isAbsolute } = props;
  // const absolutePosition = useState(isAbsolute ? 'absolute' : '');

  return (
    <div className={`${backgroundColor}
     bg-gray-100 w-full text-black pl-2 py-1 text-lg
     font-semibold rounded-sm ${isAbsolute ? 'absolute' : ''}`}
    >
      {shortTitle}
    </div>
  );
}

PseudoCourseCard.defaultProps = {
  isAbsolute: false
};

function CourseSearchCard(props: CourseSearchCardProps) {
  const { shortTitle, courseId, checkIfCourseAlreadyInPlan } = props;
  const [draggable, setDraggable] = useState<boolean | undefined>(true);

  useEffect(() => {
    setDraggable(checkIfCourseAlreadyInPlan(courseId));
  }, []);

  return (
    <div className="h-fit bg-gray-300 max-w-fit">
      <Droppable droppableId={shortTitle} key={shortTitle} isDropDisabled>
        {(providedDroppable) => (
          <div
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
            className="relative h-full"
          >
            <Draggable
              key={courseId}
              draggableId={`searchCard-${courseId}`}
              index={0}
              isDragDisabled={draggable}
            >
              {(provided, snapshot) => {
                // eslint-disable-next-line no-unused-vars
                const backgroundColor = snapshot.isDragging ? 'bg-gray-300' : 'bg-gray-100';
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
                          backgroundColor={backgroundColor}
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
