/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Course } from '../../interfaces/Course';

interface QueryState {
  courses: Course[];
}

// Define the initial state using that type
const initialState: QueryState = {
  courses: [],
};

export const queriedCoursesSlice = createSlice({
  name: 'queriedCourses',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setQueryCourseArray: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    }
  },
});

export const { setQueryCourseArray } = queriedCoursesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentQueriedCourses = (state: RootState) => state.queriedCourses.courses;

export default queriedCoursesSlice.reducer;
