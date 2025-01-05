import CourseCreation from "./courseCreation/CourseCreation";

export default function LeftPanel() {
  return (
    <div className="bg-red-100 w-1/6 h-full">
      <h1>Left Panel</h1>
      <CourseCreation />
    </div>
  );
}