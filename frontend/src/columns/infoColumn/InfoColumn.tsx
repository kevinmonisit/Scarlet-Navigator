/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import MENU_PAGE from '../../interfaces/InfoColumn';
import Settings from './columnTabs/Settings';
import CourseInfo from './columnTabs/CourseInfo';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentCourseDisplay } from '../../redux/slices/courseDisplaySlice';
import Requirements from './columnTabs/Requirements';

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

  display: 'flex',
  width: '100%'
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(16),
  // marginRight: theme.spacing(1),
  color: '#000',
  '&.Mui-selected': {
    color: '#000',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
  padding: 0,
}));

function InfoColumn(props: { infoColumn: boolean }) {
  const [value, setValue] = useState(MENU_PAGE.CORE);
  const { infoColumn } = props;

  const currentCourse = useAppSelector(selectCurrentCourseDisplay);

  useEffect(() => {
    if (currentCourse) { setValue(MENU_PAGE.COURSE); } // automatically set to course tab
  }, [currentCourse]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full h-full flex flex-col absolute -top-9">
      <div className="w-full flex justify-center mb-2">
        <div className={`${infoColumn ? '' : 'hidden'}`}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="course planning tabs"
          >
            {/* <StyledTab label="Planner" /> */}
            <StyledTab label="Course" />
            <StyledTab label="Core" />
            <StyledTab label="Settings" />
          </StyledTabs>
        </div>
      </div>
      <div className="w-full grow relative">
        <div className="absolute h-full w-full">
          <div className="overflow-auto overflow-y-scroll h-full">
            {value === MENU_PAGE.SETTINGS
              ? (
                <Settings />
              ) : <></>}
            {(value === MENU_PAGE.COURSE)
              ? <CourseInfo course={currentCourse} /> : <></>}
            {value === MENU_PAGE.CORE
              ? <Requirements /> : <></>}
          </div>
        </div>
      </div>

    </div>

  );
}

export default InfoColumn;
