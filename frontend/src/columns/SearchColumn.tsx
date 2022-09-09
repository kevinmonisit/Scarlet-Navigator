import { IconButton } from '@mui/material';
import Input from '@mui/material/Input';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getApp } from 'firebase/app';
import CourseSearchCard from '../components/CourseSearchCard';
import { Course } from '../interfaces/Course';

interface CourseCardInSearch {
  title: string;
  courseString: string;
  _id: string;
  credits: number;
}

/**
 * The code that is commented out was for a search feature that had to be scrapped,
 * but will be implemented again in the near future.
 */

// enum SEARCH_BY {
//   TITLE = 0,
//   NUMBER = 1,
//   EXPANDED_TITLE = 2,
// }

interface SearchColumnProps {
  showCourseCredits: boolean;
  numberOfCardsToQuery: number;
  checkIfCourseAlreadyInPlan(id: string): boolean | undefined,
  upstreamQuery(queryList: any);
}

const searchCourses = httpsCallable(getFunctions(getApp()), 'search');

function SearchColumn(props: SearchColumnProps) {
  const {
    checkIfCourseAlreadyInPlan,
    upstreamQuery,
    showCourseCredits,
    numberOfCardsToQuery,

  } = props;
  const [queriedCards, setQueriedCards] = useState<CourseCardInSearch[] | any>([]);
  // const [searchType, setSearchType] = useState<SEARCH_BY>(SEARCH_BY.EXPANDED_TITLE);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searching, setSearching] = React.useState<boolean>(false);
  // const open = Boolean(anchorEl);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  // const handleSearchMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleSearchMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const queryCourses = async () => {
    searchCourses({ query: !value ? '' : value, amountToQuery: numberOfCardsToQuery })
      .then((result) => {
        setQueriedCards(result.data);
        setSearching(false);
      })
      .catch((error) => {
        const { code, message, details } = error;
        console.error(`Error ${code}: ${message}. Details: ${details}`);
      });

    // setQueriedCards(courses);
    // console.log(query(courseCollectionRef, limit(5)));
    // if (courses) { setQueriedCards(courses); }

    // axios.get(`${BASE_URL}/api/v1/courses`, {
    //   params: {
    //     search: value,
    //     amount: numberOfCardsToQuery,
    //     searchType
    //   }
    // })
    //   .then((res) => {
    //     setQueriedCards(res.data.coursesQuery);
    //     setSearching(false);
    //   });
  };

  useEffect(() => { upstreamQuery(queriedCards); }, [queriedCards]);
  useEffect(() => {
    setQueriedCards([]);
    setSearching(true);
    const delayDebounceFn = setTimeout(() => {
      queryCourses();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value, numberOfCardsToQuery]);

  return (
    <div className="w-2/12 h-full flex flex-col max-w-fit">
      <div
        className="flex flex-row z-50 mr-2"
        style={{
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Input
          // placeholder={`By ${getSearchByString(searchType)}`}
          placeholder="Search courses"
          onChange={onChange}
          disableUnderline
          aria-label="Search course"
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
          // onClick={handleSearchMenuClick}
          disableRipple
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSearchMenuClose}
        TransitionComponent={Fade}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Tooltip
          arrow
          title="Some courses do not have an expanded title, only a shortened one."
          placement="right"
        >
          <MenuItem onClick={() => {
            handleSearchMenuClose();
            setSearchType(SEARCH_BY.EXPANDED_TITLE);
          }}
          >
            By expanded title if applicable
          </MenuItem>
        </Tooltip>
        <MenuItem onClick={() => {
          handleSearchMenuClose();
          setSearchType(SEARCH_BY.TITLE);
        }}
        >
          By shortened course title
        </MenuItem>
        <MenuItem onClick={() => {
          handleSearchMenuClose();
          setSearchType(SEARCH_BY.NUMBER);
        }}
        >
          By course numbers
        </MenuItem>
      </Menu> */}
      <div
        className="w-full grow relative"
      >
        <div className="absolute h-full w-full">
          <div className="w-full h-full overflow-hidden overflow-y-scroll">
            {queriedCards == null || searching ? <div className="w-full h-full flex flex-row justify-center mt-20"><CircularProgress /></div>
              : queriedCards.map((courseCardSearch: Course) => {
                const checkAlreadyExists = checkIfCourseAlreadyInPlan(courseCardSearch._id);

                return (
                  <CourseSearchCard
                    courseDocument={courseCardSearch}
                    key={courseCardSearch._id}
                    alreadyInPlan={checkAlreadyExists}
                    showCourseCredits={showCourseCredits}
                  />
                );
              })}
            <div className="w-full h-3" />
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
