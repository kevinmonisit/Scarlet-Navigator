/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import coreFulfillmentSlice from './slices/coreFulfillmentSlice';
import courseDisplaySlice from './slices/courseDisplaySlice';
import creditTrackingSlice from './slices/creditTrackingSlice';
import planSlice from './slices/planSlice';
import queriedCoursesSlice from './slices/queriedCoursesSlice';
import settingsSlice from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    courseDisplay: courseDisplaySlice,
    plan: planSlice,
    queriedCourses: queriedCoursesSlice,
    settings: settingsSlice,
    creditTracking: creditTrackingSlice,
    coreFulfillment: coreFulfillmentSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
