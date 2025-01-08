import { useScheduleStore } from '@/lib/hooks/stores/useScheduleStore';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from '../middlePanel/dashboard/components/SortableItem';
import CourseCreation, { COURSE_CREATION_CONTAINER_ID } from './courseCreation/CourseCreation';
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
