const express = require("express")
const app = express();
const mongoose  = require("mongoose")
const PORT = process.env.PORT_ONE || 8080
const jwt = require("jsonwebtoken")

app.use(express.json())

mongoose.connect("mongodb+srv://vishalvikaslokam:acRg3s1Cow6enV2N@testcluster1.gbuka8j.mongodb.net/product-service?retryWrites=true&w=majority").then(
    () => { console.log("Product-Service DB connected")},
    err => { handleError(err)  }
)



app.listen(PORT, () => {
    console.log(`Auth-service at ${PORT}`)
})