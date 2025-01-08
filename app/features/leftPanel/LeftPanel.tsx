import CourseCreation from './courseCreation/CourseCreation';
import CoursePool from './courseCreation/components/CoursePool';

export default function LeftPanel() {
  return (
    <div className='h-full w-full border-r border-gray-200 bg-white'>
      <h1>Left Panel</h1>
      <CourseCreation />
      <CoursePool />
    </div>
  );
}
