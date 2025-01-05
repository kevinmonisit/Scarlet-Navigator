'use client';

import { MiddlePanel } from '@/app/features/middlePanel/MiddlePanel';
import { coordinateGetter } from '@/app/features/middlePanel/dashboard/components/multipleContainersKeyboardCoordinates';
import { collisionDetectionStrategy as detectionStrategy } from '@/app/features/middlePanel/dashboard/helpers/logic';
import useDragHandlers from '@/app/features/middlePanel/dashboard/helpers/hooks/useDragHandlers';
import useAuxiliaryStore from '@/lib/hooks/stores/useAuxiliaryStore';
import { useScheduleStore } from '@/lib/hooks/stores/useScheduleStore';
import { CoursesBySemesterID } from '@/types/models';
import { CollisionDetection, DndContext, KeyboardSensor, MeasuringStrategy, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import LeftPanel from '@/app/features/leftPanel/LeftPanel';
import RightPanel from '@/app/features/rightPanel/RightPanel';

const Page: React.FC = () => {

  const scheduleState = useScheduleStore();
  const {
    setRecentlyMovedToNewContainer,
    recentlyMovedToNewContainer,
    activeID,
  } = useAuxiliaryStore((state) => {
    return {
      recentlyMovedToNewContainer: state.recentlyMovedToNewContainer,
      setRecentlyMovedToNewContainer: state.setRecentlyMovedToNewContainer,
      activeID: state.activeID,
      setActiveID: state.setActiveID,
    }
  });

  const recentlyMovedToNewContainerInstance = useRef(false);

  useEffect(() => {
    setRecentlyMovedToNewContainer(recentlyMovedToNewContainerInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const [clonedItems, setClonedItems] = useState<CoursesBySemesterID | null>(null);

  const {
    coursesBySemesterID,
  } = scheduleState;

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useDragHandlers(
    clonedItems,
    setClonedItems,
  );

  const sensorOptions = {
    activationConstraint: {
      distance: 5,
    },
  }

  const sensors = useSensors(
    useSensor(MouseSensor, sensorOptions),
    useSensor(TouchSensor, sensorOptions),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => detectionStrategy(
      args,
      activeID,
      lastOverId,
      coursesBySemesterID,
      recentlyMovedToNewContainer
    ),
    [activeID, coursesBySemesterID, recentlyMovedToNewContainer]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <h1>Dashboard Page Test</h1>
      <div className="bg-gray-100 w-full h-screen flex flex-row">
        <LeftPanel />
        <MiddlePanel />
        <RightPanel />
      </div>
    </DndContext>
  );
};

export default Page;
