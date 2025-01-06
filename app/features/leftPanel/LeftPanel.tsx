import CourseCreation from "./courseCreation/CourseCreation";

export default function LeftPanel() {
  return (
    <div className="bg-white h-full w-full border-r border-gray-200">
      <h1>Left Panel</h1>
      <CourseCreation />
    </div>
  );
}