/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import { SemesterColumnInfo } from './components/SemesterColumn';
import SearchColumn from './columns/SearchColumn';
import useWindowDimensions from './tools/WindowDimensions';
import { processTransferCourses, processUserDocumentPlan } from './logic/processQuery';
import { getPlanKeyByIndex, onDragEnd, uploadNewStudentPlanFirestore } from './logic/handlePlan';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { changeSetting, selectCurrentPlanIndex, selectCurrentSettings, setPlanIndex, setSettings } from './redux/slices/settingsSlice';
import { selectSemesterCreditArray, setTransferCredits, updateRunningCreditArray } from './redux/slices/creditTrackingSlice';
import { selectCurrentPlan, selectCurrentTransferCourses, setPlan, setTransferArray } from './redux/slices/planSlice';
import { Course, PlanContainer } from './interfaces/Course';
import collectCoreFulfillmentInfo from './logic/handleCoreFulfillment';
import { selectCoreState, setCoreState } from './redux/slices/coreFulfillmentSlice';
import MainColumnContainer from './columns/MainColumnContainer';
import { getTransferCreditCount } from './logic/handleCredits';
import ErrorPage from './ErrorPage';

function setLocalPlanIndex(planIndex: 1 | 2 | 3) {
  localStorage.setItem('planIndex', planIndex.toString());
}

function getLocalPlanIndex() {
  const planIndex = localStorage.getItem('planIndex');
  if (!planIndex) {
    return 1;
  }

  return parseInt(planIndex, 10);
}

// eslint-disable-next-line no-unused-vars
interface ColumnContainer {
  [key: string]: SemesterColumnInfo;
}

