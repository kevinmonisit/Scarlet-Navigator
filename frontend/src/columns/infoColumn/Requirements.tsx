/* eslint-disable no-unused-vars */
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import React from 'react';
import CustomToolTip from '../../components/CustomToolTip';

// interface CoreSpecifications {
//   title: string;
//   credits: number;
// }

// interface Goal {
//   [coreCode: string]: CoreSpecifications;
// }

// interface RequirementsInterface {
//   [goal: string]: Goal;
// }

const requirementss = {
  'Contemporary Challenges': {
    CCD: {
      title: 'Diversities and Social Inequalities',
      credits: 3
    },
    CCO: {
      title: 'Our Common Future',
      credits: 3
    }
  },
  'Areas of Inquiry': {
    NS: {
      title: 'Natural Sciences',
      credits: 6
    },
    HST: {
      title: 'Historical Analysis',
      credits: 3
    },
    SCL: {
      title: 'Social Analysis',
      credits: 3
    },
    AH: {
      title: 'Arts and Humanities',
      credits: 3
    }
  },
  'Cognitive Skills and Processes': {

  }
};

/**
 * 1. Initialize an object/state that records core fulfillment (core-state)
 * 2. Loop through entire array of courses in the plan
 * 3. If not already present, add to the core-state a core that the course fulfills and the credits
 * it has
 *
 * For example:
 * {
 *  HST: 3,
 *  SCL: 3,
 *  ... and so on.
 * }
 *
 * const requirements = {
 *  'Areas of Inquiry': [CCD, CCO]
 * }
 *
 * ^^ just get from the object.
 *
 */

// eslint-disable-next-line no-shadow
enum SAS_CORES {
  CCD = 'CCD',
  CCO = 'CCO',
  NS = 'NS',
  HST = 'HST',
  SCL = 'SCL',
  AH = 'AH'
}

interface RequirementsInterface {
  [SASRequirement: string]: SAS_CORES[]
}

interface CoreStateInterface {
  [core: string]: {
    creditsToFulfillment: number;
    creditsFulfilled: number;
    code: string;
    coreTitle: string;
  }
}

const coreState: CoreStateInterface = {
  [SAS_CORES.CCD]: {
    creditsToFulfillment: 3,
    creditsFulfilled: 0,
    code: 'CCD',
    coreTitle: 'Diversities and Social Inequalities'
  },
  [SAS_CORES.NS]: {
    creditsToFulfillment: 3,
    creditsFulfilled: 0,
    code: 'NS',
    coreTitle: 'Natural Sciences'
  }
};

const requirements: RequirementsInterface = {
  'Areas of Inquiry': [SAS_CORES.CCD, SAS_CORES.NS]
};

function Requirements() {
  return (
    <div
      className="h-full w-full flex flex-col px-2"
    >
      <div className="text-2xl font-semibold pr-2 italic">
        <span className="font-normal">Core Curriculum</span>
        {' '}
        <br />
        School of Arts and Sciences
      </div>
      <div className="pr-2 my-4">
        The School of Arts and Sciences (SAS) requires that all
        students complete a goal-based Core Curriculum.
      </div>
      <div>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
          {
            Object.keys(requirements).map((requirementTitle, index) => (
              <TreeItem nodeId={index.toString()} label={requirementTitle}>
                {requirements[requirementTitle].map((coreCode) => {
                  if (!(coreCode in coreState)) {
                    console.warn(`
                    Invalid core code ${coreCode} under requirement
                    ${requirementTitle}. Will not render.`);
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    return <></>;
                  }
                  const { coreTitle } = coreState[coreCode];
                  return (
                    <CustomToolTip title={coreTitle} placement="left">
                      <TreeItem nodeId={coreCode} label={coreCode} />
                    </CustomToolTip>
                  );
                })}
              </TreeItem>
            ))
          }
        </TreeView>
      </div>
    </div>
  );
}

export default Requirements;
