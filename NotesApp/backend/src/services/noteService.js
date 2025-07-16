const noteRepository = require('../repositories/noteRepository');

//createNote - Create a new note
const createNote = async ({ title, content, tagIds }) => {
    if (!title) {
        throw new Error('Title is required');
    }

    const newNote = await noteRepository.createNote({ title, content, tagIds });
    return newNote;
};

//getActiveNotes - Get all active notes
const getActiveNotes = async () => {
    return await noteRepository.getActiveNotes();
};

//getArchivedNotes - Get all archived notes
const getArchivedNotes = async () => {
    return await noteRepository.getArchivedNotes();
};

//getNoteById - Get a note by ID
const getNoteById = async (id) => {
  return await noteRepository.getNoteById(id);
};


//deleteNote - Delete a note by ID
const deleteNote = async (id) => {
    return await noteRepository.deleteNote(id);
};

//updateNote - Update a note by ID
const updateNote = async (id, { title, content }) => {
    if (!title) {
        throw new Error('Title is required');
    }

    return await noteRepository.updateNote(id, { title, content });
};

// Toggle archive status of a note
const toggleArchiveStatus = async (id) => {
    const note = await noteRepository.getNoteById(id);
    const newStatus = !note.archived;
    return await noteRepository.updateNote(id, { archived: newStatus });
};

// Update tags for a note
const updateNoteTags = async (id, tagIds) => {
    return await noteRepository.setTagsForNote(id, tagIds);
};

// Get note by tag
const getNotesByTag = async (tagName) => {
    return await noteRepository.getNotesByTag(tagName);
};

module.exports = { 
    createNote,
    getActiveNotes,
    getArchivedNotes,
    deleteNote,
    updateNote,
    toggleArchiveStatus,
    updateNoteTags,
    getNotesByTag,
    getNoteById
};