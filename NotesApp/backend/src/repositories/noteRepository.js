const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient


//createNote - Create a new note
const createNote = async ({ title, content, tagIds = [] }) => {
  return await prisma.note.create({
    data: {
      title,
      content,
      tags: {
        connect: tagIds.map(id => ({ id })),
      },
    },
    include: { tags: true },
  });
};

//getActiveNotes - Get all active notes
const getActiveNotes = async () => {
    return await prisma.note.findMany({
        where: {
            archived:false,
        },
        include: { tags: true }, 
        orderBy: {createdAt: 'desc'},
    });
};

//getArchivedNotes - Get all archived notes
const getArchivedNotes = async () => {
    return await prisma.note.findMany({
        where: {
            archived:true,
        },
        include: { tags: true }, 
        orderBy: {createdAt: 'desc'},
    });
};

//deleteNote - Delete a note by ID
const deleteNote = async (id) => {
    return await prisma.note.delete({
        where: { id },
    });
};

//updateNote - Update a note by ID
const updateNote = async (id, data) => {
    return await prisma.note.update({
        where: { id },
        data,
    });
};

// Get a note by ID
const getNoteById = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throw new Error('Invalid note ID');
  }

  return await prisma.note.findUnique({
    where: { id: parsedId },
    include: { tags: true },
  });
};


// Update tags for a note
const setTagsForNote = async (noteId, tagIds) => {
    return await prisma.note.update({
        where: { id: noteId },
        data: {
            tags: {
                set: tagIds.map(id => ({ id })),
            },
        },
        include: { tags: true }, //optional, include tags in the response
    }); 
};

// Get notes by tag
const getNotesByTag = async (tagName) => {
    return await prisma.note.findMany({
        where: {
            archived: false,
            tags: {
                some: {
                    name: tagName,
                },
            },
        },
        include: { tags: true },
        orderBy: { createdAt: 'desc' },
    });
};

module.exports = { 
    createNote,
    getActiveNotes,
    getArchivedNotes,
    deleteNote,
    updateNote,
    getNoteById,
    setTagsForNote,
    getNotesByTag
};
