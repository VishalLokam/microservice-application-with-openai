const express = require("express")
const app = express();
const mongoose  = require("mongoose")
const PORT = process.env.PORT_ONE || 8080
const jwt = require("jsonwebtoken")
// var amqp = require("amqplib/callback_api")
var amqp = require("amqplib")
const Product = require("./Product")
const isAuthenticated = require("../isAuthenticated")
require('dotenv').config()


var channel, connection



app.use(express.json())

mongoose.connect(`${process.env.CONNECTION_STRING}product-service?retryWrites=true&w=majority`).then(
    () => { console.log("Product-Service DB connected")},
    err => { handleError(err)  }
)


async function connectQueue(){
  try{
    connection = await amqp.connect("amqp://localhost:5672")
    channel = await connection.createChannel()
  
    await channel.assertQueue("PRODUCT", {
      durable: true
    })
  } catch(error){
    console.log(error)
  } 
}

//Get all products
app.get("/products", isAuthenticated, async(req, res) => {
  const products = await Product.find({})
  return res.json(products)
})


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

connectQueue()


//User sends a list of product ids to buy
 app.post("/product/buy", isAuthenticated, async(req,res) => {
  const { ids } = req.body
  const products = await Product.find({ _id: { $in: ids } })

  await channel.assertQueue("ORDER", {
    durable: true
  })

  await channel.assertQueue("PRODUCT", {
    durable: true
  })
  
  await channel.sendToQueue("ORDER", Buffer.from(JSON.stringify({
    products,
    userEmail: req.user.email
  })))

  console.log("Sending to ORDER queue") 
  var order_response

  await channel.consume("PRODUCT", (msg) => {
    console.log("Consuming from PRODUCT queue")
    order_response = JSON.parse(msg.content)
    channel.ack(msg)
  })
  
  return res.json(order_response)
 })

app.listen(PORT, () => {
    console.log(`Product-service at ${PORT}`)
})