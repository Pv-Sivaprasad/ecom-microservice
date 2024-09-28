const mongoose=require('mongoose')
const dotenv = require('dotenv');

dotenv.config()

const port = process.env.PORT;


const connectDb=async()=>{
    try {

    await mongoose.connect(process.env.MONGODB_URI)
    
    .then(()=>console.log(`connected to order service db`))

    } catch (error) {
        console.log('error connecting to order service db');
        
    }
}

module.exports=connectDb