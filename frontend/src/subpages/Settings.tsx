import styled from '@emotion/styled';
import { Button, Grid, Select, TextField, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Settings as SettingsInterface, Month } from '../interfaces/Settings';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    arrow
    placement="right"
    enterDelay={1000}
    enterNextDelay={300}
    classes={{ popper: className }}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 150,
  },
});

interface SettingsProps {
  // eslint-disable-next-line no-unused-vars
  changeSettings: (newSettings: SettingsInterface) => void;
  settings: SettingsInterface;
}

function Settings(props: SettingsProps) {
  // eslint-disable-next-line no-unused-vars
  const { changeSettings, settings } = props;

  const handleSettingsChange = (newValue: string | number, key: string) => {
    if (!(key in settings)) {
      console.warn(`A setting of key ${key} does not exist in settings prop`);
      return;
    }

    changeSettings({
      ...settings,
      [key]: newValue
    });
  };

  return (
    <div className="grow p-2 w-full">
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
                <MenuItem value={startingCredits}>{startingCredits}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <Box sx={{ height: '1.5rem' }} />
      <FormGroup>
        <Tooltip
          title="The minimum credits per semester is 12. If enabled,
          an error will be shown to indicate a semester does not meet the
           minimum number of credits."
          enterDelay={500}
          enterNextDelay={300}
          arrow
          placement="left"
        >
          <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Disable minimum credit errors"
          />
        </Tooltip>
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
            control={<Checkbox size="small" />}
            label="Enable requirement tab (CS)"
          />
        </Tooltip>
      </FormGroup>

      <Divider textAlign="center" sx={{ marginY: 2 }}>Advanced Settings</Divider>

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row w-full">
          <CustomWidthTooltip
            title="Minimum number of credits to graduate. Default is 120 in SAS."
          >
            <TextField
              id="outlined-number"
              label="Min credits"
              type="number"
              size="small"
              value={120}
              sx={{
                width: '100%'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomWidthTooltip>
          <CustomWidthTooltip
            title="Maximum number of credits per semester until an error is shown. Default is 21."
          >
            <TextField
              id="outlined-number"
              label="Max credits"
              type="number"
              size="small"
              value={21}
              sx={{
                width: '100%'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomWidthTooltip>
        </div>
        <div className="flex flex-row w-full mt-4">
          <CustomWidthTooltip
            title="Minimum number of credits to graduate. Default is 120 in SAS."
          >
            <TextField
              id="outlined-number"
              label="Max search query"
              type="number"
              size="small"
              value={120}
              sx={{
                width: '100%'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomWidthTooltip>
          <CustomWidthTooltip
            title="Minimum number of credits per semester until an error is shown. Default is 12."
          >
            <TextField
              id="outlined-number"
              label="Graduation req."
              type="number"
              size="small"
              value={12}
              sx={{
                width: '100%'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomWidthTooltip>
        </div>
      </div>

      {/* TODO: Rewrite code to look better  */}

      <Grid container direction="column" spacing={0.2}>
        <Grid item>
          <CustomWidthTooltip
            title="Disables errors for minimum or maximum number of credits per semester."
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Disable all credit requirements"
            />
          </CustomWidthTooltip>
        </Grid>
        <Grid item>

          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Disable prerequisite validation"
          />

        </Grid>
        <Grid item>

          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Show course numbers instead of shortened title"
          />

        </Grid>
        <Grid item>
          <CustomWidthTooltip
            title="When the search is blank, the first 100 random courses are shown.
            When checked, all courses will show. Only check if your computer can handle it."
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Show all courses when search is blank"
            />
          </CustomWidthTooltip>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Show credits in courses"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Disable progressive semester coloring"
          />
        </Grid>
        <Grid item>
          <h2 className="font-semibold text-lg">Experimental</h2>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Turn on experimental course titles"
            disabled
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Turn on experimental course colors"
            disabled
          />
        </Grid>
        <Grid item width="100%">
          <div className="w-full flex flex-col items-center space-y-3 my-5">
            <Grid item>
              <CustomWidthTooltip
                title="Removes all courses from semesters."
              >
                <Button variant="outlined">Reset Plan</Button>
              </CustomWidthTooltip>
            </Grid>
            <Grid item>
              <CustomWidthTooltip
                title="Reset settings to default values."
              >
                <Button variant="outlined">Reset settings</Button>
              </CustomWidthTooltip>
            </Grid>
            <Grid item>
              <CustomWidthTooltip
                title="Resets settings and removes all courses currently placed."
              >
                <Button variant="contained">Reset Everything</Button>
              </CustomWidthTooltip>
            </Grid>
          </div>

        </Grid>

      </Grid>
    </div>
  );
}

export default Settings;
