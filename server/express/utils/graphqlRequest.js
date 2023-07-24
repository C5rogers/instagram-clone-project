const dotenv = require('dotenv').config('../../.env')
const axios = require('axios')



const requesting = async(query, variables) => {
    const headers = {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': dotenv.parsed.ADMIN_SECRET
    }

    const requestBody = {
        query,
        variables
    }

    try {
        const result = await axios.post(dotenv.parsed.HASURA_API_URL, requestBody, { headers })
        return result.data
    } catch (error) {
        throw error
    }
}


module.exports = requesting