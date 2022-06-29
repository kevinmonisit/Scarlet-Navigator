/* eslint-disable no-unused-vars */
import TreeItem from '@mui/lab/TreeItem';
import { fontWeight } from '@mui/system';
import TreeView from '@mui/lab/TreeView';
import { ExpandMore, ChevronRight, CheckCircleOutlineSharp, CheckCircleSharp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import CustomToolTip from '../../components/CustomToolTip';
import { CoreStateInterface, SAS_CORES } from '../../interfaces/CoreFulfillmentInterface';

interface RequirementsInterface {
  [SASRequirement: string]: SAS_CORES[];
}

interface RequirementCountsInterface {
  [SASRequirement: string]: number;
}

interface RequirementsProps {
  coreFulfillmentState: CoreStateInterface;
}

const requirementInfo: RequirementsInterface = {
  'Contemporary Challenges':
    [
      SAS_CORES.CCD,
      SAS_CORES.CCO,
    ],
  'Natural Sciences': [
    SAS_CORES.NS
  ],
  'Social and Historical Analysis': [
    SAS_CORES.HST,
    SAS_CORES.SCL,
    SAS_CORES.AH
  ],
  'Writing & Communication': [
    SAS_CORES.WC,
    SAS_CORES.WCd,
    SAS_CORES.WCr
  ],
  'Quantitative Reasoning': [
    SAS_CORES.QQ,
    SAS_CORES.QR
  ],
};

interface RequirementSubItemsInterface {
  coreCodeArray: SAS_CORES[];
  coreFulfillmentState: CoreStateInterface;
  requirementTitle: string;
}

function RequirementSubItems(props: RequirementSubItemsInterface) {
  const { coreCodeArray, coreFulfillmentState, requirementTitle } = props;
  return (
    <>
      {coreCodeArray.map((coreCode) => {
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

        // TODO ADD COURSES THAT FULFILL

        return (
          <div>
            <CustomToolTip title={coreTitle} placement="left">
              <TreeItem
                nodeId={coreCode}
                label={label.concat(` (${creditsNeededForFulfillment} credits)`)}
                endIcon={fulfilled && <CheckCircleSharp htmlColor="#374151" fontSize="inherit" />}
              />
            </CustomToolTip>
          </div>
        );
      })}
    </>
  );
}

interface TreeItemInterface {
  nodeId: number;
  label: string;
  completionFraction: string;
  coreFulfillmentState: CoreStateInterface;
  coreCodeArray: SAS_CORES[];
}

function RequirementTreeItem(props: TreeItemInterface) {
  const { nodeId, label, completionFraction, coreCodeArray, coreFulfillmentState } = props;
  return (
    <div className="relative">
      <TreeItem
        nodeId={nodeId.toString()}
        label={label}
        className="relative"
      >
        <RequirementSubItems
          coreCodeArray={coreCodeArray}
          coreFulfillmentState={coreFulfillmentState}
          requirementTitle={label}
        />
      </TreeItem>
      <span className="absolute right-1 top-0 text-base">
        {completionFraction}
      </span>
    </div>
  );
}

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
      className="h-full w-full flex flex-col px-2 grow"
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
      <div className="pb-2">
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          sx={{ height: '100%', maxWidth: 400, overflowY: 'auto' }}
        >
          {
            Object.keys(requirementInfo).map((requirementTitle, index) => {
              const fraction = getCompletionFraction(requirementTitle);
              const coresOfRequirement = requirementInfo[requirementTitle];

              return (
                <RequirementTreeItem
                  label={requirementTitle}
                  nodeId={index}
                  completionFraction={fraction}
                  coreFulfillmentState={coreFulfillmentState}
                  coreCodeArray={coresOfRequirement}
                />
              );
            })
          }
        </TreeView>
      </div>
    </div>
  );
}

export default Requirements;
