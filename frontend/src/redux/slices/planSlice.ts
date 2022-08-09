/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Course, PlanContainer } from '../../interfaces/Course';

interface PlanState {
  currentPlan: PlanContainer;
  transferCourses: Course[];
}

// Define the initial state using that type
const initialState: PlanState = {
  currentPlan: {},
  transferCourses: []
};

interface DeleteCoursePayload {
  index: number;
  columnId: string;
}

export const planSlice = createSlice({
  name: 'plan',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<PlanContainer>) => {
      state.currentPlan = action.payload;
    },

    setTransferArray: (state, action: PayloadAction<Course[]>) => {
      state.transferCourses = action.payload;
    },

    deleteCourse: (state, action: PayloadAction<DeleteCoursePayload>) => {
      const { index, columnId } = action.payload;

      if (state.currentPlan) {
        const modifiedSemesterColumn = state.currentPlan[columnId];
        const modifiedColumnItems = [...modifiedSemesterColumn.items];
        modifiedColumnItems.splice(index, 1);
        const newPlan = {
          ...state.currentPlan,
          [columnId]: {
            ...modifiedSemesterColumn,
            items: modifiedColumnItems,
          }
        };

        state.currentPlan = newPlan;
      }
    },

    deleteTransferCourse: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const modifiedArray = [...state.transferCourses];

      modifiedArray.splice(index, 1);
      state.transferCourses = modifiedArray;
    }
  },
});

export const { setPlan, setTransferArray, deleteCourse, deleteTransferCourse } = planSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;
export const selectCurrentTransferCourses = (state: RootState) => state.plan.transferCourses;

export default planSlice.reducer;
