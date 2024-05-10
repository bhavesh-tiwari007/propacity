const { createUserController, getUserByIdController, getUserByEmailController, userLoginController, getAllUsersController } = require('../controller/userController');
const validate = require('../utils/validateUtils');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/user', validate, createUserController);
router.post('/user/login', userLoginController);
router.get('/users', auth, getAllUsersController);
router.get('/user/:id', auth, getUserByIdController);
router.get('/user/:email', auth, getUserByEmailController);


module.exports = router;