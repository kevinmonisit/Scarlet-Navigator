/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import SemesterColumn, { SemesterColumnInfo } from './SemesterColumn';
import SearchColumn, { CourseCardInSearch } from './SearchColumn';
import CourseInfoColumn from './CourseInfoColumn';

// eslint-disable-next-line no-unused-vars
interface ColumnContainer {
  [key: string]: SemesterColumnInfo;
}

function onDragEnd(
  result: DropResult,
  columns: any,
  setColumns: any,
  // TODO: substitute any[] with the actual interface schema of a course represented in MongoDB
  findCourseInSearchQuery: (id: string) => boolean,
  checkIfCourseAlreadyInPlan: (id: string) => boolean | undefined
) {
  if (!result.destination) return;
  const { source, destination } = result;
  if (result.draggableId.includes('searchCard')) {
    const newCourseCardId = result.draggableId.split('-')[1];
    if (checkIfCourseAlreadyInPlan(newCourseCardId)) {
      console.log('already in plan');
      return;
    }

    const destColumn = columns[destination.droppableId];
    const destItems = [...destColumn.items];
    const newCourseToAdd = findCourseInSearchQuery(newCourseCardId);
    if (!newCourseToAdd) return;
    destItems.splice(destination.index, 0, newCourseToAdd);
    setColumns({
      ...columns,
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      }

    });
    return;
  }

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
}

async function processSemesterColumnQuery(plainJSON: { plan: Array<Array<any>>; }) {
  const columns = {};
  const setOfCourseIDs: Set<string> = new Set();
  const { plan } = plainJSON;

  for (let semesterIndex = 0; semesterIndex < plan.length; semesterIndex += 1) {
    const courseSemesterID = uuid();
    columns[courseSemesterID] = {};
    columns[courseSemesterID].title = 'Fall 2022';
    columns[courseSemesterID].items = [];

    for (let courseIndex = 0; courseIndex < plan[semesterIndex].length; courseIndex += 1) {
      columns[courseSemesterID].items.push(plan[semesterIndex][courseIndex]);
      // eslint-disable-next-line no-underscore-dangle
      setOfCourseIDs.add(plan[semesterIndex][courseIndex]._id);
    }
  }
  console.log(columns);
  return { columns, setOfCourseIDs };
}

function uploadNewStudentPlan(columns: ColumnContainer | null) {
  if (!columns) {
    return;
  }

  const arrayOfCourseObjectIds: Array<Array<String>> = [];
  Object.keys(columns).forEach((columnId) => {
    // eslint-disable-next-line no-underscore-dangle
    arrayOfCourseObjectIds.push(columns[columnId].items.map((item) => item._id));
  });

  axios.patch('/api/v1/user/627c718e319cae16ef4c12bf/plan', {
    plan: arrayOfCourseObjectIds
  })
    .then((response) => {
    });
}

function getCreditSemesterCount(column: SemesterColumnInfo) {
  return column.items.reduce((previous, current) => (previous + current.credits), 0);
}

