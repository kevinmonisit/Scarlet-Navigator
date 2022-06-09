import styled from '@emotion/styled';
import { Button, Grid, TextField, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
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

function Settings() {
  const [startingSeason, setStartingSeason] = React.useState('fall');

  const handleChange = (event: SelectChangeEvent) => {
    setStartingSeason(event.target.value as string);
  };

  return (
    <div className="grow p-2 w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center w-full">
          <FormControl size="small" fullWidth>
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
          <FormControl size="small" fullWidth>
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
            value={0}
            sx={{
              width: '100%',
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-number"
            label="Starting Credits"
            type="number"
            size="small"
            value={0}
            sx={{
              width: '100%',
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
