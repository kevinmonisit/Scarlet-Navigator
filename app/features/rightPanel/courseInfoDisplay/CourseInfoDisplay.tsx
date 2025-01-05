import useAuxiliaryStore from "@/lib/hooks/stores/useAuxiliaryStore";
import { useScheduleStore } from "@/lib/hooks/stores/useScheduleStore";

export default function CourseInfoDisplay() {
  const id = useAuxiliaryStore((state) => state.currentInfoCourseID);
  const currentCourse = useScheduleStore((state) => state.courses[id]);
  const globalCores = useScheduleStore((state) => state.globalCores);

  if (!id)
    return <div className="p-4 text-gray-500">No course selected</div>

  if (!currentCourse) {
    return <div className="p-4 text-gray-500">Loading... {id}</div>
  }

  const { name, credits, cores } = currentCourse;

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Course Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {name}</p>
          <p><span className="font-medium">Credits:</span> {credits}</p>
        </div>
      </div>

      {cores && cores.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Cores:</h3>
          <div className="flex flex-wrap gap-2">
            {cores.map((core) => (
              <span
                key={core}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${globalCores.has(core)
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
                  }`}
              >
                {core}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}