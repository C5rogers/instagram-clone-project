const express = require('express')
const passport = require('passport')
require('dotenv').config()
require('./express/strategys/facebook')
const body_parser = require('body-parser')
const router = require('./express/router/index')
    //need to have also helmate


//creating the express app
const app = express()
    //registering passport
app.use(passport.initialize())
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