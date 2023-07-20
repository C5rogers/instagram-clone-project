const { Router } = require('express')
const authController = require('../controller/authController')
const validator = require('../utils/validator')

const router = Router()

router.post('/login', (req, res, next) => {

}, authController.login_post)
router.post('/signup', (req, res, next) => {

}, authController.signup_post)
router.post('/faceboock/login', authController.faceboock_login)
router.post('faceboock/signup', authController.faceboock_signup)

module.exports = router