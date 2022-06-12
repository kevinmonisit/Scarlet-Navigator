/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import SemesterColumn, { SemesterColumnInfo } from './SemesterColumn';
import SearchColumn, { CourseCardInSearch } from './SearchColumn';
import InfoColumn from './InfoColumn';

// eslint-disable-next-line no-unused-vars
interface ColumnContainer {
  [key: string]: SemesterColumnInfo;
}

const BASE_URL = process.env.REACT_APP_ENV === 'Production' ? process.env.REACT_APP_API_URL : '';

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
  const { plan } = plainJSON;

  for (let semesterIndex = 0; semesterIndex < plan.length; semesterIndex += 1) {
    const courseSemesterID = uuid();
    columns[courseSemesterID] = {};
    columns[courseSemesterID].title = 'Fall 2022';
    columns[courseSemesterID].items = [];

    for (let courseIndex = 0; courseIndex < plan[semesterIndex].length; courseIndex += 1) {
      columns[courseSemesterID].items.push(plan[semesterIndex][courseIndex]);
    }
  }
  return { columns };
}

function uploadNewStudentPlan(columns: ColumnContainer | null) {
  if (!columns) {
    return;
  }

  const arrayOfCourseObjectIds: Array<Array<String>> = [];
  console.log(columns);
  Object.keys(columns).forEach((columnId) => {
    // eslint-disable-next-line no-underscore-dangle
    arrayOfCourseObjectIds.push(columns[columnId].items.map((item) => item._id));
  });

  axios.patch(`${BASE_URL}/api/v1/user/${process.env.REACT_APP_USER_ID}/plan`, {
    plan: arrayOfCourseObjectIds
  });
}

function getCreditSemesterCount(column: SemesterColumnInfo) {
  return column.items.reduce((previous, current) => (previous + current.credits), 0);
}

