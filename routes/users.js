var express = require('express');
var router = express.Router();
const User_controller = require('../controllers/users_controller');
const chackAuth = require('../middleware/passport_JWT')
    /* GET users listing. */

router.post('/register', User_controller.register);


router.post('/login', User_controller.login);

router.get('/profile', chackAuth.isLogin, User_controller.profile)

module.exports = router;