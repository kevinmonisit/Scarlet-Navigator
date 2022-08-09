/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Course } from '../../interfaces/Course';

// Define a type for the slice state
interface CourseDisplay {
  currentCourse: Course | null
}

// Define the initial state using that type
const initialState: CourseDisplay = {
  currentCourse: null,
};

export const courseDisplaySlice = createSlice({
  name: 'courseDisplay',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeCourseDisplay: (state, action: PayloadAction<Course>) => {
      state.currentCourse = action.payload;
    },
  },
});

export const { changeCourseDisplay } = courseDisplaySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentCourseDisplay = (state: RootState) => state.courseDisplay.currentCourse;

export default courseDisplaySlice.reducer;
