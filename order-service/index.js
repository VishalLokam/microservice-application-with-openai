const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT_ONE || 9090;
const jwt = require("jsonwebtoken");
var amqp = require("amqplib");
const Order = require("./Order");
// const isAuthenticated = require("../isAuthenticated")
require("dotenv").config();
var cors = require("cors");

var channel, connection;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `${process.env.CONNECTION_STRING}order-service?retryWrites=true&w=majority`
  )
  .then(
    () => {
      console.log("Order-Service DB connected");
    },
    (err) => {
      handleError(err);
    }
  );

app.get("/order-service/health", async (req, res) => {
  return res.status(200).send("<h1>Order service OK</h1>");
});

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("ORDER", {
      durable: true,
    });

    await channel.assertQueue("EMAIL", {
      durable: true,
    });

    await channel.consume(
      "ORDER",
      (msg) => {
        console.log("Consuming ORDER queue");
        const { products, userEmail, userAddress } = JSON.parse(msg.content);
        console.log(products);
        const newOrder = createOrder(products, userEmail, userAddress);
        channel.sendToQueue("EMAIL", Buffer.from(JSON.stringify({ newOrder })));
        channel.ack(msg);
      },
      {
        noAck: false,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

connectQueue();

function createOrder(products, userEmail, userAddress) {
  let total = 0;
  for (let t = 0; t < products.length; t++) {
    total += products[t].price;
  }

  const newOrder = new Order({
    products,
    userEmail: userEmail,
    userAddress: userAddress,
    total_price: total,
  });

  newOrder.save();
  return newOrder;
}

//Get all orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find({});
  return res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Order-service at ${PORT}`);
});
