const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

//POST /notes - Create a new note
router.post('/', noteController.createNote);
//GET /notes - Get all notes
router.get('/', noteController.getNotes)
// GET /notes/active - Get all active notes
router.get('/active', noteController.getActiveNotes);
// GET /notes/archived - Get all archived notes
router.get('/archived', noteController.getArchivedNotes);
// DELETE /notes/:id - Delete a note by ID
router.delete('/:id', noteController.deleteNote);
// UPDATE /notes/:id - Update a note by ID
router.put('/:id', noteController.updateNote); 
// PATCH /notes/:id/archive - Archive a note by ID
router.patch('/:id/archive', noteController.toggleArchiveStatus);
//PATCH /:id/tags - Add tags to a note by ID
router.patch('/:id/tags', noteController.updateNoteTags);
// GET /notes/:id - Get a note by ID
router.get('/:id', noteController.getNoteById);



module.exports = router;