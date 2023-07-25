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

const creatingUser = `
mutation createUser($username:String!,$email:String!,$phone:String!,$password:String!,$bio:String!,$gender:String!,$profilePicture:String!) {
    insert_users_one(object: {username: $username, email: $email, phone: $phone, password: $password, bio: $bio, gender:$gender, users_profile: {data: {profile_url: $profilePicture}}}) {
      username
      id
      bio 
      email
      password
      gender
      phone
      users_profile{
        id
        user_id
        profile_url
      }
    }
  }
`

module.exports = {
    getUser,
    getExistingUser,
    creatingUser
}