/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface CourseInfoColumnProps {
  currentCourse: any;
}

// TODO: replace type any with the course model shchema

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

function CourseInfoColumn(props: CourseInfoColumnProps) {
  const { currentCourse } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-1/4 h-full flex justify-center">
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
        <Box sx={{ p: 3 }} />
      </Box>
      {/* {
        !currentCourse
          ? <>Loading</>
          : currentCourse.title
      } */}
    </div>
  );
}

export default CourseInfoColumn;
