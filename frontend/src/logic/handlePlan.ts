/* eslint-disable no-underscore-dangle */
import { doc, DocumentReference, updateDoc } from 'firebase/firestore';
import { DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { COLUMN_ID_OF_TRANSFER_COLUMN } from '../columns/mainView/TransferCoursesDisplay';
import { Course, PlanContainer, SemesterColumnInfo } from '../interfaces/Course';
import { Settings } from '../interfaces/Settings';

/**
 * TODO: Fix this onDragEnd() function. It's really bad looking.
 */
const MAX_REGULAR_SEMESTERS = 16;
const MAX_SUMMER_SEMESTERS = 8;
const MAX_TOTAL_SEMESTERS = MAX_REGULAR_SEMESTERS + MAX_SUMMER_SEMESTERS;

const onDragEnd = (
  result: DropResult,
  columns: any,
  transferCourses: Course[],
  // eslint-disable-next-line no-unused-vars
  setColumns: (plan: PlanContainer) => void,
  // eslint-disable-next-line no-unused-vars
  setTransferCourses: (newArray: Course[]) => void,
  // eslint-disable-next-line no-unused-vars
  findCourseInSearchQuery: (id: string) => Course | null,
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan: (id: string) => boolean | undefined
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (result.draggableId.includes('searchCard')) {
    const newCourseCardId = result.draggableId.split('*')[1];
    if (checkIfCourseAlreadyInPlan(newCourseCardId)) {
      return;
    }

    const newCourseToAdd = findCourseInSearchQuery(newCourseCardId);
    if (!newCourseToAdd) return;

    if (destination.droppableId === COLUMN_ID_OF_TRANSFER_COLUMN) {
      const newTransferCoursesArray = [...transferCourses];
      newTransferCoursesArray.splice(destination.index, 0, newCourseToAdd);
      setTransferCourses(newTransferCoursesArray);
      return;
    }

    const destColumn = columns[destination.droppableId];
    const destItems = [...destColumn.items];
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

  if (destination.droppableId === COLUMN_ID_OF_TRANSFER_COLUMN) {
    const newTransferCoursesArray = [...transferCourses];
    const [removed] = newTransferCoursesArray.splice(source.index, 1);
    newTransferCoursesArray.splice(destination.index, 0, removed);
    setTransferCourses(newTransferCoursesArray);
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
};

const generateBlankPlan = () => {
  const blankPlan: PlanContainer = {};
  for (let k = 0; k < MAX_TOTAL_SEMESTERS; k += 1) {
    const semesterColumn: SemesterColumnInfo = {
      items: [],
      title: ''
    };
    blankPlan[uuid()] = semesterColumn;
  }

  return blankPlan;
};

const uploadNewStudentPlanFirestore = async (
  columns: PlanContainer | null,
  transferCourses: Course[],
  planIndex: 1 | 2 | 3,
  userDocRef: DocumentReference,
  dbReference,
  settings: Settings,
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Uploading to user document.');
  }

  if (!columns) {
    return;
  }

  if (!userDocRef) return;

  let planKey = 'plan';
  if (planIndex === 2) {
    planKey = 'secondPlan';
  } else if (planIndex === 3) {
    planKey = 'thirdPlan';
  }

  const transformedColumns = {};

  Object.keys(columns).forEach((key, index) => {
    transformedColumns[index] = columns[key].items.map((item) => doc(dbReference, 'courses', item._id));
  });

  const transferCourseReferences: DocumentReference[] = [];
  transferCourses.forEach((course) => {
    transferCourseReferences.push(doc(dbReference, 'courses', course._id));
  });

  await updateDoc(userDocRef, {
    [planKey]: {
      plan: transformedColumns,
      settings
    },
    transferCourses: transferCourseReferences,
  });
};

function getPlanKeyByIndex(planIndex: 1 | 2 | 3) {
  if (planIndex === 1) {
    return 'plan';
  }

  if (planIndex === 2) {
    return 'secondPlan';
  }

  return 'thirdPlan';
}

export {
  onDragEnd,
  uploadNewStudentPlanFirestore,
  getPlanKeyByIndex,
  generateBlankPlan,
  MAX_TOTAL_SEMESTERS,
  MAX_SUMMER_SEMESTERS,
  MAX_REGULAR_SEMESTERS,
};
