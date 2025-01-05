import { UniqueIdentifier } from '@dnd-kit/core';
import React from 'react';
import { Container, Item } from '../../components/ui';
import { findContainer, getIndex } from '../utilities';
import { CoursesBySemesterID } from '@/types/models';
import { useScheduleStore } from '@/lib/hooks/stores/useScheduleStore';

export const COLUMNS_DEPRECATED_DO_NOT_USE = 5;

export default function useOverlayComponents(
  items: CoursesBySemesterID,
  handle: boolean,
  renderItem: () => React.ReactElement,
  getColor: (id: UniqueIdentifier) => string | undefined,
  getItemStyles: (args: any) => React.CSSProperties,
  wrapperStyle: (args: any) => React.CSSProperties,
) {
  const courses = useScheduleStore((state) => state.courses);

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    const courseName = courses[id]?.name ?? "Loading...";
    return (
      <Item
        id={id}
        value={courseName}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(items, id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(items, id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        color={getColor(id)}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(
    containerId: UniqueIdentifier,
  ) {
    return (
      <Container
        label={`Column ${containerId}`}
        columns={1}
        style={{
          height: "100%",
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((id) => {
          const courseName = courses[id]?.name ?? "Loading...";
          return (
            <Item
              id={id}
              key={id}
              value={courseName}
              handle={handle}
              style={getItemStyles({
                containerId,
                overIndex: -1,
                index: getIndex(items, id),
                value: id,
                isDragging: false,
                isSorting: false,
                isDragOverlay: false,
              })}
              color={getColor(id)}
              wrapperStyle={wrapperStyle({ index: 1 })}
              renderItem={renderItem}
            />
          )
        })}
      </Container>
    );
  }



  return {
    renderSortableItemDragOverlay,
    renderContainerDragOverlay,
  }
}



