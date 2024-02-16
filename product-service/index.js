const express = require("express")
const app = express();
const mongoose  = require("mongoose")
const PORT = process.env.PORT_ONE || 8080
const jwt = require("jsonwebtoken")
require('dotenv').config()

app.use(express.json())

mongoose.connect(`${process.env.CONNECTION_STRING}product-service?retryWrites=true&w=majority`).then(
    () => { console.log("Product-Service DB connected")},
    err => { handleError(err)  }
)



app.listen(PORT, () => {
    console.log(`Product-service at ${PORT}`)
})