const File = require('../model/fileModel');

async function createFile(name, url, key, size, userId, originalname) {
    try {
        const file = await File.create({
            name,
            url,
            key,
            size,
            userId,
            originalname
        });
        return file;
    } catch (err) {
        return err;
    }
}

module.exports = {
    createFile
}