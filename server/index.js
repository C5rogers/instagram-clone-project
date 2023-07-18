const express = require('express')
require('dotenv').config()
const body_parser = require('body-parser')
    //we import all the necessary types here and we will do any thing to use it


//creating the express app
const app = express()
app.use(body_parser.json({ limit: '200mb' }))


//register the routers here



//listen to the express port correctly
app.listen(process.env.SERVER_PORT, () => {
    console.log(`the express server listens to the port: ${process.env.SERVER_PORT}`)
})