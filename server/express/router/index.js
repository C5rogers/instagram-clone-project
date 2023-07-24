const { Router } = require('express')
const authController = require('../controller/authController')
const validator = require('../utils/validator')
const passport = require('passport')

const router = Router()

router.post('/login', (req, res, next) => {

    next();
}, authController.login_post)
router.post('/signup', (req, res, next) => {

    next();
}, authController.signup_post)

router.post('/auth/faceboock', passport.authenticate('facebook-token'), authController.faceboock_login)

module.exports = router