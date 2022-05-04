/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import SemesterColumn, { SemesterColumnInfo } from './SemesterColumn';
// import { CourseCardInfo } from './CourseCard';

const itemsFromBackend = [
  { id: uuid(), content: 'CS205' },
  { id: uuid(), content: 'CS111' },
  { id: uuid(), content: 'CS112' },
  { id: uuid(), content: 'MAT205' },
  { id: uuid(), content: 'MAT300' },
  { id: uuid(), content: 'MAT300' },
  { id: uuid(), content: 'MAT300' },
  { id: uuid(), content: 'MAT300' },
];

const columnsFromBackend = {
  [uuid()]: {
    title: 'Fall 2022',
    items: itemsFromBackend,
  },
  [uuid()]: {
    title: 'Spring 2022',
    items: [],
  },
  [uuid()]: {
    title: 'Fall 2023',
    items: [],
  },
  [uuid()]: {
    title: 'Spring 2024',
    items: [],
  },
};

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

  for (let semesterIndex = 0; semesterIndex < 2; semesterIndex += 1) {
    const courseSemesterID = uuid();
    columns[courseSemesterID] = {};
    columns[courseSemesterID].name = 'Season 20XX';
    columns[courseSemesterID].items = [];

    for (let courseIndex = 0; courseIndex < plan[semesterIndex].length; courseIndex += 1) {
      columns[courseSemesterID].items.push(plan[semesterIndex][courseIndex]);
    }
  }

  return columns;
}

function Dashboard() {
  // const [columns, setColumns] = useState<ColumnContainer | null>(null);
  const [columns, setColumns] = useState(columnsFromBackend);

  // useEffect(() => {
  //   // fetchDashBoardData(setColumns);
  //   axios.get('/api/v1/user/626e0c0cdfc7f88aa17ad114/plan').then((res) => {
  //     setColumns(createSemesterColumns(res.data));
  //   }).catch((err) => {
  //     setColumns(null);
  //     console.warn('Columns could not be fetched: ');
  //     console.warn(err);
  //   });
  // }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      {columns == null ? <>Loading course data...</> : (
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {
            Object.entries(columns).map(([columnId, column]) => (
              <SemesterColumn key={columnId} columnId={columnId} column={column} />
            ))
          }
        </DragDropContext>
      )}

    </div>
  );
}

export default Dashboard;
