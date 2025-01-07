'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotesState {
  notes: Record<string, string>;
  setNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: {},
      setNote: (id: string, content: string) =>
        set((state) => ({
          notes: {
            ...state.notes,
            [id]: content
          }
        })),
      deleteNote: (id: string) =>
        set((state) => {
          const { [id]: _, ...rest } = state.notes;
          return { notes: rest };
        })
    }),
    {
      name: 'notes-storage'
    }
  )
);