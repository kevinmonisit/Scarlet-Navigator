/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import SemesterColumn, { SemesterColumnInfo } from './SemesterColumn';

// eslint-disable-next-line no-unused-vars
interface ColumnContainer {
  [key: string]: SemesterColumnInfo;
}

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function createSemesterColumns(plainJSON) {
  const columns = {};
  const { plan } = plainJSON;

  for (let semesterIndex = 0; semesterIndex < plan.length; semesterIndex += 1) {
    const courseSemesterID = uuid();
    columns[courseSemesterID] = {};
    columns[courseSemesterID].title = 'Season 20XX';
    columns[courseSemesterID].items = [];

    for (let courseIndex = 0; courseIndex < plan[semesterIndex].length; courseIndex += 1) {
      columns[courseSemesterID].items.push(plan[semesterIndex][courseIndex]);
    }
  }

  return columns;
}

function updateStudentPlan(columns: ColumnContainer | null) {
  if (!columns) {
    return;
  }

  const arrayOfCourseObjectIds: Array<Array<String>> = [];
  Object.keys(columns).forEach((columnId) => {
    // eslint-disable-next-line no-underscore-dangle
    arrayOfCourseObjectIds.push(columns[columnId].items.map((item) => item._id));
  });

  axios.patch('/api/v1/user/627ae069ea20954554097920/plan', {
    plan: arrayOfCourseObjectIds
  })
    .then((response) => {
      console.log(response);
    });
}

function Dashboard() {
  const [columns, setColumns] = useState<ColumnContainer | null>(null);

  useEffect(() => {
    axios.get('/api/v1/user/627ae069ea20954554097920/plan')
      .then((res) => {
        setColumns(createSemesterColumns(res.data));
      })
      .catch((err) => {
        setColumns(null);
        console.warn('Columns could not be fetched: ');
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    updateStudentPlan(columns);
  }, [columns]);

  return (

    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div
        className="flex flex-row flex-nowrap
        justify-center items-stretch w-screen h-screen"
      >
        <div className="w-1/4 h-max bg-amber-500">H</div>
        {columns == null ? <>Loading course data...</> : (
          <div className="grid h-100 grid-cols-4 gap-x-4 grow justify-center">
            {
              Object.entries(columns).map(([columnId, column]) => (
                <SemesterColumn key={columnId} columnId={columnId} column={column} />
              ))
            }
          </div>

        )}
        <div className="w-1/4 h-max bg-amber-200">D</div>
      </div>
    </DragDropContext>
  );
}

export default Dashboard;
