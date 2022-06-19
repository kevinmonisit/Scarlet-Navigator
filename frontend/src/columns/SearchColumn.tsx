/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Button, Chip, Fade, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Input from '@mui/material/Input';
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useCallback, useEffect, useState } from 'react';
import CourseSearchCard from '../components/CourseSearchCard';

interface CourseCardInSearch {
  title: string;
  courseString: string;
  _id: string;
  credits: number;
}

// eslint-disable-next-line no-shadow
enum SEARCH_BY {
  TITLE = 0,
  NUMBER = 1,
  EXPANDED_TITLE = 2,
}

const BASE_URL = process.env.REACT_APP_ENV === 'Production' ? process.env.REACT_APP_API_URL : '';

interface SearchColumnProps {
  showCourseCredits: boolean;
  numberOfCardsToQuery: number;
  // eslint-disable-next-line no-unused-vars
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined;
  handleCourseInfoChange(id: string): void;
  getCurrentCourseInfoDisplay: () => any;
  // eslint-disable-next-line no-unused-vars
  upstreamQuery(queryList: any);
}

function SearchColumn(props: SearchColumnProps) {
  const {
    checkIfCourseAlreadyInPlan,
    upstreamQuery,
    handleCourseInfoChange,
    getCurrentCourseInfoDisplay,
    showCourseCredits,
    numberOfCardsToQuery,

  } = props;
  const [queriedCards, setQueriedCards] = useState<CourseCardInSearch[] | null>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleCourseClick = (id: string) => {
    handleCourseInfoChange(id);
  };

  const handleSearchMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchMenuClose = () => {
    setAnchorEl(null);
  };

  const queryCourses = () => {
    // keep this in the back burner
    // if it's more performant to keep it empty
    // then do so. only when it's a problem.
    // if (value.length === 0) {
    //   setQueriedCards([]);
    //   return;
    // }

    axios.get(`${BASE_URL}/api/v1/courses`, { params: { search: value, amount: numberOfCardsToQuery } })
      .then((res) => {
        setQueriedCards(res.data.coursesQuery);
      });
  };

  useEffect(() => { upstreamQuery(queriedCards); }, [queriedCards]);
  useEffect(queryCourses, [value, numberOfCardsToQuery]);

  console.log('re render search column');

  return (
    <div className="w-2/12 h-full flex flex-col max-w-fit">
      <div
        className="flex flex-row z-50 mr-2"
        style={{
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Input
          placeholder="Search by titles"
          onChange={onChange}
          disableUnderline
          sx={{
            '& .MuiInput-input': {
              paddingLeft: '3px',
            },
            // marginRight: '1rem',
            marginLeft: '0.5rem',
          }}
        />
        <IconButton
          aria-label="show search options"
          onClick={handleSearchMenuClick}
          disableRipple
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSearchMenuClose}
        TransitionComponent={Fade}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleSearchMenuClose}>By course title</MenuItem>
        <MenuItem onClick={handleSearchMenuClose}>By course numbers</MenuItem>
        <Tooltip
          arrow
          title="Experimental: Some courses do not have an expanded title, only a shortened one."
          placement="right"
        >
          <MenuItem onClick={handleSearchMenuClose}>By expanded title if applicable</MenuItem>
        </Tooltip>
      </Menu>
      <div
        className="w-full grow relative"
      >
        <div className="absolute h-full w-full">
          <div className="w-full h-full overflow-hidden overflow-y-scroll">
            {queriedCards == null ? <>Loading search...</>
              : queriedCards.map((courseCardSearch) => {
                // React memo only runs when props change.
                // Thus, run this function outside of the search card component,
                // instead of inside the search card component.
                const checkAlreadyExists = checkIfCourseAlreadyInPlan(courseCardSearch._id);
                const courseCurrentlyDisplayedInInfoColumn = getCurrentCourseInfoDisplay();
                let isSelected = false;
                if (courseCurrentlyDisplayedInInfoColumn) {
                  const { _id } = courseCurrentlyDisplayedInInfoColumn;
                  isSelected = courseCardSearch._id === _id;
                }
                // looks like search card being re-rendered needlessly again 6/9/21
                // probably because of handleCourseInfoChange prop

                return (
                  <CourseSearchCard
                    shortTitle={courseCardSearch.title}
                    courseString={courseCardSearch.courseString}
                    key={courseCardSearch._id}
                    courseId={courseCardSearch._id}
                    alreadyInPlan={checkAlreadyExists}
                    handleCourseInfoChange={handleCourseClick}
                    isCurrentlySelected={isSelected}
                    showCourseCredits={showCourseCredits}
                    credits={courseCardSearch.credits}
                  />
                );
              })}
            {queriedCards && queriedCards!.length >= 100 && (
              <div className="w-full flex justify-center mt-1 mb-2">
                <Chip label="Showing first 100 courses" />
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default SearchColumn;
export type {
  CourseCardInSearch
};
