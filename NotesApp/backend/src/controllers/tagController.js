const tagService = require('../services/tagService');

// Create a new tag
const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await tagService.createTag(name);
        res.status(201).json(newTag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error creating the tag.' });
    }
};

// Get all tags
const getAllTags = async (req, res) => {
    try {
        const tags = await tagService.getAllTags();
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error retrieving the tags.' });
    }
};

module.exports = {
    createTag,
    getAllTags
};