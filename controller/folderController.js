const { createFolder, getFolderById, getFoldersByUserId } = require('../services/folderService');
const { createFolderInS3, existsFolderInS3, createFolderIfNotExist, deleteFolder } = require('../utils/awsUtils');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function createFolderController(req, res) {
    try {

        const { name } = req.body;
        if(name.length==0) return res.status(400).json({ message: "Name is required" });
        const fileName = `uid${req.user.id}/${name}`;
        const exists = await existsFolderInS3(fileName);
        if (exists) return res.status(400).json({ message: "Folder already exists" });
        let resBody = await createFolderInS3(fileName);
        let fileRes = await s3.headObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }).promise();
        const createdAt = fileRes.LastModified;
        const folder = await createFolder(fileName, req.user.id, createdAt );
        if (folder.errors) return res.status(400).json(folder);
        res.status(201).json(folder);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// async function createSubFolderController(req, res) {
//     try {
//         const { name } = req.body;
//         const { id } = req.params;
//         const folder = await getFolderById(id);
//         if (!folder) return res.status(404).json({ message: "Folder not found" });
//         const exists = await existsFolderInS3(name);
//         if (exists) return res.status(400).json({ message: "Folder already exists" });
//         await createFolderInS3(name);
//         const subFolder = await createFolder(name, req.user.id, id);
//         if (subFolder.errors) return res.status(400).json(subFolder);
//         res.status(201).json(subFolder);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// }


async function getFolderByIdController(req, res) {
    try {
        const { id } = req.params;
        const folder = await getFolderById(id);
        if (!folder) return res.status(404).json({ message: "Folder not found" });
        res.status(200).json(folder);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function getFoldersByUserIdController(req, res) {
    try {
        const { userId } = req.params;
        const folders = await getFoldersByUserId(userId);
        res.status(200).json(folders);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createFolderController,
    getFolderByIdController,
    getFoldersByUserIdController,
    // createSubFolderController
}

