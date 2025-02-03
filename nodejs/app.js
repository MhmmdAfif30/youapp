const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { connectRabbitMQ, consumeMessages } = require("./config/rabbitmq");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const messageRouters = require("./routes/messageRoutes");
app.use("/api/message", messageRouters);

connectDB();
connectRabbitMQ();

consumeMessages((message) => {
    console.log(`📢 Notifikasi: ${message.sender} mengirim pesan ke ${message.receiver}`);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
