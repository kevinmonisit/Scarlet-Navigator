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
  [SASRequirement: string]: SAS_CORES[]
}

interface RequirementCountsInterface {
  [SASRequirement: string]: number;
}

interface RequirementsProps {
  coreFulfillmentState: CoreStateInterface;
}

const requirementInfo: RequirementsInterface = {
  'Areas of Inquiry': [SAS_CORES.CCD, SAS_CORES.NS, SAS_CORES.WC],
  'Areas of Inquiryt': [SAS_CORES.CCD, SAS_CORES.NS, SAS_CORES.WC]
};

function Requirements(props: RequirementsProps) {
  const { coreFulfillmentState } = props;
  const [requirementCounts, setRequirementCounts] = useState<RequirementCountsInterface>({});

  const getCompletionFraction = (requirementTitle: string) => {
    let numerator = 0;
    if (requirementCounts && requirementCounts[requirementTitle]) {
      numerator = requirementCounts[requirementTitle];
    }

    return `${numerator}/${requirementInfo[requirementTitle].length}`;
  };

  useEffect(() => {
    if (!coreFulfillmentState) return;

    const countingCompletedCores = {};
    Object.keys(requirementInfo).forEach((reqTitle) => {
      let counter = 0;

      for (let i = 0; i < requirementInfo[reqTitle].length; i += 1) {
        const coreCode = requirementInfo[reqTitle][i];
        if (Object.prototype.hasOwnProperty.call(coreFulfillmentState, coreCode)) {
          const { creditsFulfilled, creditsNeededForFulfillment } = coreFulfillmentState[coreCode];
          if (creditsFulfilled >= creditsNeededForFulfillment) {
            counter += 1;
          }
        }
      }

      countingCompletedCores[reqTitle] = counter;
    });

    setRequirementCounts(countingCompletedCores);
  }, [coreFulfillmentState]);

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
            Object.keys(requirementInfo).map((requirementTitle, index) => (
              <div className="relative">
                <TreeItem nodeId={index.toString()} label={requirementTitle} className="relative">
                  {
                    requirementInfo[requirementTitle].map((coreCode) => {
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
                  {getCompletionFraction(requirementTitle)}
                </span>
              </div>
            ))
          }
        </TreeView>
      </div>
    </div>
  );
}

export default Requirements;
