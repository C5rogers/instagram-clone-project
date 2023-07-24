const express = require('express')
const passport = require('passport')
require('dotenv').config()
require('./express/strategys/facebook')
const body_parser = require('body-parser')
const router = require('./express/router/index')
    //need to have also helmate


//writing the filebuffere to file
//fs.writeFileSync("./public/profile/"+name,fileBuffere,'base64');
//we accept the fileBuffere and name from the request like an string
//define hasura action with the filds of name,type,base64str, filds to accept the file
//save the path to the database
//from the frontend change the file to base64 format to send to the front end

//creating the express app
const app = express()
    //registering passport
app.use(passport.initialize())
app.use(express.static('public'))
app.use(passport.session())
app.use(body_parser.json({ limit: '200mb' }))
app.use(express.urlencoded({
    extended: true
}))

//register the routers here
app.use('', router)


//listen to the express port correctly
app.listen(process.env.SERVER_PORT, () => {
    console.log(`the express server listens to the port: ${process.env.SERVER_PORT}`)
})