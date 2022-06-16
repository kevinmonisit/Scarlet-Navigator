import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
import CustomToolTip from './CustomToolTip';

interface CheckboxProps {
  settingName: string;
  labelName: string;
  toolTip: string;
  checked: boolean;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSettingsChange: (e, settings: string) => void;
}

function SettingsCheckBox(props: CheckboxProps) {
  const
    { settingName,
      labelName, toolTip,
      handleSettingsChange, checked,
      disabled } = props;

  return (
    <CustomToolTip
      title={toolTip}
    >
      <FormControlLabel
        control={(
          <Checkbox
            size="small"
            checked={checked}
            onChange={(e) => {
              handleSettingsChange(e.target.checked, settingName);
            }}
            disabled={disabled}
          />
        )}
        label={labelName}
      />
    </CustomToolTip>
  );
}

SettingsCheckBox.defaultProps = {
  disabled: false
};

export default SettingsCheckBox;
