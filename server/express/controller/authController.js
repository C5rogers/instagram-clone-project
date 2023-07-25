const passwordManuplatiion = require('../utils/password')
const jwt = require('../utils/jwt')
const fs = require('fs')
const { getUser, creatingUser } = require('../graphql/auth')
const requesting = require('../utils/graphqlRequest')
const { generateHashedFileName, getFileExtension } = require('../utils/filenameRelated')
const path = require('path')


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

module.exports.signup_post = async(req, res) => {

    const { username, email, phone, password, bio, gender, profilebase64 } = req.body.input.object
        //first chacke whether the file existed or not
        //and upload if it exists
    if (profilebase64) {
        let filepath
        try {
            const fileextension = getFileExtension(profilebase64)
            const hashedFileName = generateHashedFileName(fileextension)
            filepath = path.join(__dirname, '/public/profile', hashedFileName)
            const fileData = profilebase64.replace(/^data:image\/\w+;base64,/, '')
            const buffere = Buffer.from(fileData, 'base64')
            fs.writeFile(filepath, buffere, (err) => {
                if (err) {
                    if (gender == 'm' || gender == 'M') {
                        hashedFileName = 'male.png'
                    } else {
                        hashedFileName = 'female.png'
                    }
                    filepath = path.join(__dirname, '/public/profile', hashedFileName)
                }
            })
        } catch (error) {
            console.log("Error while uploading the image: " + error)
        }
        //signup the user
        const userNewPassword = passwordManuplatiion.hashPassword(password)
        const variables = {
            username: username,
            email: email,
            phone: phone,
            password: userNewPassword,
            bio: bio,
            gender: gender,
            profilePicture: filepath
        }
        try {
            const result = await requesting(creatingUser, variables)
            const user = result.data.insert_users_one
            const token = jwt.generateToken(user.id)
            const SignedUpUserInfo = {
                id: user.id,
                accessToken: token,
                username: user.username,
                gender: user.gender,
                profilePicture: user.users_profile.profile_url,
                bio: user.bio
            }
            return res.status(201).json(SignedUpUserInfo)
        } catch (error) {
            const message = error.message
            return res.status(400).json({ message })
        }

    } else {
        let hashedFileName;
        if (gender == 'm' || gender == 'M') {
            hashedFileName = "male.png"
        } else {
            hashedFileName = "female.png"
        }
        const filepath = path.join(__dirname, '/public/profile', hashedFileName)
        const hashedUserPassword = passwordManuplatiion.hashPassword(password)
        const variables = {
            username: username,
            email: email,
            phone: phone,
            password: hashedUserPassword,
            bio: bio,
            gender: gender,
            profilePicture: filepath
        }
        try {
            const result = await requesting(creatingUser, variables)
            const user = result.data.insert_users_one
            const token = jwt.generateToken(user.id)
            const SignedUpUserInfo = {
                id: user.id,
                accessToken: token,
                username: user.username,
                gender: user.gender,
                profilePicture: user.users_profile.profile_url,
                bio: user.bio
            }
            return res.status(201).json(SignedUpUserInfo)
        } catch (error) {
            const message = error.message
            return res.status(400).json({ message })
        }
    }



}

module.exports.faceboock_login = (req, res) => {
    console.log("now we are on the controller to return the responce")
        // After successful authentication, you can redirect to the GraphQL client or return a JWT token
        //return the neccessary user information
        //can access the user from the req.user

    //res.json({user:req.user})
}