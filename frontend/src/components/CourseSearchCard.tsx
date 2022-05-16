/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import CourseCard from './CourseCard';

//  {(_provided, _snapshot) => {
// <div
//   {...provided.droppableProps}
//   ref={provided.innerRef}
//   style={{
//     background: snapshot.isDraggingOver
//       ? '#273340'
//       : '#34495e',
//     width: '100%',
//   }}
// >
//   <CourseCard
//     item={{
//       _id: '627c718d319cae16ef4c12ad',
//       title: 'CS112',
//     }}
//     index={2}
//   />
// </div>

function CourseSearchCard(props) {
  const { shortTitle, fullTtile } = props;
  // TODO:
  // change this because everytime react re-renders
  // a new id is created.
  // create an id when you query a list, and then use document _id
  const [ID, setID] = useState<string>(uuid());

  return (
    <div className="h-12 w-full bg-red-300 border-solid
                    border-black border-2"
    >
      <Droppable droppableId={ID} key={ID}>
        {(providedDroppable, snapshotDroppable) => (
          <div
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
            className="h-0"
          >
            <Draggable
              key={ID}
              draggableId={ID}
              index={0}
            >
              {(provided, snapshot) => {
                // eslint-disable-next-line no-unused-vars
                const backgroundColor = snapshot.isDragging ? 'bg-red-700' : 'bg-red-500';

                return (
                  <>
                    {!snapshot.isDragging
                      // eslint-disable-next-line react/jsx-no-useless-fragment
                      ? <></>
                      : (
                        <div className="bg-red-500 w-full h-6 text-white pl-2 pt-0.5 my-2">
                          {shortTitle}
                        </div>
                      )}
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                      className={`${backgroundColor} w-full h-6 text-white pl-2 pt-0.5 my-2`}
                    >
                      {shortTitle}
                    </div>
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
