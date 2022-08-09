/* eslint-disable no-unused-vars */
import TreeItem from '@mui/lab/TreeItem';
import { fontWeight } from '@mui/system';
import TreeView from '@mui/lab/TreeView';
import { ExpandMore, ChevronRight, CheckCircleOutlineSharp, CheckCircleSharp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import CustomToolTip from '../../../components/CustomToolTip';
import { CoreStateInterface, SAS_CORES } from '../../../interfaces/CoreFulfillment';
import { useAppSelector } from '../../../redux/hooks';
import { selectCoreState } from '../../../redux/slices/coreFulfillmentSlice';

interface RequirementsInterface {
  [SASRequirement: string]: SAS_CORES[];
}

interface RequirementCountsInterface {
  [SASRequirement: string]: number;
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
    SAS_CORES.QQ_QR
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
          creditsNeededForFulfillment,
          coursesThatFulfill
        } = coreFulfillmentState[coreCode];
        const fulfilled = creditsFulfilled >= creditsNeededForFulfillment;
        const label = coreCode;

        const createListOfCourses = () => coursesThatFulfill.map((course, index) => {
          if (index === coursesThatFulfill.length - 1) {
            return course;
          }
          return course.concat(', ');
        });

        const satisfiedList = coursesThatFulfill.length > 0 ? ` Satisfied by: ${createListOfCourses().join(' ')}` : '';

        return (
          <div key={coreTitle}>
            <CustomToolTip title={coreTitle.concat(satisfiedList)} placement="left">
              <TreeItem
                nodeId={coreTitle}
                label={label.concat(` (${creditsFulfilled}/${creditsNeededForFulfillment} credits)`)}
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
        className="relative"
        label={label.concat(` ${completionFraction}`)}
      >
        <RequirementSubItems
          coreCodeArray={coreCodeArray}
          coreFulfillmentState={coreFulfillmentState}
          requirementTitle={label}
        />
      </TreeItem>
      {/* <span className="absolute left-6 top-0 text-base w-fulls">
        {label}
        {' '}
        {completionFraction}
      </span> */}
    </div>
  );
}

function Requirements() {
  const coreFulfillmentState = useAppSelector(selectCoreState);
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
        <p>
          The School of Arts and Sciences (SAS) requires that all
          students complete a goal-based Core Curriculum.

        </p>
        <br />
        <p>
          Please confer with a counselor about core fulfillment. This feature
          has not been fully implemented/tested and the info may be incorrect.
        </p>
        <br />
        <p>
          If you&#39;d like to see a list of courses for each core, check out&nbsp;
          <a
            target="_blank"
            href="https://sasundergrad.rutgers.edu/degree-requirements/core"
            rel="noreferrer"
            className="underline"
          >
            this link.
          </a>
        </p>
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
                  key={requirementTitle}
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
      <br />
      <p className="text-gray-500 pr-3">
        <strong>Note</strong>
        :
        A search for courses by core fulfillment
        will be available shortly.
      </p>
    </div>
  );
}

export default Requirements;
