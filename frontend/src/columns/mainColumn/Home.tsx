/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import DisplayTab from '../../interfaces/MainColumn';

function MainColumnItem(props: {
  title: string;
  description: string;
  tabValue: DisplayTab;
  // eslint-disable-next-line no-unused-vars
  setCurrentTab: (nextTab: DisplayTab) => void;
  // eslint-disable-next-line no-unused-vars
  setMouseHover: (value: boolean) => void;
}) {
  const { title, description, setCurrentTab, tabValue, setMouseHover } = props;

  const [temporaryDisableHoverTrigger, setTemporaryDisableHoverTrigger] = useState<boolean>(false);

  useEffect(() => {
    setTemporaryDisableHoverTrigger(false);
    /**
     * 1500ms is an estimate for how long it takes for the circles to fully
     * expand, then we enable the hover animation triggers
     */
    const delay = setTimeout(() => {
      setTemporaryDisableHoverTrigger(false);
    }, 1500);

    return () => {
      setTemporaryDisableHoverTrigger(false);
      clearTimeout(delay);
    };
  }, []);

  return (
    <div
      className="my-7"
    >
      <span
        onClick={() => { setCurrentTab(tabValue); }}
        role="button"
        tabIndex={0}
        className="text-xl font-bold hover:underline"
        onMouseEnter={() => {
          if (temporaryDisableHoverTrigger) return;
          setMouseHover(true);
        }}
        onMouseLeave={() => {
          // if (temporaryDisableHoverTrigger) return;
          setMouseHover(false);
        }}
      >
        {title}
        <br />
      </span>
      <span
        className="text-gray-500 inline-block"
        style={{
          width: '50ch'
        }}
      >
        {description}
      </span>
    </div>
  );
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  setCurrentTab: (tab: DisplayTab) => void;
  // eslint-disable-next-line no-unused-vars
  setMouseHover: (bool: boolean) => void;
}

function HomePage(props: Props) {
  const { setCurrentTab, setMouseHover } = props;

  return (
    <div className="w-full grow mt-3 ml-2 select-text pt-8 pl-10">
      <span className="text-3xl font-bold">
        Welcome to
        {' '}
        <span className={`bg-gradient-to-r bg-clip-text
              from-red-400 to-red-600 transition-all text-transparent`}
        >
          Scarlet Navigator.
        </span>
      </span>
      <div className="h-5" />
      <MainColumnItem
        title="Open Plan"
        description="See your plan and modify its settings."
        tabValue={DisplayTab.Plan}
        setCurrentTab={setCurrentTab}
        setMouseHover={setMouseHover}
      />
      <MainColumnItem
        title="Manage Transfer Courses"
        description="Manage courses you've taken before going into Rutgers."
        tabValue={DisplayTab.Transfers}
        setCurrentTab={setCurrentTab}
        setMouseHover={setMouseHover}
      />
      {/* <MainColumnItem
        title="Import from Degree Navigator"
        description="Learn how to get quickly set up with Scarlet Navigator"
        tabValue={DisplayTab.Plan}
        setCurrentTab={setCurrentTab}
        setMouseHover={setMouseHover}
      /> */}
      {/* <MainColumnItem
        title="Questions and Answers"
        description="How-to-use, road-map, etc."
        tabValue={DisplayTab.Plan}
        setCurrentTab={setCurrentTab}
        setMouseHover={setMouseHover}
      /> */}
    </div>
  );
}

export default HomePage;
