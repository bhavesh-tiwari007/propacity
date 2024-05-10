const { createFileController} =  require('../controller/fileController');

const router = require('express').Router();
const auth = require('../middleware/auth');
const {uploadFileMulter} = require('../utils/awsUtils');

router.post('/file', auth, uploadFileMulter().single("file"), createFileController);

module.exports = router;