/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { defaultSettings, Settings } from '../../interfaces/Settings';

interface SettingState {
  currentSettings: Settings;
  planIndexDisplay: 1 | 2 | 3;
}

// Define the initial state using that type
const initialState: SettingState = {
  currentSettings: defaultSettings,
  planIndexDisplay: 1
};

interface setSettingsKeyAndValue {
  key: string;
  newValue: Settings[keyof Settings];
}

/**
 * TODO:
 * Perhaps change the setting keys into an enum?
 */

export const settingsSlice = createSlice({
  name: 'settings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeSetting(state, action: PayloadAction<setSettingsKeyAndValue>) {
      const { key, newValue } = action.payload;

      if (!Object.prototype.hasOwnProperty.call(state.currentSettings, key)) {
        console.error(`Key ${key} does not exist as a key in Settings.`);
        return;
      }

      if (typeof state.currentSettings[key] !== typeof newValue) {
        console.error(`Incorrect type ${typeof newValue} for key ${key} in Settings which
          is type ${typeof state.currentSettings[key]}`);
        return;
      }

      state.currentSettings[key] = newValue;
    },

    setSettings(state, action: PayloadAction<Settings>) {
      state.currentSettings = action.payload;
    },

    setPlanIndex(state, action: PayloadAction<1 | 2 | 3>) {
      state.planIndexDisplay = action.payload;
    }
  },
});

export const { changeSetting, setSettings, setPlanIndex } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentSettings = (state: RootState) => state.settings.currentSettings;
export const selectCurrentPlanIndex = (state: RootState) => state.settings.planIndexDisplay;

export default settingsSlice.reducer;
