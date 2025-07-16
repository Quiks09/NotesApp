const tagRepository = require('../repositories/tagRepository');

// Create a new tag
const createTag = async (name) => {
    return await tagRepository.createTag(name);
};

// Get all tags
const getAllTags = async () => {
    return await tagRepository.getAllTags();
};

module.exports = {
    createTag,
    getAllTags
};