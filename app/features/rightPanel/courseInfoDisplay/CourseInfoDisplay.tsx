import useAuxiliaryStore from "@/lib/hooks/stores/useAuxiliaryStore";
import { useScheduleStore } from "@/lib/hooks/stores/useScheduleStore";
import { useState } from "react";
import CoreInput from "@/app/components/CoreInput";

export default function CourseInfoDisplay() {
  const id = useAuxiliaryStore((state) => state.currentInfoCourseID);
  const currentCourse = useScheduleStore((state) => state.courses[id]);
  const globalCores = useScheduleStore((state) => state.globalCores);
  const updateCourse = useScheduleStore((state) => state.updateCourse);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    credits: 0,
    cores: [] as string[]
  });
  const [currentCore, setCurrentCore] = useState("");

  if (!id)
    return <div className="p-4 text-gray-500">No course selected</div>

  if (!currentCourse) {
    return <div className="p-4 text-gray-500">Loading... {id}</div>
  }

  const { name, credits, cores } = currentCourse;

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditForm({
        name,
        credits,
        cores: cores || []
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = () => {
    updateCourse(id, editForm);
    setIsEditing(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        {isEditing ? (
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="text-2xl font-bold mb-3 w-40 px-2 py-1 border rounded"
            maxLength={10}
          />
        ) : (
          <h1 className="text-2xl font-bold mb-3">{name}</h1>
        )}
        <div className="space-y-2">
          <p>
            <span className="font-medium">Credits:</span>{" "}
            {isEditing ? (
              <input
                type="number"
                value={editForm.credits}
                onChange={(e) => setEditForm({ ...editForm, credits: Number(e.target.value) })}
                className="w-20 px-2 py-1 border rounded"
                min={1}
                max={6}
              />
            ) : (
              credits
            )}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Cores:</h3>
        {isEditing ? (
          <CoreInput
            currentCore={currentCore}
            setCurrentCore={setCurrentCore}
            selectedCores={editForm.cores}
            setSelectedCores={(cores) => setEditForm({ ...editForm, cores })}
            globalCores={globalCores}
            label=""
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {cores && cores.length > 0 ? (
              cores.map((core) => (
                <span
                  key={core}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${globalCores.has(core)
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                    }`}
                >
                  {core}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No cores assigned to this course</span>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={isEditing ? handleSubmit : handleEditToggle}
          className="max-w-[200px] py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          {isEditing ? "Save Changes" : "Edit Course"}
        </button>
      </div>
    </div>
  );
}