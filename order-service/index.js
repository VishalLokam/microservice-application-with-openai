const express = require("express")
const app = express();
const mongoose  = require("mongoose")
const PORT = process.env.PORT_ONE || 9090
const jwt = require("jsonwebtoken")
var amqp = require("amqplib")
const Order = require("./Order")
const isAuthenticated = require("../isAuthenticated")
require('dotenv').config()

var channel, connection

app.use(express.json())

mongoose.connect(`${process.env.CONNECTION_STRING}order-service?retryWrites=true&w=majority`).then(
    () => { console.log("Order-Service DB connected")},
    err => { handleError(err)  }
)

async function connectQueue(){
  try{
    connection = await amqp.connect("amqp://localhost:5672")
    channel = await connection.createChannel()
  
    await channel.assertQueue("ORDER", {
      durable: true
    })

    await channel.assertQueue("PRODUCT", {
      durable: true
    })
    
    await channel.consume("ORDER", (msg) => {
      console.log("Consuming ORDER queue")
      const { products, userEmail } = JSON.parse(msg.content)
      const newOrder = createOrder(products, userEmail)
      channel.sendToQueue("PRODUCT", Buffer.from(JSON.stringify({  newOrder })))
      console.log("Sending to PRODUCT queue")
      channel.ack(msg)
    }, {
      noAck: false
    })
  } catch(error){
    console.log(error)
  }
}

connectQueue()

function createOrder(products, userEmail){
  let total = 0
  for (let t=0; t<products.length; t++){
    total += products[t].price
  }

  const newOrder = new Order({
    products,
    user: userEmail,
    total_price: total
  })

  newOrder.save()
  return newOrder
}

app.listen(PORT, () => {
    console.log(`Order-service at ${PORT}`)
})

