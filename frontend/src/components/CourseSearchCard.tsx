/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
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
}

function PseudoCourseCard(props: PseudoCourseCardProps) {
  const { shortTitle, backgroundColor } = props;
  return (
    <div className={`${backgroundColor}
     bg-gray-100 w-full text-black pl-2 py-1 text-lg
     font-semibold rounded-sm`}
    >
      {shortTitle}
    </div>
  );
}

function CourseSearchCard(props: CourseSearchCardProps) {
  const { shortTitle, courseId, checkIfCourseAlreadyInPlan } = props;
  const [draggable, setDraggable] = useState<boolean | undefined>(true);

  useEffect(() => {
    setDraggable(checkIfCourseAlreadyInPlan(courseId));
  }, []);

  return (
    <div className="h-fit bg-red-300 border-solid
                    border-black"
    >
      <Droppable droppableId={shortTitle} key={shortTitle} isDropDisabled>
        {(providedDroppable) => (
          <div
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
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
                        />
                      )}
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                      className="w-full"
                    >
                      <PseudoCourseCard
                        shortTitle={shortTitle}
                        backgroundColor={backgroundColor}
                      />
                    </div>
                    <span
                      className="pl-2 pr-3"
                    >
                      Introduction to Discrete Structures II
                    </span>
                  </>
                );
              }}
            </Draggable>

            {providedDroppable.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default CourseSearchCard;
