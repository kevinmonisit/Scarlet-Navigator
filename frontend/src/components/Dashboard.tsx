/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import SemesterColumn, { SemesterColumnInfo } from './SemesterColumn';
// import { CourseCardInfo } from './CourseCard';

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

}

function Dashboard() {
  const [columns, setColumns] = useState<ColumnContainer | null>(null);

  useEffect(() => {
    axios.get('/api/v1/user/6271db95cde76c1f74b093b8/plan').then((res) => {
      setColumns(createSemesterColumns(res.data));
    }).catch((err) => {
      setColumns(null);
      console.warn('Columns could not be fetched: ');
      console.warn(err);
    });
  }, []);

  useEffect(() => {
    if (!columns) {
      return;
    }

    const arrayOfCourseObjectIds: Array<Array<String>> = [];
    Object.keys(columns).forEach((columnId) => {
      // eslint-disable-next-line no-underscore-dangle
      arrayOfCourseObjectIds.push(columns[columnId].items.map((item) => item._id));
    });

    console.log(columns);

    axios.patch('/api/v1/user/6271db95cde76c1f74b093b8/plan', {
      plan: arrayOfCourseObjectIds
    }).then((response) => {
      console.log(response);
    });
  }, [columns]);

  return (
    <div style={{ display: 'grid', height: '100%', gridTemplateColumns: 'auto auto auto auto', columnGap: '1fr 1fr 1fr' }}>
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
