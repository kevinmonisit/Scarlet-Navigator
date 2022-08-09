import { Select, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import NumberMenu from '../../../components/NumberMenu';
import SettingButton from '../../../components/SettingButton';
import SettingsCheckBox from '../../../components/SettingsCheckbox';
import { defaultSettings, Season } from '../../../interfaces/Settings';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { generateBlankPlan } from '../../../logic/handlePlan';
import { selectCurrentSettings, changeSetting, setSettings, selectCurrentPlanIndex, setPlanIndex } from '../../../redux/slices/settingsSlice';
import { setPlan } from '../../../redux/slices/planSlice';

function Settings() {
  const settings = useAppSelector(selectCurrentSettings);
  const planIndex = useAppSelector(selectCurrentPlanIndex);
  const useDispatch = useAppDispatch();

  const handleSettingsChange = (newValue: Season | number | boolean, key: string) => {
    if (!(key in settings)) {
      console.warn(`A setting of key ${key} does not exist in settings prop`);
      return;
    }
    useDispatch(changeSetting({
      key,
      newValue,
    }));
  };

  const resetPlan = () => {
    const blankPlan = generateBlankPlan();
    useDispatch(setPlan(blankPlan));
  };

  const resetSettings = () => {
    useDispatch(setSettings({
      ...defaultSettings,
    }));
  };

  return (
    <div className="h-full p-2 w-full select-none">
      <div className="mb-4">
        <NumberMenu
          value={planIndex}
          range={3}
          labelName="Plan Save Number"
          settingName="planIndex"
          handleSettingsChange={(value) => {
            if (value > 3 || value < 0) {
              console.warn(`Plan index ${value} does not exist`);
              return;
            }
            useDispatch(setPlanIndex(value));
          }}
          toolTip="Choose one of multiple plans you can save."
          offSetOne
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full space-y-0">
        <div className="flex flex-row items-center w-full">
          <FormControl size="small" fullWidth>
            <InputLabel id="start-season">Starting Season</InputLabel>
            <Select
              labelId="start-season"
              value={settings.startingSeason}
              label="Starting Season"
              onChange={(e) => {
                handleSettingsChange(e.target.value as Season, 'startingSeason');
              }}
            >
              <MenuItem value={Season.FALL}>Fall</MenuItem>
              <MenuItem value={Season.SPRING}>Spring</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel id="select-year">Start Year</InputLabel>
            <Select
              labelId="select-year"
              id="select-year"
              value={settings.startingYear}
              label="Start Year"
              onChange={(e) => {
                handleSettingsChange(e.target.value as number, 'startingYear');
              }}
            >
              <MenuItem value={2017}>2017</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Box sx={{
          height: '1.5rem'
        }}
        />
        <div className="flex flex-row items-center w-full">
          <NumberMenu
            value={settings.numberOfSemesters}
            range={24}
            labelName="Number of Semesters"
            settingName="numberOfSemesters"
            handleSettingsChange={handleSettingsChange}
            toolTip="Total number of semesters to display on the dashboard"
            offSetOne
          />
          <NumberMenu
            value={settings.startingCredits}
            range={121}
            labelName="Starting Credits"
            settingName="startingCredits"
            handleSettingsChange={handleSettingsChange}
            toolTip="Credits going into freshman year"
            includeHalfSteps
          />
        </div>
      </div>

      <Box sx={{ height: '1.5rem' }} />
      <FormGroup>
        <SettingsCheckBox
          settingName="enableMinimumCreditErrors"
          labelName="Show semester errors"
          toolTip="If a semester doesn't reach the minimum or exceeds the maximum # of credits,
          an error is shown."
          handleSettingsChange={handleSettingsChange}
          checked={settings.enableMinimumCreditErrors}
        />
        <SettingsCheckBox
          settingName="includeSummerSemesters"
          labelName="Include summer semesters"
          toolTip="Offset seasons and include summers."
          checked={settings.includeSummerSemesters}
          handleSettingsChange={handleSettingsChange}
        />
        <Tooltip
          title="Experimental tab for planning out computer science major requirements. Coming soon. Stay tuned!"
          enterDelay={500}
          enterNextDelay={300}
          arrow
          placement="left"
        >
          <FormControlLabel
            control={<Checkbox size="small" disabled />}
            label="Enable requirement tab (CS)"
          />
        </Tooltip>
      </FormGroup>

      <Divider textAlign="center" sx={{ marginY: 2 }}>Advanced Settings</Divider>

      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <NumberMenu
            value={settings.minCredits}
            range={15}
            labelName="Min Credits"
            settingName="minCredits"
            handleSettingsChange={handleSettingsChange}
            toolTip="Minimum credits per semester"
          />
          <NumberMenu
            value={settings.maxCredits}
            range={25}
            labelName="Max Credits"
            settingName="maxCredits"
            handleSettingsChange={handleSettingsChange}
            toolTip="Maximum credits per semester"
          />
        </div>
        <div className="flex flex-row w-full mt-4">
          <NumberMenu
            value={settings.maxSearchQuery}
            range={20}
            labelName="Max Search Query"
            settingName="maxSearchQuery"
            handleSettingsChange={handleSettingsChange}
            toolTip="Maximum number of courses shown in search. Keep it low if your computer cannot handle it."
            offSetOne
          />
          <NumberMenu
            value={settings.creditsNeededToGraduate}
            range={150}
            labelName="Graduation req"
            settingName="creditsNeededToGraduate"
            handleSettingsChange={handleSettingsChange}
            toolTip="Number of credits needed for graduation."
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <SettingsCheckBox
          settingName="showNumberInsteadOfTitle"
          labelName="Show Course Numbers"
          toolTip="Display course numbers instead of course titles"
          checked={settings.showNumberInsteadOfTitle}
          handleSettingsChange={handleSettingsChange}
        />
        <SettingsCheckBox
          settingName="showCourseCredits"
          labelName="Show course credits"
          toolTip="Display number of credits of each course"
          checked={settings.showCourseCredits}
          handleSettingsChange={handleSettingsChange}
        />
        <SettingsCheckBox
          settingName="prerequisiteValidationEnabled"
          labelName="Prerequisite validation enabled"
          toolTip="Feature coming soon! Stay tuned."
          checked={settings.prerequisiteValidationEnabled}
          handleSettingsChange={handleSettingsChange}
          disabled
        />
        <div className="w-full items-center flex flex-col my-2">
          <SettingButton
            handleConfirmation={resetPlan}
            buttonLabel="Reset Plan"
            dialogTitle="Reset your plan?"
            dialogText="All semesters will be reset and you'll start with empty semesters again.
            This action is not reversible. Do you wish to continue?"
          />
          <SettingButton
            handleConfirmation={resetSettings}
            buttonLabel="Reset settings"
            dialogTitle="Reset settings to default?"
            dialogText="All modifications to settings will be set back to their default values. Do you wish to continue?"
          />
          <SettingButton
            handleConfirmation={() => {
              resetPlan();
              resetSettings();
            }}
            buttonLabel="Reset Everything"
            dialogTitle="Reset Everything?"
            dialogText="All settings will be set back to default and your current plan will be reset.
            This action is not reversible. Do you wish to continue?"
            primary
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
