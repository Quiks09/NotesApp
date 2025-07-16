import React, { useState, useEffect } from 'react';
import { getActiveNotes, getNotesByTag, toggleArchive, deleteNote, getTags } from '../api';
import Notes from './Notes';
import ConfirmModal from './ConfirmModal';
import toast from 'react-hot-toast';

export default function ActiveNotes() {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterTag, setFilterTag] = useState('');
  const [noteToDelete, setNoteToDelete] = useState(null);

  const fetchNotes = async () => {
    const data = await getActiveNotes();
    setNotes(data);
    setFilterTag('');
  };

  const fetchNotesByTag = async (tagName) => {
    const data = await getNotesByTag(tagName);
    setNotes(data);
    setFilterTag(tagName);
  };

  useEffect(() => {
    getTags().then(setTags).catch(console.error);
    fetchNotes();
  }, []);

  const handleToggleArchive = async (id) => {
    await toggleArchive(id);
    filterTag ? fetchNotesByTag(filterTag) : fetchNotes();
  };

  const handleDeleteNote = (id) => {
    setNoteToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteNote(noteToDelete);
      toast.success("Note deleted!");
      setNoteToDelete(null);
      filterTag ? fetchNotesByTag(filterTag) : fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const cancelDelete = () => {
    setNoteToDelete(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Active Notes</h2>

      {/* Tag Filter UI */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        <p className="font-bold">Filter by tag:</p>
        <button
          className={`px-3 py-1 rounded ${filterTag === '' ? 'bg-[#F08D42] text-white' : 'bg-gray-200 hover:cursor-pointer'}`}
          onClick={() => fetchNotes()}
        >
          All
        </button>
        {tags.map(tag => (
          <button
            key={tag.id}
            className={`px-3 py-1 rounded ${
              filterTag === tag.name ? 'bg-[#F08D42] text-white' : 'bg-gray-200 hover:cursor-pointer'
            }`}
            onClick={() => fetchNotesByTag(tag.name)}
          >
            {tag.name}
          </button>
        ))}
      </div>

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
