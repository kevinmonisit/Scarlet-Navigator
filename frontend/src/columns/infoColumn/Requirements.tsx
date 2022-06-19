/* eslint-disable no-unused-vars */
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import React from 'react';

interface CoreSpecifications {
  title: string;
  credits: number;
}

interface Goal {
  [coreCode: string]: CoreSpecifications;
}

interface RequirementsInterface {
  [goal: string]: Goal;
}

const requirements: RequirementsInterface = {
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
          <TreeItem nodeId="1" label="Contemporary Challenges 0/2">
            <TreeItem nodeId="2" label="Calendar" />
          </TreeItem>
          <TreeItem nodeId="5" label="Cognitive Skills">
            <TreeItem nodeId="10" label="OSS" />
            <TreeItem nodeId="6" label="MUI">
              <TreeItem nodeId="8" label="index.js" />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="5" label="Areas of Inquiry">
            <TreeItem nodeId="10" label="OSS" />
            <TreeItem nodeId="6" label="MUI">
              <TreeItem nodeId="8" label="index.js" />
            </TreeItem>
          </TreeItem>
        </TreeView>
      </div>
    </div>
  );
}

export default Requirements;
