'use client';

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  CancelDrop,
  DragOverlay,
  Modifiers,
  UniqueIdentifier,
  KeyboardCoordinateGetter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  SortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { coordinateGetter as multipleContainersCoordinateGetter } from "./components/multipleContainersKeyboardCoordinates";
import SortableItem from "./components/SortableItem";
import { getColor, dropAnimation } from "./helpers/utilities";
import useOverlayComponents from "./helpers/hooks/useOverlayComponents";
import DroppableContainer from "./components/DroppableContainer";
import { useScheduleStore } from "@/lib/hooks/stores/useScheduleStore";
import useAuxiliaryStore from "@/lib/hooks/stores/useAuxiliaryStore";
import useScheduleHandlers from "./helpers/hooks/useScheduleHandlers";
import { EMPTY, PLACEHOLDER_ID } from "@/lib/constants";
import { CoursesBySemesterID } from "@/types/models";

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  itemCount?: number;
  items?: CoursesBySemesterID;
  handle?: boolean;
  renderItem?: any;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

export function ScheduleBoard({
  adjustScale = false,
  itemCount = 3,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false,
  scrollable,
}: Props) {

  const semesterOrder = useScheduleStore((state) => state.semesterOrder);
  const coursesBySemesterID = useScheduleStore((state) => state.coursesBySemesterID);

  const { recentlyMovedToNewContainer, activeID } = useAuxiliaryStore((state) => {
    return {
      recentlyMovedToNewContainer: state.recentlyMovedToNewContainer,
      activeID: state.activeID,
      setActiveID: state.setActiveID,
    }
  });

  const isSortingContainer = activeID ? semesterOrder.includes(activeID) : false;
  const {
    renderContainerDragOverlay,
    renderSortableItemDragOverlay
  } = useOverlayComponents(
    coursesBySemesterID,
    handle,
    renderItem,
    getColor,
    getItemStyles,
    wrapperStyle,
  );

  const {
    handleAddColumn,
    handleRemove,
  } = useScheduleHandlers();

  useEffect(() => {
    requestAnimationFrame(() => {
      if (recentlyMovedToNewContainer == null) {
        console.error('recentlyMovedToNewContainer is null! Was it set correctly with useRef?');
        return;
      }

      console.log('recentlyMovedToNewContainer.current', recentlyMovedToNewContainer.current);

      recentlyMovedToNewContainer.current = false;
    });
  }, [coursesBySemesterID, recentlyMovedToNewContainer]);

  return (
    <>
      <div
        style={{
          display: "inline-grid",
          boxSizing: "border-box",
          padding: 20,
          gridAutoFlow: vertical ? "row" : "column",
        }}
      >
        <SortableContext
          items={[...semesterOrder, PLACEHOLDER_ID]}
          strategy={rectSortingStrategy}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "900px",
              margin: "100px auto",
            }}
          >
            {semesterOrder.map((containerId) => (
              <DroppableContainer
                key={containerId}
                id={containerId}
                label={minimal ? undefined : `Column ${containerId}`}
                columns={columns}
                items={coursesBySemesterID[containerId]}
                scrollable={scrollable}
                style={containerStyle}
                unstyled={minimal}
                onRemove={() => handleRemove(containerId)}
              >
                <SortableContext items={coursesBySemesterID[containerId]} strategy={strategy}>
                  {coursesBySemesterID[containerId].map((value, index) => {

                    return (
                      <SortableItem
                        disabled={isSortingContainer}
                        key={value}
                        id={value}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        renderItem={renderItem}
                        containerId={containerId}
                        getIndex={(id) => {
                          return 0;
                        }}
                      />
                    );
                  })}
                </SortableContext>
              </DroppableContainer>
            ))}
            {minimal ? undefined : (
              <DroppableContainer
                id={PLACEHOLDER_ID}
                disabled={isSortingContainer}
                items={EMPTY}
                onClick={handleAddColumn}
                placeholder
              >
                + Add column
              </DroppableContainer>
            )}
          </div>
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeID
            ? semesterOrder.includes(activeID)
              ? renderContainerDragOverlay(activeID)
              : renderSortableItemDragOverlay(activeID)
            : null}
        </DragOverlay>,
        document.body
      )}
    </>
  );
}
