const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')
const dotenv = require('dotenv').config('../../.env')

passport.use(
    new FacebookTokenStrategy({
        clientID: dotenv.parsed.FACEBOOK_APP_ID,
        clientSecret: dotenv.parsed.FACEBOOK_APP_SECRET
    }, async(accessToken, refreshToken, profile, done) => {
        console.log("we are now on the strategy to autenticate")
            // You can handle user authentication here.
            // Access the user's information from the 'profile' object.
            // You may check if the user exists in your database and create one if not.
            // After authenticating, return the user information to the GraphQL client.
        return done(null, profile);
    })
)