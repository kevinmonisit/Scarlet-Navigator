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
  // eslint-disable-next-line no-unused-vars
  handleSettingsChange: (e, setting: string) => void;
}

function NumberMenu(props: NumberMenuProps) {
  const { range,
    settingName,
    labelName,
    value,
    handleSettingsChange,
    toolTip,
  } = props;

  const id = settingName.replaceAll(' ', '-');

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
          {[...Array(range).keys()].map((number) => (
            <MenuItem key={`${settingName}-${number}`} value={number}>{number}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </CustomToolTip>
  );
}

export default NumberMenu;
