const Folder = require('../model/folderModel');

async function createFolder(name, userId, createdAt) {
    try {
        const folder = await Folder.create({
            name,
            userId,
            file_created_at: createdAt
        });
        return folder;
    } catch (err) {
        return err;
    }
} 

async function getFolderById(id) {
    try {
        const folder = await Folder.findByPk(id);
        return folder;
    }
    catch (err) {
        return err;
    }
}

async function getFoldersByUserId(userId) {
    try {
        const folders = await Folder.findAll({ where: { userId } });
        return folders;
    }
    catch (err) {
        return err;
    }
}

module.exports = {
    createFolder,
    getFolderById,
    getFoldersByUserId
}