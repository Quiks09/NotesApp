import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNoteById, updateNote, getTags } from '../api';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import NoteForm from './NoteForm';

export default function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedNote = await getNoteById(id);
        const fetchedTags = await getTags();
        setNote(fetchedNote);
        setTags(fetchedTags);
      } catch (err) {
        console.error('Failed to load note or tags', err);
      }
    }
    fetchData();
  }, [id]);

const handleUpdate = async (data) => {
  try {
    await updateNote(id, data);
    toast.success("Note updated!");
    navigate('/');
  } catch (err) {
    console.error("Failed to update note", err);
  }
};

  if (!note) return <p className="text-center">Loading note...</p>;

  return (
    <NoteForm
      onSubmit={handleUpdate}
      existingNote={note}
      availableTags={tags}
    />
  );
}