function Dashboard() {
  // TODO TOMORROW: Monday june 6th, change columns to a ref
  const [columns, setColumns] = useState<ColumnContainer | null>(null);
  const [searchQueryList, setSearchQueryList] = useState<any[] | null>(null);
  const [currentCourseInfoDisplayed, setCurrentCourseInfoDisplayed] = useState<any | null>(null);

  const runningCreditCountArray = useRef<Array<number>>([]);
  const semesterCreditArray = useRef<Array<number>>([]);

  const setOfCurrentCourseIDs = useRef<Set<string> | null>(null);
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [settings, setSettings] = useState({
    creditsNeededToGraduate: 120,
    startingSemester: 'Fall',
    startingYear: 2021
  });

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
  // make this a hashet (aka an object)
  const findCourseInSearchQueryList = (id: string): any => {
    if (!searchQueryList) return null;
    // eslint-disable-next-line no-restricted-syntax
    for (const queriedCourse of searchQueryList) {
      console.log('find query');

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
  // TODO: Change this function into an overloaded function
  // handleCourseInfoChange(courseObject: courseSchema)
  // handleCourseInfoChange(coureId: string)
  // for now, handle by type
  const handleCourseInfoChange = (course: any) => {
    if (typeof course === 'string') {
      const course_ = findCourseInSearchQueryList(course);
      if (!course_) return;
      setCurrentCourseInfoDisplayed({ ...course_ });
    } else {
      // we assume it's an object. however, make this more cleaner in the future.
      setCurrentCourseInfoDisplayed({ ...course });
    }
  };

  const getCurrentCourseInfo = () => {
    if (currentCourseInfoDisplayed) {
      return currentCourseInfoDisplayed;
    }

    return null;
  };

  const createArrayOfSemesterCredits = () => {
    if (!columns) return;
    const arrayOfCredits: Array<number> = [];

    Object.keys(columns).forEach((key) => {
      arrayOfCredits.push(getCreditSemesterCount(columns[key]));
    });

    semesterCreditArray.current = arrayOfCredits;
  };

  const updateRunningCreditCountArray = () => {
    if (!columns) return;
    const newArray = new Array(Object.keys(columns).length).fill(0);

    for (let i = 0; i < semesterCreditArray.current.length; i += 1) {
      if (i === 0) {
        newArray[i] = semesterCreditArray.current[i];
      } else {
        newArray[i] = newArray[i - 1] + semesterCreditArray.current[i];
      }
    }

    runningCreditCountArray.current = newArray;
  };

  const updateSetOfCurrentCourseIDs = () => {
    if (!columns) return;

    const columnKeys = Object.keys(columns);
    const newSet: Set<string> = new Set();

    for (let semesterIndex = 0; semesterIndex < columnKeys.length; semesterIndex += 1) {
      const key = columnKeys[semesterIndex];
      const courses = columns[key].items;
      for (let courseIndex = 0; courseIndex < courses.length; courseIndex += 1) {
        newSet.add(courses[courseIndex]._id);
      }
    }

    setOfCurrentCourseIDs.current = newSet;
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/user/${process.env.REACT_APP_USER_ID}/plan`)
      .then((res) => {
        processSemesterColumnQuery(res.data).then((processedColumns) => {
          setColumns(processedColumns.columns);
          const numberOfColumns = Object.keys(processedColumns.columns).length;
          const defaultArray = new Array(numberOfColumns).fill(0);
          runningCreditCountArray.current = defaultArray;
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
    updateSetOfCurrentCourseIDs();
    createArrayOfSemesterCredits();
    updateRunningCreditCountArray();

    console.log('change');

    if (setOfCurrentCourseIDs.current) {
      setNumberOfCourses(setOfCurrentCourseIDs.current.size);
    }
  }, [columns]);

  console.log('dashboad');
  return (

    <DragDropContext
      onDragEnd={(result) => {
        createArrayOfSemesterCredits();
        updateRunningCreditCountArray();
        onDragEnd(
          result,
          columns,
          setColumns,
          findCourseInSearchQueryList,
          checkIfCourseAlreadyInPlan
        );
      }}
    >
      <div
        className="flex flex-row flex-nowrap
        justify-center items-stretch w-full grow"
        onClick={() => {
          // allow user to de-select a course when selecting off of it
          // however, in the future, with accessibility in mind...
          // course info should be a toggling idea.
          // only when clicked does a course change. perhaps, we can have a separate
          // accessibility mode.
          // setCurrentCourseInfoDisplayed(null);
        }}
      >
        {/* Load search columns after columns is initialized to prevent re-loading */}
        {columns == null ? <>Loading course data...</> : (
          <SearchColumn
            checkIfCourseAlreadyInPlan={checkIfCourseAlreadyInPlan}
            upstreamQuery={upstreamQuery}
            handleCourseInfoChange={handleCourseInfoChange}
            getCurrentCourseInfoDisplay={getCurrentCourseInfo}
          />

        )}
        <div className="grow relative h-full">
          {(columns == null)
            ? <>Loading course data...</> : (

              <div className="absolute h-full w-full">
                <div
                  className="grid grid-cols-4 gap-x-3 h-full
                justify-center min-w-fit overflow-auto
                pr-3 pl-1
                "
                >
                  {
                    Object.entries(columns).map(([columnId, column], index) => {
                      // eslint-disable-next-line max-len
                      const percentageCompleted = runningCreditCountArray.current[index] / settings.creditsNeededToGraduate;
                      // eslint-disable-next-line max-len
                      const quartersOfCreditsCompleted = Math.floor((percentageCompleted * 100) / 25);
                      return (
                        <SemesterColumn
                          key={columnId}
                          columnId={columnId}
                          column={column}
                          index={index}
                          runningCreditCount={runningCreditCountArray.current[index]}
                          semesterCreditCount={semesterCreditArray.current[index]}
                          quarterIndexUntilGraduation={quartersOfCreditsCompleted}
                          handleDeleteCourseCard={handleDeleteCourseCard}
                          handleCourseInfoChange={handleCourseInfoChange}
                          getCurrentCourseInfoDisplay={getCurrentCourseInfo}
                        />
                      );
                    })
                  }
                </div>
              </div>
            )}
        </div>
        <InfoColumn
          currentCourse={currentCourseInfoDisplayed}
        />
      </div>
    </DragDropContext>
  );
}

export default Dashboard;
export type { ColumnContainer };
