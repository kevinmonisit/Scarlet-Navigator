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
  <Tooltip {...props} classes={{ popper: className }} />
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
          enterNextDelay={300}
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

      <Grid container direction="row" spacing={2}>
        <Grid item>
          <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Show credits in courses"
          />
        </Grid>
        <Grid item>
          <CustomWidthTooltip
            title="Disables errors for minimum or maximum number of credits per semester."
            arrow
            placement="right"
            enterDelay={1000}
            enterNextDelay={300}
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
          <TextField
            id="outlined-number"
            label="Starting credits"
            type="number"
            size="small"
            value={0}
            sx={{
              width: '15ch'
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <CustomWidthTooltip
            title="Maximum number of credits per semester until an error is shown. Default is 21."
            arrow
            placement="right"
            enterDelay={1000}
            enterNextDelay={300}
          >
            <TextField
              id="outlined-number"
              label="Max credits"
              type="number"
              size="small"
              value={21}
              sx={{
                width: '15ch'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomWidthTooltip>
        </Grid>
        <Grid item>
          <CustomWidthTooltip
            title="Minimum number of credits per semester until an error is shown. Default is 12."
            arrow
            placement="right"
            enterDelay={1000}
            enterNextDelay={300}
          >
            <TextField
              id="outlined-number"
              label="Min credits"
              type="number"
              size="small"
              value={12}
              sx={{
                width: '15ch'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomWidthTooltip>
        </Grid>
        <Grid item>
          <CustomWidthTooltip
            title="Minimum number of credits to graduate. Default is 120 in SAS."
            arrow
            placement="right"
            enterDelay={1000}
            enterNextDelay={300}
          >
            <TextField
              id="outlined-number"
              label="Graduation Req."
              type="number"
              size="small"
              value={120}
              sx={{
                width: '15ch'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CustomWidthTooltip>
        </Grid>
        <Grid item width="100%">
          <Box sx={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <Grid item>
              <Button>Reset settings</Button>
            </Grid>
            <Grid item>
              <Button variant="contained">Reset Everything</Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      reset,
      reset settings,
      show credits in cards,
      disable prerequisite validation,
      set credits to graduate, set starting number of credits,
      set major, max number of credits,
      set minimum number of credits

    </div>
  );
}

export default Settings;