function Dashboard() {
  const [columns, setColumns] = useState<ColumnContainer | null>(null);
  const [searchQueryList, setSearchQueryList] = useState<any[] | null>(null);
  const [currentCourseInfoDisplayed, setCurrentCourseInfoDisplayed] = useState<any | null>(null);

  const [runningCreditCountArray, setRunningCreditCountArray] = useState<Array<number>>([]);
  const [semesterCreditArray, setSemesterCreditArray] = useState<Array<number>>([]);

  const setOfCurrentCourseIDs = useRef<Set<string> | null>(null);

  const checkIfCourseAlreadyInPlan = (courseId: string) => {
    if (setOfCurrentCourseIDs != null && setOfCurrentCourseIDs.current != null) {
      return setOfCurrentCourseIDs.current.has(courseId);
    }

    return undefined;
  };

  const upstreamQuery = (courseListQuery: any) => {
    setSearchQueryList(courseListQuery);
  };

  // O(n), could be better by indexing courses by their _id in the backend
  // but until it's a problem, I offload this work to the user
  const findCourseInSearchQueryList = (id: string): any => {
    if (!searchQueryList) return null;

    // eslint-disable-next-line no-restricted-syntax
    for (const queriedCourse of searchQueryList) {
      // eslint-disable-next-line no-underscore-dangle
      if (queriedCourse._id === id) {
        return queriedCourse;
      }
    }

    return null;
  };

  const handleDeleteCourseCard = (index: number, columnId: string) => {
    if (columns) {
      const modifiedColumn = columns[columnId];
      const modifiedColumnItems = [...modifiedColumn.items];
      modifiedColumnItems.splice(index, 1);
      setColumns({
        ...columns,
        [columnId]: {
          ...modifiedColumn,
          items: modifiedColumnItems,
        }
      });
    }
  };

  // TODO: change any type to model schema
  const handleCourseInfoChange = (courseObject: any) => {
    setCurrentCourseInfoDisplayed(courseObject);
  };

  const createArrayOfSemesterCredits = () => {
    if (!columns) return;
    const arrayOfCredits: Array<number> = [];

    Object.keys(columns).forEach((key) => {
      arrayOfCredits.push(getCreditSemesterCount(columns[key]));
    });

    setSemesterCreditArray(arrayOfCredits);
  };

  const updateRunningCreditCountArray = () => {
    if (!columns) return;
    const newArray = new Array(Object.keys(columns).length).fill(0);

    for (let i = 0; i < semesterCreditArray.length; i += 1) {
      if (i === 0) {
        newArray[i] = semesterCreditArray[i];
      } else {
        newArray[i] = newArray[i - 1] + semesterCreditArray[i];
      }
    }

    setRunningCreditCountArray(newArray);
  };

  useEffect(() => {
    axios.get('/api/v1/user/627c718e319cae16ef4c12bf/plan')
      .then((res) => {
        processSemesterColumnQuery(res.data).then((processedColumns) => {
          setColumns(processedColumns.columns);
          setOfCurrentCourseIDs.current = processedColumns.setOfCourseIDs;

          const numberOfColumns = Object.keys(processedColumns.columns).length;
          const defaultArray = new Array(numberOfColumns).fill(0);
          setRunningCreditCountArray(defaultArray);
          console.log(runningCreditCountArray);
        });
      })
      .catch((err) => {
        setColumns(null);
        console.warn('Columns could not be fetched: ');
        console.warn(err);
      });
  }, []);

  useEffect(() => {
    uploadNewStudentPlan(columns);
    createArrayOfSemesterCredits();
  }, [columns]);

  useEffect(updateRunningCreditCountArray, [semesterCreditArray]);

  return (

    <DragDropContext
      // eslint-disable-next-line function-paren-newline
      onDragEnd={(result) => onDragEnd(result,
        columns,
        setColumns,
        findCourseInSearchQueryList,
        checkIfCourseAlreadyInPlan
      )}
    >
      <div
        className="flex flex-row flex-nowrap
        justify-center items-stretch w-full grow"
      >
        <SearchColumn
          checkIfCourseAlreadyInPlan={checkIfCourseAlreadyInPlan}
          upstreamQuery={upstreamQuery}
        />
        {columns == null ? <>Loading course data...</> : (
          <div className="grid grid-cols-4 gap-x-3 grow justify-center min-w-fit">
            {
              Object.entries(columns).map(([columnId, column], index) => (
                <SemesterColumn
                  key={columnId}
                  columnId={columnId}
                  column={column}
                  index={index}
                  runningCreditCount={runningCreditCountArray[index]}
                  semesterCreditCount={semesterCreditArray[index]}
                  handleDeleteCourseCard={handleDeleteCourseCard}
                  handleCourseInfoChange={handleCourseInfoChange}
                />
              ))
            }
          </div>

        )}
        <CourseInfoColumn
          currentCourse={currentCourseInfoDisplayed}
        />
      </div>
    </DragDropContext>
  );
}

export default Dashboard;
