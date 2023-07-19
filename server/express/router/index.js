const { Router } = require('express')
const authController = require('../controller/authController')

const router = Router()

router.post('/login', authController.login_post)
router.post('/signup', authController.signup_post)
router.post('/faceboock/login', authController.faceboock_login)
router.post('faceboock/signup', authController.faceboock_signup)

module.exports = router