import dynamic from 'next/dynamic';

const ScheduleBoard = dynamic<{
  itemCount: number;
}>(
  () => import('@/app/features/middlePanel/dashboard/ScheduleBoard').then(mod => mod.ScheduleBoard), {
  ssr: false
});


export function MiddlePanel() {
  return (
    <div>
      <ScheduleBoard itemCount={5} />
    </div>
  )
}