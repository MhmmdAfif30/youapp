const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost";

let channel;
let connection;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue("chat_queue", { durable: false });
        console.log("Connected to RabbitMQ");
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
    }
};

const sendMessageToQueue = async (message) => {
    if (!channel) {
        console.log("Channel not initialized, retrying connection...");
        await connectRabbitMQ();
    }

    if (channel) {
        channel.sendToQueue("chat_queue", Buffer.from(JSON.stringify(message)));
        console.log("Message sent to queue:", message);
    } else {
        console.error("RabbitMQ channel still not initialized");
    }
};

const consumeMessages = async (callback) => {
    if (!channel) {
        console.log("Channel not initialized, retrying connection...");
        await connectRabbitMQ();
    }

    if (channel) {
        channel.consume("chat_queue", (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                console.log("Message received from queue:", message);
                callback(message);
                channel.ack(msg);
            }
        });
    } else {
        console.error("RabbitMQ channel still not initialized");
    }
};

module.exports = { connectRabbitMQ, sendMessageToQueue, consumeMessages };
