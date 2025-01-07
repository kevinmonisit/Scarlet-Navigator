import { useNotesStore } from '@/lib/hooks/stores/useNotesStore';
import { useState } from 'react';

interface NotesAreaProps {
  id: string;
}

export default function NotesArea({ id }: NotesAreaProps) {
  const { notes, setNote } = useNotesStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(notes[id] || '');

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditValue(notes[id] || '');
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setNote(id, editValue);
    setIsEditing(false);
  };

  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='text-sm font-medium'>Notes:</h3>
        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          className='text-sm text-blue-600 hover:text-blue-800'
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      {isEditing ? (
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className='h-32 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Add your notes here...'
        />
      ) : (
        <div className='min-h-[8rem] w-full whitespace-pre-wrap rounded-md bg-gray-50 px-3 py-2'>
          {notes[id] ? (
            notes[id]
          ) : (
            <span className='text-gray-500'>No notes added yet</span>
          )}
        </div>
      )}
    </div>
  );
}
