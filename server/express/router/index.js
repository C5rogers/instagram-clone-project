const { Router } = require('express')
const authController = require('../controller/authController')
const validator = require('../utils/validator')
const passport = require('passport')
const requesting = require('../utils/graphqlRequest')
const { getExistingUser } = require('../graphql/auth')

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
router.post('/signup', async(req, res, next) => {

    //validate if the filds are there to create the user information
    //-username,email,phone,password,bio|nullable,gender
    //cross check whether the user is existed using its email and phone number 
    //if it exist respond back with error message called you already have an account
    const { username, email, phone, password, gender } = req.body.input.object
    const errors = {}
    let result = validator.isValidName(username)
    if (result == 1) {
        errors.username = "Username is required"
    } else if (result == 2) {
        errors.username = "Invalid username"
    }
    result = validator.isValidEmail(email)
    if (result == 1) {
        errors.email = "Email is required"
    } else if (result == 2) {
        errors.email = "Invalid email address"
    }
    result = validator.isValidPhonenumber(phone)
    if (result == 1) {
        errors.phone = "Phone number is required"
    } else if (result == 2) {
        errors.phone = "Invalid phone number"
    }
    result = validator.isValidPassword(password)
    if (result == 1) {
        errors.password = "Password is required"
    } else if (result == 2) {
        errors.password = "Invalid password"
    }
    result = validator.isValidGender(gender)
    if (result == 1) {
        errors.gender = "Gender is required"
    } else if (result == 2) {
        errors.gender = "Invalid gender information"
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }

    try {
        const variables = {
            email: email,
            phone: phone
        }
        const result = await requesting(getExistingUser, variables)
        const user = result.data.users[0]
        if (user !== null) {
            errors.message = "You already have an account. please login!"
        }
    } catch (error) {
        console.log(error)
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }

    next();
}, authController.signup_post)

router.post('/auth/faceboock', passport.authenticate('facebook-token'), authController.faceboock_login)

module.exports = router