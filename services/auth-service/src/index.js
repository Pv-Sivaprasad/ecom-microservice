
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute');  

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/', userRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch(() => {
    console.log('error in connection with db');
  });

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
