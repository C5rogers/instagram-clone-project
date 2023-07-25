const getUser = `
    query getTheUser($email:String!){
        users(where:{email:{_eq:$email}}){
            id
            email
            password
        }
    }
`
const getExistingUser = `
query getExistedUser($email: String!, $phone: String!) {
    users(where: {_or: {email: {_eq: $email}, phone: {_eq: $phone}}}) {
      id
    }
  }
`

module.exports = {
    getUser,
    getExistingUser
}