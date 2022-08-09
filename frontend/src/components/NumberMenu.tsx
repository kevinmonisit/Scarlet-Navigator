/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { InputLabel, Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';
import CustomToolTip from './CustomToolTip';

interface NumberMenuProps {
  range: number;
  settingName: string;
  value: string | number;
  labelName: string;
  toolTip: string;
  offSetOne?: boolean;
  includeHalfSteps?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSettingsChange: (e, setting: string) => void;
}

const createRange = (length, stepValue = 0) => {
  const array: number[] = [];
  for (let i = 0; i < length; i += stepValue) {
    array.push(i);
  }

  return array;
};

function NumberMenu(props: NumberMenuProps) {
  const { range,
    settingName,
    labelName,
    value,
    handleSettingsChange,
    toolTip,
    offSetOne,
    includeHalfSteps
  } = props;

  const id = settingName.replaceAll(' ', '-');
  // an offset so we don't have 0 as an option for queries
  const offset = offSetOne ? 1 : 0;

  return (
    <CustomToolTip
      title={toolTip}
    >
      <FormControl size="small" fullWidth>
        <InputLabel id={id}>{labelName}</InputLabel>
        <Select
          labelId={id}
          value={value}
          label={labelName}
          size="small"
          onChange={(e) => {
            handleSettingsChange(e.target.value, settingName);
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
          {[...createRange(range, includeHalfSteps ? 0.5 : 1)].map((number) => (
            <MenuItem key={`${settingName}-${number + offset}`} value={number + offset}>{number + offset}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </CustomToolTip>
  );
}

NumberMenu.defaultProps = {
  offSetOne: false,
  includeHalfSteps: false,
};

export default NumberMenu;
