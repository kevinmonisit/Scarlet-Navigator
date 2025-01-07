import { useEffect } from 'react';
import useHistoryStore from './stores/useHistoryStore';

export const useKeyboardShortcuts = () => {
  const { undo, redo } = useHistoryStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Z (Undo)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'z' &&
        !event.shiftKey
      ) {
        event.preventDefault();
        undo();
      }
      // Check for Ctrl+Shift+Z or Ctrl+Y (Redo)
      if (
        ((event.ctrlKey || event.metaKey) &&
          event.key === 'z' &&
          event.shiftKey) ||
        ((event.ctrlKey || event.metaKey) && event.key === 'y')
      ) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);
};
