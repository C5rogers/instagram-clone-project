const { Router } = require('express')
const authController = require('../controller/authController')
const validator = require('../utils/validator')
const passport = require('passport')

const router = Router()

router.post('/login', (req, res, next) => {
    const { email, password } = req.body.input.object
    const errors = {}
    let result = validator.isValidEmail(email);
    if (result == 1) {
        errors.email = "Email is required"
    } else if (result == 2) {
        errors.email = "Invalid email address"
    }
    result = validator.isValidPassword(password)
    if (result == 1) {
        errors.password = "Password is required"
    } else if (result == 2) {
        errors.password = "Invalid Password"
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }

    next();
}, authController.login_post)
router.post('/signup', (req, res, next) => {

    next();
}, authController.signup_post)

router.post('/auth/faceboock', passport.authenticate('facebook-token'), authController.faceboock_login)

module.exports = router