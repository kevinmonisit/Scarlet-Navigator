import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

function Settings() {
  const [startingSeason, setStartingSeason] = React.useState('fall');

  const handleChange = (event: SelectChangeEvent) => {
    setStartingSeason(event.target.value as string);
  };

  return (
    <div className="grow p-2">
      {/* <h1>Settings</h1> */}
      <Divider textAlign="center">Settings</Divider>
      {/* <Box sx={{ height: '0.5rem' }} /> */}
      <Box sx={{ width: 120, marginTop: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Starting Season</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={startingSeason}
            label="Starting Season"
            onChange={handleChange}
          >
            <MenuItem value="fall">Fall</MenuItem>
            <MenuItem value="spring">Spring</MenuItem>
            <MenuItem value="summer" disabled>Summer</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ height: 10 }} />
        <FormControl fullWidth size="small">
          <InputLabel id="select-year">Start Year</InputLabel>
          <Select
            labelId="select-year"
            id="select-year"
            value={startingSeason}
            label="Start Year"
            onChange={handleChange}
          >
            <MenuItem value="fall">2020</MenuItem>
            <MenuItem value="spring">2021</MenuItem>
            <MenuItem value="summer">2022</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <FormGroup>
        <Tooltip
          title="The minimum credits per semester is 12. If enabled,
          an error will be shown to indicate a semester does not meet the
           minimum number of credits."
          enterDelay={1000}
          arrow
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
      </FormGroup>
      <Divider textAlign="center" sx={{ marginY: 2 }}>Advanced Settings</Divider>
      reset,
      reset settings,
      show credits in cards,
      disable prerequisite validation,
      set credits to graduate, set starting number of credits,
      set major, max number of credits

    </div>
  );
}

export default Settings;
