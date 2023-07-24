const { Router } = require('express')
const authController = require('../controller/authController')
const validator = require('../utils/validator')
const passport = require('passport')

const router = Router()

router.post('/login', (req, res, next) => {

    //here we go the validation of the login input
    next();
}, authController.login_post)
router.post('/signup', (req, res, next) => {




    //this is also the validation of signup input
    next();
}, authController.signup_post)



//facebook login and signup 
router.post('/auth/faceboock', passport.authenticate('facebook-token'), authController.faceboock_login)
    // router.post('auth/faceboock', authController.faceboock_signup)

module.exports = router