/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { generateRunningCreditArray } from '../../logic/handleCredits';

// Define a type for the slice state
interface CreditState {
  runningCreditCountArray: number[];
  semesterCreditArray: number[];
  transferCredits: number;
}

const createBlankNumberArray = (length: number) => new Array(length).fill(0);

// Define the initial state using that type
const initialState: CreditState = {
  runningCreditCountArray: createBlankNumberArray(24),
  semesterCreditArray: createBlankNumberArray(24),
  transferCredits: 0,
};

interface UpdateByIndex {
  index: number;
  value: number;
}

export const creditTrackingSlice = createSlice({
  name: 'creditTracking',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSemesterCreditArrayByIndex: (state, action: PayloadAction<UpdateByIndex>) => {
      const { index, value } = action.payload;
      const totalLength = state.semesterCreditArray.length;

      if (index < 0 || index > totalLength) {
        console.error(`There was an error updating the semester credit array. Index to be updated
            was ${index} when the total length is ${totalLength}`);
      }

      state.semesterCreditArray[index] = value;
    },
    updateRunningCreditArray: (state, action: PayloadAction<{startingCredits: number}>) => {
      // eslint-disable-next-line no-unused-vars
      const { semesterCreditArray } = state;
      const { startingCredits } = action.payload;
      state.runningCreditCountArray = generateRunningCreditArray(
        semesterCreditArray,
        startingCredits
      );
    },
    setTransferCredits: (state, action: PayloadAction<number>) => {
      state.transferCredits = action.payload;
    }
  },
});

export const { updateSemesterCreditArrayByIndex, updateRunningCreditArray, setTransferCredits } = creditTrackingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSemesterCreditArray = (state: RootState) => state.creditTracking.semesterCreditArray;
export const selectRunningCreditArray = (state: RootState) => state.creditTracking.runningCreditCountArray;
export const selectTransferCredits = (state: RootState) => state.creditTracking.transferCredits;

export default creditTrackingSlice.reducer;
