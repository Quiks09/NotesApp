import React, { useState, useEffect } from 'react';
import { getArchivedNotes, toggleArchive, deleteNote } from '../api';
import Notes from './Notes';
import ConfirmModal from './ConfirmModal';
import toast from 'react-hot-toast';

export default function ArchivedNotes() {
  const [notes, setNotes] = useState([]);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const fetchNotes = async () => {
    const data = await getArchivedNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleToggleArchive = async (id) => {
    await toggleArchive(id);
    fetchNotes(); 
  };

  const handleDeleteNote = (id) => {
    setNoteToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteNote(noteToDelete);
      toast.success("Note deleted!");
      setNoteToDelete(null);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

    const cancelDelete = () => {
    setNoteToDelete(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Archived Notes</h2>
      <Notes 
        notes={notes} 
        onToggleArchive={handleToggleArchive} 
        onDeleteNote={handleDeleteNote} 
      />
      {noteToDelete !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this note?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
