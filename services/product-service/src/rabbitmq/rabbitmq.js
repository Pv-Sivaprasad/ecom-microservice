const amqp=require('amqplib')

let connection
let channel

const connectRabbitMq=async()=>{

    try {
        
        const amqpServer="amqp://localhost:5672"
        connection=await amqp.connect(amqpServer)
        channel=await connection.createChannel()
        await channel.assertQueue("PRODUCT")

    } catch (error) {
        console.log('error connecting to rabbitmq',error);
        process.exit(1)
        
    }

}

const getChannel = async () => {
    try {
        if (!channel || channel.connection.closed) {
            console.log('Reconnecting to RabbitMQ...');
            await connectRabbitMq(); // Reconnect if the channel or connection is closed
        }
        return channel;
    } catch (error) {
        console.error('Error getting RabbitMQ channel:', error);
        throw error; // Throw the error for upstream handling
    }
};


const closeConnection=async()=>{

    try {
        await channel.close()
        await connection.close()
        console.log('rabbitMq has been closed for now');
        
    } catch (error) {
        console.log('error in closing rabbit mq',error);
        
    }

}

module.exports={
    connectRabbitMq,
    getChannel,
    closeConnection
}
