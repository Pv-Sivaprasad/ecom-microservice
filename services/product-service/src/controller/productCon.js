const Product = require('../model/productModel')
const {getChannel}=require('../rabbitmq/rabbitmq')

let order

const createProduct = async (req, res) => {

    try {

        const { name, description, price } = req.body

        const product = new Product({
            name, description, price
        })
        await product.save()
        return res.json(product)

    } catch (error) {
        console.log('error in creating the product', error);

    }

}

const buyproduct = async (req, res) => {
    try {

        const { ids } = req.body
        console.log('the id in body is::::::::',ids);
        
        const product = await Product.find({ _id: { $in: ids } })

        const channel= await  getChannel()

        channel.sendToQueue("ORDERS",Buffer.from(JSON.stringify({product, userEmail:req.user.email})))
        console.log(`publishing Meassage to Orders ${product}`);

        channel.consume("PRODUCT",(data)=>{
            console.log('consuming data from the order service');
            order=JSON.parse(data.content)

            
        },{noAck:true})
        return res.json(order)
        

    } catch (error) {
        console.log('error  in  buying produt', error);

    }
}


module.exports = {createProduct,buyproduct}