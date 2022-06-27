/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Settings, Season, defaultSettings } from './interfaces/Settings';
import SemesterColumn, { SemesterColumnInfo } from './components/SemesterColumn';
import SearchColumn, { CourseCardInSearch } from './columns/SearchColumn';
import { CoreStateInterface, defaultSASCoreState } from './interfaces/CoreFulfillmentInterface';
import InfoColumn from './columns/infoColumn/InfoColumn';

const BASE_URL = process.env.REACT_APP_ENV === 'Production' ? process.env.REACT_APP_API_URL : '';

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

const seasonArrays = {
  noSummer: {
    [Season.FALL]: [Season.FALL, Season.SPRING],
    [Season.SPRING]: [Season.SPRING, Season.FALL]
  },

  summer: {
    [Season.FALL]: [Season.FALL, Season.SPRING, Season.SUMMER],
    [Season.SPRING]: [Season.SPRING, Season.SUMMER, Season.FALL]
  }
};

function setSeasonArray(startingSeason: Season, includeSummers: boolean) {
  const arrays = includeSummers ? seasonArrays.summer : seasonArrays.noSummer;
  if (!(startingSeason in arrays)) {
    console.warn('Invalid starting season.');
    return {};
  }

  return arrays[startingSeason];
}

// eslint-disable-next-line no-shadow
// enum Season {
//   FALL = 'Fall',
//   SPRING = 'Spring',
//   SUMMER = 'Summer'
// }

