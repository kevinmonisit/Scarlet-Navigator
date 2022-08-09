/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CoreStateInterface, defaultSASCoreState } from '../../interfaces/CoreFulfillment';

// Define a type for the slice state
interface CoreFulfillmentState {
  currentCoreFulfillmentState: CoreStateInterface;
}

// Define the initial state using that type
const initialState: CoreFulfillmentState = {
  currentCoreFulfillmentState: { ...defaultSASCoreState },
};

export const coreFulfillmentSlice = createSlice({
  name: 'coreFulfillmentState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCoreState: (state, action: PayloadAction<CoreStateInterface>) => {
      state.currentCoreFulfillmentState = action.payload;
    },
  },
});

export const { setCoreState } = coreFulfillmentSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCoreState = (
  state: RootState
) => state.coreFulfillment.currentCoreFulfillmentState;

export default coreFulfillmentSlice.reducer;
