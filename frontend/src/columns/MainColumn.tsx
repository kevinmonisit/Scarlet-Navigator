/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { PlanContainer } from '../interfaces/Course';
import DisplayTab from '../interfaces/MainColumn';
import { Settings } from '../interfaces/Settings';
import PlanDisplay from './mainColumn/PlanDisplay';
import TransferCoursesDisplay from './mainColumn/TransferCoursesDisplay';
import Home from './mainColumn/Home';
import InfoColumn from './infoColumn/InfoColumn';

interface MainColumnProps {
  currentPlan: PlanContainer;
  currentTab: DisplayTab;
  settings: Settings;
  isPlanDisplayed: () => boolean;
  isHome: () => boolean;
  // eslint-disable-next-line no-unused-vars
  setCurrentTab: (tab: DisplayTab) => void;
  // eslint-disable-next-line no-unused-vars
  setMouseHover: (isHoveringOverClickable: boolean) => void;
}

function MainColumn(props: MainColumnProps) {
  const {
    currentPlan,
    settings,
    // eslint-disable-next-line no-unused-vars
    isPlanDisplayed,
    isHome,
    setCurrentTab,
    currentTab,
    setMouseHover
  } = props;

  return (
    <div className="grow h-full">
      {(currentPlan == null)
        ? <div className="w-full flex flex-row justify-center mt-10"><CircularProgress /></div> : (
          <div className="w-full h-full flex flex-col">

            {!isHome() && (
              <div
                className="w-full mt-1 select-none hover:underline under decoration-gray-500"
              >
                <IconButton
                  onClick={() => { setCurrentTab(DisplayTab.Home); }}
                  sx={{
                    backgroundColor: 'transparent',
                    '&.MuiButtonBase-root:hover': {
                      backgroundColor: 'transparent'
                    },
                    paddingTop: '4px'
                  }}
                  disableRipple
                >
                  <ArrowBackIcon
                    sx={{
                      fontSize: '1.25rem',
                      stroke: 'gray',
                      strokeWidth: 0.5
                    }}
                  />
                  <span className="text-base font-semibold">Back</span>
                </IconButton>
              </div>
            )}

            <div className="grow w-full flex">
              {currentTab === DisplayTab.Plan && (
                <PlanDisplay
                  currentPlan={currentPlan}
                  numberOfSemesters={settings.numberOfSemesters}
                />
              )}

              {currentTab === DisplayTab.Transfers && (
                <TransferCoursesDisplay />
              )}

              {(currentTab === DisplayTab.Transfers || currentTab === DisplayTab.Plan) && (
                <div
                  className="w-1/4 h-full flex flex-col relative z-50"
                  style={{
                    minWidth: '300px'
                  }}
                >
                  <InfoColumn infoColumn />
                </div>
              )}

              {currentTab === DisplayTab.Home && (
                <Home
                  setCurrentTab={setCurrentTab}
                  setMouseHover={setMouseHover}
                />
              )}
            </div>
          </div>
        )}
    </div>
  );
}

export default MainColumn;
