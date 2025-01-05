import { UniqueIdentifier } from "@dnd-kit/core";
import { unstable_batchedUpdates } from "react-dom";
import { useScheduleStore } from "@/lib/hooks/stores/useScheduleStore";

export default function useScheduleHandlers() {

  const items = useScheduleStore((state) => state.coursesBySemesterID);
  const containers = useScheduleStore((state) => state.semesterOrder);
  const setSemesterOrder = useScheduleStore((state) => state.setSemesterOrder);
  const setCoursesBySemesterID = useScheduleStore((state) => state.setCoursesBySemesterID);
  const ___TEMP___populate = useScheduleStore((state) => state.___TEMP___populate);
  const _reset_ = useScheduleStore((state) => state.______reset______);

  const handleAddColumn = () => {
    // indexDB.setSchedule(createDummySchedule());
    // const newContainerId = getNextContainerId(items);
    console.log('handleAddColumn');
    unstable_batchedUpdates(() => {
      _reset_();
      ___TEMP___populate();
      // setSemesterOrder([...containers, newContainerId]);
      // setCoursesBySemesterID({
      //   ...items,
      //   [newContainerId]: [],
      // });
    });
  }

  const handleRemove = (
    containerID: UniqueIdentifier,
  ) => {
    setSemesterOrder(containers.filter((id) => id !== containerID));
  }

  const handleRemoveCourse = (
    courseID: UniqueIdentifier,
    containerID: UniqueIdentifier,
  ) => {
    console.log('handleRemoveCourse');
    const newItems = {
      ...items,
      [containerID]: items[containerID].filter((id) => id !== courseID),
    };

    setCoursesBySemesterID(newItems);
  }

  return {
    handleRemove,
    handleRemoveCourse,
    handleAddColumn,
  }
}