function Dashboard(props: {
  courseCollectionRef: CollectionReference,
  userDocReference: DocumentReference,
  dbReference: any,
  functionReference: any,
}) {
  const useDispatch = useAppDispatch();
  const settings = useAppSelector(selectCurrentSettings);
  const planIndex = useAppSelector(selectCurrentPlanIndex);
  const semesterCreditArray = useAppSelector(selectSemesterCreditArray);
  const currentPlan = useAppSelector(selectCurrentPlan);
  const currentCoreFulfillmentState = useAppSelector(selectCoreState);
  const currentTransferCourseArray = useAppSelector(selectCurrentTransferCourses);

  const [errorOccurredDuringFetch, setErrorOccurredDuringFetch] = useState<boolean>(false);

  const { courseCollectionRef, userDocReference, dbReference, functionReference } = props;
  const [userDoc, loading, error, snapshot, reload] = useDocumentDataOnce<any>(userDocReference);

  const [searchQueryList, setSearchQueryList] = useState<any[] | null>(null);

  const setOfCurrentCourseIDs = useRef<Set<string> | null>(null);
  const [numberOfCourses, setNumberOfCourses] = useState(0);

  const { width } = useWindowDimensions();
  const [widthTooSmall, setWidthTooSmall] = useState<boolean>(false);

  useEffect(() => {
    if (width <= 1000) {
      setWidthTooSmall(true);
    } else {
      setWidthTooSmall(false);
    }
  }, [width]);

  const checkIfCourseAlreadyInPlan = (courseId: string) => {
    if (setOfCurrentCourseIDs != null && setOfCurrentCourseIDs.current != null) {
      return setOfCurrentCourseIDs.current.has(courseId);
    }

    return undefined;
  };

  const upstreamQuery = (courseListQuery: any) => {
    setSearchQueryList(courseListQuery);
  };

  const findCourseInSearchQueryList = (id: string): Course | null => {
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

  const updateSetOfCurrentCourseIDs = () => {
    if (!currentPlan) return;

    const columnKeys = Object.keys(currentPlan);
    const newSet: Set<string> = new Set();

    for (let semesterIndex = 0; semesterIndex < columnKeys.length; semesterIndex += 1) {
      const key = columnKeys[semesterIndex];
      const courses = currentPlan[key].items;
      for (let courseIndex = 0; courseIndex < courses.length; courseIndex += 1) {
        newSet.add(courses[courseIndex]._id);
      }
    }

    for (let index = 0; index < currentTransferCourseArray.length; index += 1) {
      newSet.add(currentTransferCourseArray[index]._id);
    }

    setOfCurrentCourseIDs.current = newSet;
  };

  /*
    =========== Initialization to changes ===========

    TOOD: Improve the flow of data change
  */

  useEffect(() => {
    useDispatch(setPlanIndex(getLocalPlanIndex() as 1 | 2 | 3));
  }, []);

  /**
   * Student Plan is first accessed here
   */
  useEffect(() => {
    if (loading || !userDoc) return;
    processUserDocumentPlan(userDoc, planIndex)
      .then((processedColumns: PlanContainer) => {
        useDispatch(setPlan(processedColumns));
        useDispatch(setSettings(userDoc[getPlanKeyByIndex(planIndex)].settings));
      })
      .catch((err) => {
        setErrorOccurredDuringFetch(true);
        useDispatch(setPlan({}));
        console.warn('Columns could not be fetched: ');
        console.warn(err);
      });

    processTransferCourses(userDoc)
      .then((transferCourses: Course[]) => {
        useDispatch(setTransferArray(transferCourses));
      })
      .catch((err) => {
        setErrorOccurredDuringFetch(true);
        useDispatch(setTransferArray([]));
        console.warn('Transfer course array could not be fetched');
        console.warn(err);
      });
  }, [userDoc]);

  useEffect(() => {
    reload();
    setLocalPlanIndex(planIndex);
  }, [planIndex]);

  /*
    =========== Response to changes ===========
  */

  useEffect(() => {
    // if an error occurred, don't send back and ratify a blank plan
    if (userDoc && settings && !errorOccurredDuringFetch && !loading) {
      uploadNewStudentPlanFirestore(
        currentPlan,
        currentTransferCourseArray,
        planIndex,
        userDocReference,
        dbReference,
        settings
      );
    }
    updateSetOfCurrentCourseIDs();

    if (setOfCurrentCourseIDs.current) {
      setNumberOfCourses(setOfCurrentCourseIDs.current.size);
    }
  }, [currentPlan, currentTransferCourseArray, settings]);

  useEffect(() => {
    const transferCredits = getTransferCreditCount(currentTransferCourseArray);
    useDispatch(setTransferCredits(transferCredits));
    /**
     * Reset starting credits to transfer credit count
     * ONLY when transfer course array is modified
     */
    useDispatch(changeSetting({
      key: 'startingCredits',
      newValue: transferCredits
    }));
  }, [currentTransferCourseArray.length]);

  useEffect(() => {
    useDispatch(updateRunningCreditArray({
      startingCredits: settings.startingCredits
    }));
  }, [settings.startingCredits, semesterCreditArray]);

  useEffect(() => {
    const newCoreState = collectCoreFulfillmentInfo(
      currentPlan,
      currentCoreFulfillmentState,
      currentTransferCourseArray
    );
    useDispatch(setCoreState(newCoreState));
  }, [numberOfCourses, currentTransferCourseArray.length]);

  if (widthTooSmall) {
    return (
      <ErrorPage
        message="Scarlet Navigator is a desktop-only experience. Please
        try again with a larger screen."
      />
    );
  }

  if (errorOccurredDuringFetch) {
    return (
      <ErrorPage
        message="Scarlet Navigator had trouble fetching your data. Either refresh the page or
        consult the console for errors."
      />
    );
  }

  return (

    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(
          result,
          currentPlan,
          currentTransferCourseArray,
          (plan: PlanContainer) => {
            useDispatch(setPlan(plan));
          },
          (transferCourseArray: Course[]) => {
            useDispatch(setTransferArray(transferCourseArray));
          },
          findCourseInSearchQueryList,
          checkIfCourseAlreadyInPlan
        );
      }}
    >
      <div
        className="flex flex-row flex-nowrap
        justify-center items-stretch w-full grow overflow-hidden"
      >
        {/* Load search columns after columns is initialized to prevent re-loading */}
        <SearchColumn
          checkIfCourseAlreadyInPlan={checkIfCourseAlreadyInPlan}
          upstreamQuery={upstreamQuery}
          showCourseCredits={settings.showCourseCredits}
          numberOfCardsToQuery={settings.maxSearchQuery}
          courseCollectionRef={courseCollectionRef}
          functionReference={functionReference}
        />
        <MainColumnContainer
          currentPlan={currentPlan}
          settings={settings}
        />
      </div>
    </DragDropContext>
  );
}

export default Dashboard;
export type { ColumnContainer };
