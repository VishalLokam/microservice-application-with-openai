const express = require("express")
const app = express();
const mongoose  = require("mongoose")
const PORT = process.env.PORT_ONE || 8080
const jwt = require("jsonwebtoken")
var amqp = require("amqplib/callback_api")
const Product = require("./Product")
const isAuthenticated = require("../isAuthenticated")
require('dotenv').config()

var channel, connection

app.use(express.json())

mongoose.connect(`${process.env.CONNECTION_STRING}product-service?retryWrites=true&w=majority`).then(
    () => { console.log("Product-Service DB connected")},
    err => { handleError(err)  }
)

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue("PRODUCT");

    // channel.sendToQueue(queue, Buffer.from(msg));
    // console.log(" [x] Sent %s", msg);
  });
});


//Create a new product
app.post("/product/create",isAuthenticated, async(req, res) => {
    const {name, tags, description, price} = req.body
    const newProduct = new Product({
        name,
        tags,
        description,
        price
    })
    newProduct.save()
    return res.json(newProduct)
})


//Buy a product

app.listen(PORT, () => {
    console.log(`Product-service at ${PORT}`)
})