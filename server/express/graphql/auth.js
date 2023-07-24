const getUser = `
    query getTheUser($email:String!){
        users(where:{email:{_eq:$email}}){
            id
            email
            password
        }
    }
`

module.exports = {
    getUser
}