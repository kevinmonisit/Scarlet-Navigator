/* eslint-disable no-unused-vars */
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { ExpandMore, ChevronRight, CheckCircleOutlineSharp, CheckCircleSharp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import CustomToolTip from '../../components/CustomToolTip';
import { CoreStateInterface, SAS_CORES } from '../../interfaces/CoreFulfillmentInterface';

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

interface RequirementsInterface {
  [SASRequirement: string]: {
    cores: SAS_CORES[],
  }
}

const requirementsDefaultState: RequirementsInterface = {
  'Areas of Inquiry': {
    cores: [SAS_CORES.CCD, SAS_CORES.NS, SAS_CORES.WC],
  },
  'Areas of Inquiryt': {
    cores: [SAS_CORES.CCD, SAS_CORES.NS, SAS_CORES.WC],
  }
};

interface RequirementsProps {
  coreFulfillmentState: CoreStateInterface;
}

function Requirements(props: RequirementsProps) {
  const { coreFulfillmentState } = props;
  const [requirementState, setRequirementState] = useState<RequirementsInterface>({
    ...requirementsDefaultState
  });

  const requirementCompletedCount = {};

  const setRequirementCompleteCountToState = () => {
    Object.keys(requirementCompletedCount).forEach((title) => {

    });
  };

  useEffect(() => {
    setRequirementCompleteCountToState();
  }, [requirementState]);

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
            Object.keys(requirementState).map((requirementTitle, index) => {
              requirementCompletedCount[requirementTitle] = 0;
              return (
                <div className="relative">
                  <TreeItem nodeId={index.toString()} label={requirementTitle} className="relative">
                    {
                      requirementState[requirementTitle].cores.map((coreCode) => {
                        if (!Object.prototype.hasOwnProperty.call(coreFulfillmentState, coreCode)) {
                          console.warn(`
                          Invalid core code ${coreCode} under requirement
                          ${requirementTitle}. Will not render.`);
                          // eslint-disable-next-line react/jsx-no-useless-fragment
                          return <></>;
                        }
                        const { coreTitle,
                          creditsFulfilled,
                          creditsNeededForFulfillment } = coreFulfillmentState[coreCode];
                        const fulfilled = creditsFulfilled >= creditsNeededForFulfillment;
                        const label = coreCode;
                        // let courseThatFulfillsReq = '';
                        if (fulfilled) {
                          requirementCompletedCount[requirementTitle] += 1;
                          // eslint-disable-next-line max-len
                          // const courseArray = coreFulfillmentState[requirementTitle].coursesThatFulfill;
                          // THIS IS A MESS
                          // courseThatFulfillsReq = course;
                          // label.concat(`. Satisfied by ${courseThatFulfillsReq}`);
                        }

                        return (
                          <div>
                            <CustomToolTip title={coreTitle} placement="left">
                              <TreeItem
                                nodeId={coreCode}
                                label={label}
                                endIcon={fulfilled && <CheckCircleSharp htmlColor="#374151" fontSize="inherit" />}
                              />
                            </CustomToolTip>
                          </div>
                        );
                      })
                    }
                  </TreeItem>
                  <span className="absolute right-1 top-0 text-base">
                    {requirementCompletedCount[requirementTitle].completed}
                    /
                    {requirementState[requirementTitle].cores.length}
                  </span>
                </div>
              );
            })
          }
        </TreeView>
      </div>
    </div>
  );
}

export default Requirements;
