/* eslint-disable no-unused-vars */
import React from 'react';
import SemesterColumn from '../../components/SemesterColumn';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentPlan } from '../../redux/slices/planSlice';

interface PlanDisplayProps {
  numberOfSemesters: number;
}

function PlanDisplay(props: PlanDisplayProps) {
  const currentPlan = useAppSelector(selectCurrentPlan);
  const {
    numberOfSemesters,
  } = props;

  return (
    <div className="w-full relative h-full">
      <div className="w-full h-full absolute overflow-y-scroll">
        <div className="justify-center w-full h-full
                       pr-3 pl-1 relative grid grid-cols-4 gap-x-3"
        >
          {
            Object.entries(currentPlan).map(([columnId, column], index) => {
              /**
               * We don't return a fragment because React will complain. So
               * we return a useless absolute <span> tag
               */
              if (index + 1 > numberOfSemesters) return <span className="absolute" key={columnId} />;

              return (
                <SemesterColumn
                  key={columnId}
                  columnId={columnId}
                  column={column}
                  index={index}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default PlanDisplay;
