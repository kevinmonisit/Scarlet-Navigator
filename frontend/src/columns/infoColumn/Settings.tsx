import { Select, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import NumberMenu from '../../components/NumberMenu';
import SettingButton from '../../components/SettingButton';
import SettingsCheckBox from '../../components/SettingsCheckbox';
import { Settings as SettingsInterface, Month, defaultSettings } from '../../interfaces/Settings';

interface SettingsProps {
  // eslint-disable-next-line no-unused-vars
  changeSettings: (newSettings: SettingsInterface) => void;
  resetPlan: () => void;
  settings: SettingsInterface;
}

function Settings(props: SettingsProps) {
  // eslint-disable-next-line no-unused-vars
  const { changeSettings, resetPlan, settings } = props;

  const handleSettingsChange = (newValue: string | number | boolean, key: string) => {
    if (!(key in settings)) {
      console.warn(`A setting of key ${key} does not exist in settings prop`);
      return;
    }

    changeSettings({
      ...settings,
      [key]: newValue
    });
  };

  // eslint-disable-next-line no-unused-vars
  const resetSettings = () => {
    changeSettings({ ...defaultSettings });
  };

  return (
    <div className="grow p-2 w-full select-none">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center w-full">
          <FormControl size="small" fullWidth>
            <InputLabel id="start-season">Starting Season</InputLabel>
            <Select
              labelId="start-season"
              // id="demo-simple-select"
              value={settings.startingSeason}
              label="Starting Season"
              onChange={(e) => {
                handleSettingsChange(e.target.value, 'startingSeason');
              }}
            >
              <MenuItem value={Month.FALL}>Fall</MenuItem>
              <MenuItem value={Month.SPRING}>Spring</MenuItem>
              <MenuItem value={Month.SUMMER} disabled>Summer</MenuItem>
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
                console.log(e.target.value);
                handleSettingsChange(e.target.value, 'startingYear');
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
          <TextField
            id="outlined-number"
            label="Number of Semesters"
            type="number"
            size="small"
            value={settings.numberOfSemesters}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value as unknown as number;
              if (value > 16 || value < 1) return;
              handleSettingsChange(value, 'numberOfSemesters');
            }}
            sx={{
              width: '100%',
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl size="small" fullWidth>
            <InputLabel id="starting-credits">Starting Credits</InputLabel>
            <Select
              labelId="starting-credits"
              value={settings.startingCredits}
              label="Starting Credits"
              size="small"
              onChange={(e) => {
                console.log(e.target.value);
                handleSettingsChange(e.target.value, 'startingCredits');
              }}
              sx={{
                width: '100%'
              }}
              MenuProps={{
                style: {
                  maxHeight: 200
                }
              }}
            >
              {[...Array(121).keys()].map((startingCredits) => (
                <MenuItem key={`startingCredit-${startingCredits}`} value={startingCredits}>{startingCredits}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <Box sx={{ height: '1.5rem' }} />
      <FormGroup>
        <SettingsCheckBox
          settingName="enableMinimumCreditErrors"
          labelName="Enable minimum credit errors"
          toolTip="Show"
          handleSettingsChange={handleSettingsChange}
          checked={settings.enableMinimumCreditErrors}
        />
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Include summer semesters"
        />
        <Tooltip
          title="Experimental tab for planning out computer science major requirements"
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

      <div className="flex flex-col w-full h-full">
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
            range={40}
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

      {/* TODO: Rewrite code to look better  */}

      <div className="flex flex-col w-full h-full">
        <SettingsCheckBox
          settingName="showNumberInsteadOfTitle"
          labelName="Show Course Numbers"
          toolTip="Show things"
          checked={settings.showNumberInsteadOfTitle}
          handleSettingsChange={handleSettingsChange}
        />
        <SettingsCheckBox
          settingName="prerequisiteValidationEnabled"
          labelName="Prerequisite validation enabled"
          toolTip="Show things"
          checked={settings.prerequisiteValidationEnabled}
          handleSettingsChange={handleSettingsChange}
        />
        <SettingsCheckBox
          settingName="showCourseCredits"
          labelName="Show course credits"
          toolTip="Show things"
          checked={settings.showCourseCredits}
          handleSettingsChange={handleSettingsChange}
        />
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Turn on experimental course colors"
          disabled
        />
        <div className="w-full items-center flex flex-col mt-1">
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
              resetSettings();
              resetPlan();
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
