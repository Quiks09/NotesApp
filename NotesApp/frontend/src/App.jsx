import React from 'react';
import { useState, useEffect } from 'react';
import { createNote, getTags } from './api';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ActiveNotes from './components/ActiveNotes';
import ArchivedNotes from './components/ArchivedNotes';
import NoteForm from './components/NoteForm';
import UpdateNote from './components/UpdateNote';
import './App.css';

export default function App() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then(setTags).catch(console.error);
  }, []);

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      window.location.href = '/'; // Redirect back to active notes after creation
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <Router>
      <Toaster position="top-center" />
      <div className='min-h-screen p-4 flex items-center justify-center'>
        <div className="bg-[#C7CCDB] container mx-auto h-auto rounded shadow-lg">
          <header className="mb-4 p-4 bg-[#767B91] shadow-md rounded">
            <h1 className="text-2xl font-bold text-center text-white">Notes App</h1>
            <nav className="mt-8 flex justify-center gap-4 mb-4">
              <Link to="/" className="bg-[#F08D42] text-white px-4 py-2 rounded hover:bg-[#AA510E]">
                Active Notes
              </Link>
              <Link to="/archived" className="bg-[#F08D42] text-white px-4 py-2 rounded hover:bg-[#AA510E]">
                Archived Notes
              </Link>
              <Link to="/create" className="bg-[#F08D42] text-white px-4 py-2 rounded hover:bg-[#AA510E]">
                Create Note
              </Link>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<ActiveNotes />} />
            <Route path="/archived" element={<ArchivedNotes />} />
            <Route
              path="/create"
              element={<NoteForm onSubmit={handleCreateNote} availableTags={tags} />}
            />
            <Route path="*" element={<p>Page not found</p>} />
            <Route path="/update/:id" element={<UpdateNote />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

