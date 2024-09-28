const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoute=require('./routes/productRoute')
const {connectRabbitMq,closeConnection}=require('./rabbitmq/rabbitmq')
dotenv.config();


const app = express();
const port = process.env.PORT;

app.use(express.json())

app.use('/',productRoute)



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to product service db');
  })
  .catch(() => {
    console.log('error in connection with db');
  });


 const startServer=async()=>{
  try {
    
    await connectRabbitMq()
    app.listen(port, () => {
      console.log(`server for product service is running on the port ${port}`);
    });
    process.on("exit",closeConnection)
  } catch (error) {
    console.log('error in connecting to server',error);
    process.exit(1)
  }
 }
  
 startServer()