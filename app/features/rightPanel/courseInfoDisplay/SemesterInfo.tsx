import { useScheduleStore } from '@/lib/hooks/stores/useScheduleStore';
import { useState } from 'react';
import NotesArea from './components/NotesArea';

interface SemesterInfoProps {
  id: string;
}

export default function SemesterInfo({ id }: SemesterInfoProps) {
  const currentSemester = useScheduleStore((state) => state.semesterByID[id]);
  const updateSemester = useScheduleStore((state) => state.updateSemester);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
  });

  if (!currentSemester) {
    return <div className='p-4 text-gray-500'>Loading semester... {id}</div>;
  }

  const { title } = currentSemester;

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditForm({
        title: title || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = () => {
    updateSemester(id, {
      title: editForm.title,
    });
    setIsEditing(false);
  };

  return (
    <div className='space-y-4 p-4'>
      <div>
        {isEditing ? (
          <input
            type='text'
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
            className='mb-3 w-40 rounded border px-2 py-1 text-2xl font-bold'
            maxLength={20}
            placeholder='Enter semester title'
          />
        ) : (
          <h1 className='mb-3 text-2xl font-bold'>
            {title || 'Untitled Semester'}
          </h1>
        )}
      </div>

      <div className='flex justify-center'>
        <button
          onClick={isEditing ? handleSubmit : handleEditToggle}
          className='max-w-[200px] rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300'
        >
          {isEditing ? 'Save Changes' : 'Edit Semester'}
        </button>
      </div>

      <NotesArea id={id} />
    </div>
  );
}
