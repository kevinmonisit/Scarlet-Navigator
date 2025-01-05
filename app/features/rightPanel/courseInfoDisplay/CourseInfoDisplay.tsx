import useAuxiliaryStore from "@/lib/hooks/stores/useAuxiliaryStore";
import { useScheduleStore } from "@/lib/hooks/stores/useScheduleStore";

export default function CourseInfoDisplay() {

  const id = useAuxiliaryStore((state) => state.currentInfoCourseID);
  const currentCourse = useScheduleStore((state) => state.courses[id]);

  if (!id)
    return <>No course selected</>

  if (!currentCourse) {
    return <>Loading... {id}</>
  }

  const { name, credits } = currentCourse;

  return (
    <div
      className="w-full h-full flex flex-col"
    >
      Current Course Name: {name} <br />
      Current Course Credits: {credits}
    </div>
  );
}