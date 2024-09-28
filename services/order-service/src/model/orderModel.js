const mongoose=require('mongoose')

const orderSchema= mongoose.Schema({

    product:[
        {
            productId:String
        }
    ],
    user:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }

},{timestamps:true})

const Order=mongoose.model("Order",orderSchema)
module.exports=Order