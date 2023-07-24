const passwordManuplatiion = require('../utils/password')
const jwt = require('../utils/jwt')


module.exports.login_post = (req, res) => {
    console.log("the request is arived now!")
}

module.exports.signup_post = (req, res) => {

}

module.exports.faceboock_login = (req, res) => {
    console.log("now we are on the controller to return the responce")
        // After successful authentication, you can redirect to the GraphQL client or return a JWT token
        //return the neccessary user information
        //can access the user from the req.user

    //res.json({user:req.user})
}