function Dashboard() {
  // TODO TOMORROW: Monday june 6th, change columns to a ref
  const [columns, setColumns] = useState<ColumnContainer | null>(null);
  const [searchQueryList, setSearchQueryList] = useState<any[] | null>(null);
  const [currentCourseInfoDisplayed, setCurrentCourseInfoDisplayed] = useState<any | null>(null);

  const [runningCreditCountArray, setRunningCreditCountArray] = useState<Array<number>>([]);
  const [semesterCreditArray, setSemesterCreditArray] = useState<Array<number>>([]);
  const [coreFulfillmentState, setCoreFulfillmentState] = useState<CoreStateInterface>(
    JSON.parse(JSON.stringify(defaultSASCoreState))
  );

  const setOfCurrentCourseIDs = useRef<Set<string> | null>(null);
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings });

  const [seasons, setSeasons] = useState<string[]>(
    setSeasonArray(
      settings.startingSeason,
      settings.includeSummerSemesters
    )
  );

  useEffect(() => {
    const seasonsArray = setSeasonArray(settings.startingSeason, settings.includeSummerSemesters);
    setSeasons(seasonsArray);
  }, [settings.startingSeason, settings.includeSummerSemesters]);

  useEffect(() => {
    // originally, we only have 8 semesters
    // i think it'll look cleaner if we start with 16 blank semesters
    // from the start instead of having to add them dynamically
    // if they don't exist
    if (columns) {
      console.log(settings.numberOfSemesters);
      const currentNumberOfSemesters = Object.keys(columns).length;
      if (currentNumberOfSemesters > 0 && settings.numberOfSemesters > currentNumberOfSemesters) {
        let difference = settings.numberOfSemesters - currentNumberOfSemesters;
        const emptyColumns: ColumnContainer | null = {};
        while (difference >= 0) {
          const semesterColumn: SemesterColumnInfo = {
            items: [],
            title: ''
          };
          emptyColumns[uuid()] = semesterColumn;
          difference -= 1;
        }
        setColumns({
          ...columns,
          ...emptyColumns
        });
      }
    }
  }, [settings.numberOfSemesters]);

  const changeSettings = (newSettings: Settings) => {
    setSettings({
      ...newSettings,
    });
  };

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

  const handleDeleteCourseCard = useCallback((index: number, columnId: string) => {
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
  }, [columns]);

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
    setSemesterCreditArray(arrayOfCredits);
  };

  const updateRunningCreditCountArray = () => {
    if (!columns) return;
    const newArray = new Array(Object.keys(columns).length).fill(0);

    for (let i = 0; i < semesterCreditArray.length; i += 1) {
      if (i === 0) {
        newArray[i] = semesterCreditArray[i] + settings.startingCredits;
      } else {
        newArray[i] = newArray[i - 1] + semesterCreditArray[i];
      }
    }

    setRunningCreditCountArray(newArray);
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

  const resetPlan = () => {
    const MAX_REGULAR_SEMESTERS = 16;
    const MAX_SUMMER_SEMESTERS = 8;
    const MAX_TOTAL_SEMESTERS = MAX_REGULAR_SEMESTERS + MAX_SUMMER_SEMESTERS;

    const blankPlan: ColumnContainer = {};
    for (let k = 0; k < MAX_TOTAL_SEMESTERS; k += 1) {
      const semesterColumn: SemesterColumnInfo = {
        items: [],
        title: ''
      };
      blankPlan[uuid()] = semesterColumn;
    }

    setColumns({
      ...blankPlan
    });
  };

  const createSemesterProps = (index: number): {
    quartersOfCreditsCompleted: number,
    year: number,
    season: string,
    error: boolean,
  } => {
    const percentageCompleted = runningCreditCountArray[index] / settings.creditsNeededToGraduate;
    const quartersOfCreditsCompleted = Math.floor((percentageCompleted * 100) / 25);

    const offset = settings.startingSeason === Season.FALL ? 1 : 0;
    const year = settings.startingYear + Math.floor((index - offset) / seasons.length);
    const season = seasons[index % seasons.length];

    let error = false;
    const numberOfCredits = semesterCreditArray[index];
    if (settings.enableMinimumCreditErrors
      && (numberOfCredits > settings.maxCredits
        || numberOfCredits < settings.minCredits)) {
      error = true;
    }

    return {
      quartersOfCreditsCompleted,
      year,
      season,
      error,
    };
  };

  const collectCoreFulfillmentInfo = () => {
    if (!columns) return;

    // we perform a deep copy of a nested object
    const newCoreState: CoreStateInterface = JSON.parse(JSON.stringify(defaultSASCoreState));

    Object.keys(columns).forEach((key) => {
      columns[key].items.forEach((course) => {
        // TODO: Deal with AH core and different varieties
        course.cores.forEach((coreCode) => {
          if (!Object.prototype.hasOwnProperty.call(coreFulfillmentState, coreCode)) {
            console.warn(`Core ${coreCode} not a part of specified core interface`);
            return;
          }
          const courseCredits = course.credits;
          newCoreState[coreCode].creditsFulfilled += courseCredits;
          newCoreState[coreCode].coursesThatFulfill.push(course.title);
        });
      });
    });

    setCoreFulfillmentState(newCoreState);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/user/${process.env.REACT_APP_USER_ID}/plan`)
      .then((res) => {
        processSemesterColumnQuery(res.data).then((processedColumns) => {
          setColumns(processedColumns.columns);
          const numberOfColumns = Object.keys(processedColumns.columns).length;
          const defaultArray = new Array(numberOfColumns).fill(0);
          setRunningCreditCountArray(defaultArray);
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

    if (setOfCurrentCourseIDs.current) {
      setNumberOfCourses(setOfCurrentCourseIDs.current.size);
    }
  }, [columns]);

  useEffect(createArrayOfSemesterCredits, [settings.startingCredits]);
  useEffect(updateRunningCreditCountArray, [semesterCreditArray]);
  useEffect(collectCoreFulfillmentInfo, [numberOfCourses]);

  console.log('dashboad');
  return (

    <DragDropContext
      onDragEnd={(result) => {
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
      >
        {/* Load search columns after columns is initialized to prevent re-loading */}
        {columns == null ? <>Loading course data...</> : (
          <SearchColumn
            checkIfCourseAlreadyInPlan={checkIfCourseAlreadyInPlan}
            upstreamQuery={upstreamQuery}
            handleCourseInfoChange={handleCourseInfoChange}
            getCurrentCourseInfoDisplay={getCurrentCourseInfo}
            showCourseCredits={settings.showCourseCredits}
            numberOfCardsToQuery={settings.maxSearchQuery}
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
                      if (index + 1 > settings.numberOfSemesters) return <></>;

                      const {
                        quartersOfCreditsCompleted,
                        year,
                        season,
                        error
                      } = createSemesterProps(index);

                      return (
                        <SemesterColumn
                          key={columnId}
                          columnId={columnId}
                          column={column}
                          index={index}
                          season={season}
                          year={year}
                          runningCreditCount={runningCreditCountArray[index]}
                          semesterCreditCount={semesterCreditArray[index]}
                          quarterIndexUntilGraduation={quartersOfCreditsCompleted}
                          handleDeleteCourseCard={handleDeleteCourseCard}
                          handleCourseInfoChange={handleCourseInfoChange}
                          getCurrentCourseInfoDisplay={getCurrentCourseInfo}
                          error={error}
                          showNumberInsteadOfTitle={settings.showNumberInsteadOfTitle}
                          showCourseCredits={settings.showCourseCredits}
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
          coreFulfillmentState={coreFulfillmentState}
          changeSettings={changeSettings}
          settings={settings}
          resetPlan={resetPlan}
        />
      </div>
    </DragDropContext>
  );
}

export default Dashboard;
export type { ColumnContainer };
