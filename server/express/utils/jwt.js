const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config({ path: '../../.env' })

const JWT_SECRET = dotenv.JWT_SECRET
const expiredate = 30 * 24 * 60 * 60

const generateToken = (userId) => {
    const payload = {
        "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": userId,
            "x-hasura-roll": "user"
        }
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: expiredate })
    return token
}

const verfiyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch (error) {
        throw new Error(error.message)
    }
}

const getIdFromToken = (token) => {
    const decoded = verfiyToken(token)
    return decoded.userId
}

module.exports = {
    generateToken,
    verfiyToken,
    getIdFromToken
}