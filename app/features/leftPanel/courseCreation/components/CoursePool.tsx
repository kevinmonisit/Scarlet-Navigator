import SortableItem from '@/app/features/middlePanel/dashboard/components/SortableItem';
import { useScheduleStore } from '@/lib/hooks/stores/useScheduleStore';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { COURSE_CREATION_CONTAINER_ID } from '../CourseCreation';

function CoursePool() {
  const coursesBySemesterID = useScheduleStore(
    (state) => state.coursesBySemesterID
  );
  const courses = useScheduleStore((state) => state.courses);

  return (
    <div className='mt-4'>
      <h2 className='mb-4 text-lg font-semibold'>Course Pool</h2>
      <SortableContext
        items={coursesBySemesterID[COURSE_CREATION_CONTAINER_ID] || []}
        strategy={verticalListSortingStrategy}
      >
        {(coursesBySemesterID[COURSE_CREATION_CONTAINER_ID] || []).map(
          (value) => (
            <SortableItem
              containerId={COURSE_CREATION_CONTAINER_ID}
              key={value}
              id={value}
              index={0}
              handle={false}
              renderItem={() => (
                <div className='p-2'>
                  {courses[value]?.name || 'Loading...'}
                </div>
              )}
              style={() => ({
                margin: '8px 0',
                background: 'white',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              })}
              wrapperStyle={() => ({})}
              getIndex={() => 0}
            />
          )
        )}
      </SortableContext>
    </div>
  );
}

export default CoursePool;
