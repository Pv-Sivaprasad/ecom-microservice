const express = require('express')
const dotenv = require('dotenv');
const amqp = require('amqplib')
const Order = require('./model/orderModel')
const connectDb = require('../config/connectDb')


dotenv.config();

const app = express();

connectDb()

const port = process.env.PORT
app.use(express.json())

let connection;
let channel;



const createOrder = (product, email) => {

    let totalPrice = 0
    for (let i = 0; i < product.length; i++) {
        totalPrice += product[i].price
    }

    const newOrder = new Order({
        product,
        user: email,
        totalPrice
    })

    console.log('new order', newOrder);

    newOrder.save()
    return newOrder

}



const connectToRabbitMq = async () => {
    const amqpServer = "amqp://localhost:5672"
    connection = await amqp.connect(amqpServer)
    channel = await connection.createChannel()
    await channel.assertQueue("ORDERS")
  
    
}


const getOrder = async () => {

    channel.consume("ORDERS", (data) => {
        
        const { product, userEmail } = JSON.parse(data.content)
        console.log(data.content.toString(),'asjkdfhksdhfksdf');
        
        const newOrder = createOrder(product, userEmail)

        channel.ack(data)
        channel.sendToQueue("PRODUCT", Buffer.from(JSON.stringify({ newOrder })))

    })
}


const startServer = async () => {
    app.listen(port, () => console.log(`order service is running on ${port}`));
    await connectToRabbitMq();
    await getOrder();
};
startServer();