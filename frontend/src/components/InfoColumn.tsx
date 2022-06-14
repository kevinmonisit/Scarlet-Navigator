/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Settings as SettingsInterface } from '../interfaces/Settings';
import Settings from '../subpages/Settings';
import CourseInfo from '../subpages/CourseInfo';

interface InfoColumnProps {
  currentCourse: any;
  settings: SettingsInterface;
  changeSettings: (settings: SettingsInterface) => void;
}

// TODO: replace type any with the course model schema

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: 'rgb(220, 38, 38)',
  },

  marginLeft: '1rem',
  marginRight: '1rem'
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  // marginRight: theme.spacing(1),
  color: '#000',
  '&.Mui-selected': {
    color: '#000',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

function InfoColumn(props: InfoColumnProps) {
  const { currentCourse, changeSettings, settings } = props;
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (currentCourse) { setValue(0); } // automatically set to course tab
  }, [currentCourse]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-1/4 h-full flex flex-col relative">
      <div className="w-full flex justify-center">
        <Box>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="course planning tabs"
          >
            {/* <StyledTab label="Planner" /> */}
            <StyledTab label="Course" />
            <StyledTab label="Settings" />
          </StyledTabs>
          <Box sx={{ p: 0.5 }} />
        </Box>
      </div>
      <div className="w-full h-full relative">
        <div className="absolute h-full w-full">
          <div className="overflow-hidden overflow-y-scroll h-full">
            {value === 1
              ? (
                <Settings
                  changeSettings={changeSettings}
                  settings={settings}
                />
              )
              : <CourseInfo course={currentCourse} />}
          </div>
        </div>
      </div>

    </div>

  );
}

export default InfoColumn;
