const { createFileController} =  require('../controller/fileController');

const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../utils/awsUtils');

router.post('/file', auth, upload.upload.single('file'), createFileController);

module.exports = router;