import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PlanContainer } from '../interfaces/Course';
import DisplayTab from '../interfaces/MainColumn';
import { Settings } from '../interfaces/Settings';
import InfoColumn from './infoColumn/InfoColumn';
import HomePage from './mainView/Home';
import PlanDisplay from './mainView/PlanDisplay';
import TransferCoursesDisplay from './mainView/TransferCoursesDisplay';

interface Props {
  currentPlan: PlanContainer;
  settings: Settings;
}

function getLastUsedPage() {
  const tabIndex = localStorage.getItem('display-tab');
  if (!tabIndex) {
    return DisplayTab.Home;
  }

  return tabIndex as DisplayTab;
}

function setLocalTabIndex(displayName: DisplayTab) {
  localStorage.setItem('display-tab', displayName);
}

function BackButtonBar(props: { setCurrentTab: () => void }) {
  const { setCurrentTab } = props;

  return (
    <div
      className="w-full mt-1 select-none hover:underline under decoration-gray-500"
    >
      <IconButton
        onClick={() => { setCurrentTab(); }}
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
            color: 'gray.500',
            '&.MuiSvgIcon-root:hover': {
              color: 'gray.700'
            }
          }}
        />
        <span className="text-base font-semibold">Back</span>
      </IconButton>
    </div>
  );
}

function ViewControl(props: Props) {
  const { currentPlan, settings } = props;

  const [currentTab, setCurrentTab] = useState<DisplayTab>(getLastUsedPage());
  const isHome = () => currentTab === DisplayTab.Home;
  const [showInfoColumn, setShowInfoColumn] = useState(false);

  useEffect(() => {
    setLocalTabIndex(currentTab);
    setShowInfoColumn(currentTab === DisplayTab.Transfers || currentTab === DisplayTab.Plan);
  }, [currentTab]);

  return (
    <div
      className="w-full h-full relative"
      style={{
        overflow: 'hidden'
      }}
    >
      <div className="grow h-full">
        {(currentPlan == null)
          ? (
            <div className="w-full flex flex-row justify-center mt-10">
              <CircularProgress />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">

              {!isHome() && <BackButtonBar setCurrentTab={() => setCurrentTab(DisplayTab.Home)} />}

              <div className="grow w-full flex">

                {/**
                 *
                 * This controls the main "view"/page of Scarlet Navigator.
                 * The term "tab" and "page" are used interchangeably.
                 *
                 */}

                {currentTab === DisplayTab.Plan && (
                  <PlanDisplay
                    numberOfSemesters={settings.numberOfSemesters}
                  />
                )}

                {currentTab === DisplayTab.Transfers && (
                  <TransferCoursesDisplay />
                )}

                {currentTab === DisplayTab.Home && (
                  <HomePage
                    setCurrentTab={setCurrentTab}
                  />
                )}

                {showInfoColumn && (
                  <div
                    className="w-1/4 h-full flex flex-col relative z-50"
                    style={{
                      minWidth: '300px'
                    }}
                  >
                    <InfoColumn infoColumn />
                  </div>
                )}

              </div>

            </div>
          )}
      </div>
    </div>
  );
}

export default ViewControl;
