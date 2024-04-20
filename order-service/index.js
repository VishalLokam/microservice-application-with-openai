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

mongoose.connect(`${process.env.CONNECTION_STRING}`).then(
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
        const { productsForOrderDetails, userEmail, userAddress } = JSON.parse(
          msg.content
        );

        // console.log(productsForOrderDetails);

        const newOrder = createOrder(
          productsForOrderDetails,
          userEmail,
          userAddress
        );
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

function createOrder(productsForOrderDetails, userEmail, userAddress) {
  let total = 0;
  for (let t = 0; t < productsForOrderDetails.length; t++) {
    let productPriceTotal =
      productsForOrderDetails[t].price * productsForOrderDetails[t].quantity;
    total = total + productPriceTotal;
  }

  const newOrder = new Order({
    productsForOrderDetails,
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
