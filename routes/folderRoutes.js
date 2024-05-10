const { createFolderController, getFolderByIdController, getFoldersByUserIdController } = require('../controller/folderController');
const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../utils/awsUtils');

router.post('/folder', auth, createFolderController);
router.get('/folder/:id', auth, getFolderByIdController);
router.get('/folders', auth, getFoldersByUserIdController);

module.exports = router;
