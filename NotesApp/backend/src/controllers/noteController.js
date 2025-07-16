const noteService = require('../services/noteService');

//createNote - Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content, tagIds } = req.body;
        const newNote = await noteService.createNote({ title, content, tagIds });
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error creating the note.' });
    }

};

// getNotes - Get all notes
const getNotes = async (req, res) => {
    try {
        const { tag } = req.query;

        if (tag) {
            const filteredNotes = await noteService.getNotesByTag(tag);
            return res.json(filteredNotes);
        }

        //fallback to return all active notes
        const getActiveNotes = await noteService.getActiveNotes();
        res.json(getActiveNotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error retrieving the notes.' });
    }
};

// getNoteById - Get a note by ID
const getNoteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const note = await noteService.getNoteById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving note' });
  }
};


// getActiveNotes - Get all active notes
const getActiveNotes = async (req, res) => {
    try {
        const notes = await noteService.getActiveNotes();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error retrieving the active notes.' });
    }
};

// getArchivedNotes - Get all archived notes
const getArchivedNotes = async (req, res) => {
    try {
        const notes = await noteService.getArchivedNotes();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error retrieving the archived notes.' });
    }
};

//deleteNote - Delete a note by ID
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await noteService.deleteNote(parseInt(id));
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error deleting the note.' });
    }
};

//updateNote - Update a note by ID
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tagIds } = req.body;
    
    const updatedNote = await noteService.updateNote(parseInt(id), { title, content });

    if (tagIds) {
      await noteService.updateNoteTags(parseInt(id), tagIds);
    }

    const fullNote = await noteService.getNoteById(parseInt(id));
    res.json(fullNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "There was an error updating the note." });
  }
};


// toggleArchiveStatus - Archive or unarchive a note by ID
const toggleArchiveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await noteService.toggleArchiveStatus(parseInt(id));
        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error toggling the archive status of the note.' });
    }
};

// updateNoteTags - Add tags to a note by ID
const updateNoteTags = async (req, res) => {
    try {
        const { id } = req.params;
        const { tagIds } = req.body;

        const updatedNote = await noteService.updateNoteTags(parseInt(id), tagIds);
        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error updating the note tags.' });
    }
};

module.exports = { 
    createNote, 
    getActiveNotes,
    getArchivedNotes,
    deleteNote,
    updateNote,
    toggleArchiveStatus,
    updateNoteTags,
    getNotes,
    getNoteById
};