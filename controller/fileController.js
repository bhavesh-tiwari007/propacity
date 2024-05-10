const { createFile } = require('../services/fileService');
const { createFolderInS3, existsFolderInS3, createFolderIfNotExist, deleteFolder } = require('../utils/awsUtils');

async function createFileController(req, res) {
    try {

        const { size, originalname } = req.file;
        const { path } = req.body;
        const exists = await existsFolderInS3(`uid${req.user.id}/${path}`);
        if (!exists) return res.status(400).json({ message: "No Such folder exist!" });
        const file = await createFile(size, req.user.Id, originalname);
        res.status(201).json(file);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createFileController
}