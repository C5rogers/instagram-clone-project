const express = require('express')
require('dotenv').config()
const body_parser = require('body-parser')
const router = require('./express/router/index')
    //need to have also helmate


//creating the express app
const app = express()
app.use(body_parser.json({ limit: '200mb' }))


//register the routers here
app.use('', router)


//listen to the express port correctly
app.listen(process.env.SERVER_PORT, () => {
    console.log(`the express server listens to the port: ${process.env.SERVER_PORT}`)
})