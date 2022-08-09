import React, { useEffect, useState } from 'react';
import CircleDecor from '../components/CircleDecor';
import { PlanContainer } from '../interfaces/Course';
import DisplayTab from '../interfaces/MainColumn';
import { Settings } from '../interfaces/Settings';
import MainColumn from './MainColumn';

interface Props {
  currentPlan: PlanContainer;
  settings: Settings;
}

function getLocalTabIndex() {
  const tabIndex = localStorage.getItem('display-tab');
  if (!tabIndex) {
    return DisplayTab.Home;
  }

  return tabIndex as DisplayTab;
}

function setLocalTabIndex(displayName: DisplayTab) {
  localStorage.setItem('display-tab', displayName);
}

/**
 * I went through all the trouble of making this container
 * so that I can have fancy red circles
 */

function MainColumnContainer(props: Props) {
  const { currentPlan, settings } = props;

  const [currentTab, setCurrentTab] = useState<DisplayTab>(getLocalTabIndex());
  const [mouseHover, setMouseHover] = useState<boolean>(false);
  const isHome = () => currentTab === DisplayTab.Home;
  const isPlanDisplayed = () => currentTab === DisplayTab.Plan;

  useEffect(() => {
    setLocalTabIndex(currentTab);
    setMouseHover(false);
  }, [currentTab]);

  return (
    <div
      className="w-full h-full relative"
      style={{
        overflow: 'hidden'
      }}
    >
      <MainColumn
        currentPlan={currentPlan}
        currentTab={currentTab}
        settings={settings}
        isPlanDisplayed={isPlanDisplayed}
        isHome={isHome}
        setMouseHover={setMouseHover}
        setCurrentTab={setCurrentTab}
      />
      <CircleDecor expand={mouseHover} currentTab={currentTab} />
    </div>
  );
}

export default MainColumnContainer;
