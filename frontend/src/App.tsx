/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import SemesterColumn from './components/SemesterColumn';

const itemsFromBackend = [
  { id: uuid(), content: 'CS205' },
  { id: uuid(), content: 'CS111' },
  { id: uuid(), content: 'CS112' },
  { id: uuid(), content: 'MAT205' },
  { id: uuid(), content: 'EXPOS' },
];

const columnsFromBackend = {
  [uuid()]: {
    name: 'Fall 2022',
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: 'Spring 2022',
    items: [],
  },
  [uuid()]: {
    name: 'Fall 2023',
    items: [],
  },
  [uuid()]: {
    name: 'Spring 2024',
    items: [],
  },
};

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

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => (
          <SemesterColumn columnId={columnId} column={column} />
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
