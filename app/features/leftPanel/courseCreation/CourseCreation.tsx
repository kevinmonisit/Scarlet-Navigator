import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "../../middlePanel/dashboard/components/SortableItem";
import { useScheduleStore } from "@/lib/hooks/stores/useScheduleStore";

export const COURSE_CREATION_CONTAINER_ID = 'COURSE_CREATION_CONTAINER_ID';
export const COURSE_CREATION_COURSE_ID = '!_new_c_!';

export default function CourseCreation() {

  const coursesBySemesterID = useScheduleStore((state) => state.coursesBySemesterID);

  if (!coursesBySemesterID[COURSE_CREATION_CONTAINER_ID]) {
    return <></>;
  }

  return (
    <div>
      <h1>Course Creation</h1>
      <SortableContext
        items={coursesBySemesterID[COURSE_CREATION_CONTAINER_ID]}
        strategy={verticalListSortingStrategy}>
        {coursesBySemesterID[COURSE_CREATION_CONTAINER_ID].map((value, index) => {
          return (<SortableItem
            containerId={COURSE_CREATION_CONTAINER_ID}
            key={value}
            id={value}
            index={0}
            handle={false}
            renderItem={() => <div>1</div>}
            style={() => ({})}
            wrapperStyle={() => ({})}
            getIndex={() => 0}
          />)
        })};
      </SortableContext>
    </div>
  );
}