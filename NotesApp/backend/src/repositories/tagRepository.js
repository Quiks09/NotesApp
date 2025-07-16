const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create Tags
const createTag = async (name) => {
    return await prisma.tag.create({
        data: { name },
    });
};

//get all Tags
const getAllTags = async () => {
    return await prisma.tag.findMany({
        orderBy: { name: 'asc' }
    });
};

module.exports = {
    createTag,
    getAllTags
};