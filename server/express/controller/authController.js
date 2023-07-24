const passwordManuplatiion = require('../utils/password')
const jwt = require('../utils/jwt')
const fs = require('fs')
const { getUser } = require('../graphql/auth')
const requesting = require('../utils/graphqlRequest')


module.exports.login_post = async(req, res) => {
    const { email, password } = req.body.input.object
    try {

        try {
            const variables = {
                email: email
            }
            const result = await requesting(getUser, variables)
            const user = result.data.users[0]
            if (user == null) {
                return res.status(400).json({ message: "Invalid credentials" })
            } else {
                const compared = await passwordManuplatiion.compareHashedPassword(password, user.password)
                if (compared == false) {
                    return res.status(400).json({ message: "Invalid credentials" })
                } else {
                    const token = jwt.generateToken(user.id)
                    const userId = user.id
                    const LoginOutput = {
                        id: userId,
                        accessToken: token
                    }
                    return res.status(200).json(LoginOutput)
                }
            }
        } catch (error) {
            res.status(400).json({ message: "Bad request" })
        }

    } catch (error) {
        const message = error.message
        res.status(400).json({ message })
    }
}

module.exports.signup_post = (req, res) => {


    //extract the user profile information and save it to the local file system in public folder
    //this happens after validating the user input

}

module.exports.faceboock_login = (req, res) => {
    console.log("now we are on the controller to return the responce")
        // After successful authentication, you can redirect to the GraphQL client or return a JWT token
        //return the neccessary user information
        //can access the user from the req.user

    //res.json({user:req.user})
}