import { closestCenter, pointerWithin, rectIntersection, getFirstCollision, CollisionDetection, UniqueIdentifier } from "@dnd-kit/core";
import { Items } from "../types";
import { TRASH_ID } from "@/lib/constants";

/**
 * Custom collision detection strategy optimized for multiple containers
  *
  * - First, find any droppable containers intersecting with the pointer.
  * - If there are none, find intersecting containers with the active draggable.
  * - If there are no intersecting containers, return the last matched intersection
  *
*/
export const collisionDetectionStrategy = (
  args: Parameters<CollisionDetection>[0],
  activeId: UniqueIdentifier | null,
  lastOverId: React.MutableRefObject<UniqueIdentifier | null>,
  items: Items,
  recentlyMovedToNewContainer: React.MutableRefObject<boolean> | null
) => {

  if (recentlyMovedToNewContainer == null) {
    console.error('recentlyMovedToNewContainer is null! Was it set correctly with useRef?');
    return [];
  }

  if (activeId && activeId in items) {
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter(
        (container) => container.id in items
      ),
    });
  }

  // Start by finding any intersecting droppable
  const pointerIntersections = pointerWithin(args);
  const intersections =
    pointerIntersections.length > 0
      ? // If there are droppables intersecting with the pointer, return those
      pointerIntersections
      : rectIntersection(args);
  let overId = getFirstCollision(intersections, "id");

  if (overId != null) {
    if (overId === TRASH_ID) {
      // If the intersecting droppable is the trash, return early
      // Remove this if you're not using trashable functionality in your app
      return intersections;
    }

    if (overId in items) {
      const containerItems = items[overId];

      // If a container is matched and it contains items (columns 'A', 'B', 'C')
      if (containerItems.length > 0) {
        // Return the closest droppable within that container
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) =>
              container.id !== overId &&
              containerItems.includes(container.id)
          ),
        })[0]?.id;
      }
    }

    lastOverId.current = overId;

    return [{ id: overId }];
  }

  // When a draggable item moves to a new container, the layout may shift
  // and the `overId` may become `null`. We manually set the cached `lastOverId`
  // to the id of the draggable item that was moved to the new container, otherwise
  // the previous `overId` will be returned which can cause items to incorrectly shift positions
  if (recentlyMovedToNewContainer.current) {
    lastOverId.current = activeId;
  }

  // If no droppable is matched, return the last match
  return lastOverId.current ? [{ id: lastOverId.current }] : [];
}
