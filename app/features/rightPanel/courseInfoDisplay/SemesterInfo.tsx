import { useScheduleStore } from '@/lib/hooks/stores/useScheduleStore';
import { useState, useRef } from 'react';
import NotesArea from './components/NotesArea';
import useAuxiliaryStore from '@/lib/hooks/stores/useAuxiliaryStore';

interface SemesterInfoProps {
  id: string;
}

export default function SemesterInfo({ id }: SemesterInfoProps) {
  const currentSemester = useScheduleStore((state) => state.semesterByID[id]);
  const updateSemester = useScheduleStore((state) => state.updateSemester);
  const removeSemester = useScheduleStore((state) => state.removeSemester);
  const setCurrentInfo = useAuxiliaryStore((state) => state.setCurrentInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
  });
  const modalRef = useRef<HTMLDialogElement>(null);

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

  const handleRemove = () => {
    removeSemester(id);
    setCurrentInfo('', 'course');
  };

  return (
    <div className='space-y-4 p-4'>
      <dialog ref={modalRef} className="modal" id="delete_semester_modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove Semester</h3>
          <p className="py-4">Are you sure you want to remove this semester? All courses in this semester will also be deleted.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost mr-2">Cancel</button>
              <button className="btn btn-error" onClick={handleRemove}>Remove</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

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

      <div className='flex justify-center gap-2'>
        <button
          onClick={isEditing ? handleSubmit : handleEditToggle}
          className='max-w-[200px] rounded-lg bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300'
        >
          {isEditing ? 'Save Changes' : 'Edit Semester'}
        </button>
        <button className="btn btn-error btn-outline" onClick={() => modalRef.current?.showModal()}>Remove Semester</button>
      </div>
      <NotesArea id={id} />

    </div>
  );
}
