const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// POST /tags - Create a new tag
router.post('/', tagController.createTag);

// GET /tags - Get all tags
router.get('/', tagController.getAllTags);


module.exports = router;

