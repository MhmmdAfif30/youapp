const Message = require("../models/messageModels");
const User = require("../models/usersModels");
const { sendMessageToQueue } = require("../config/rabbitmq");

module.exports = {
    sendMessage: async (req, res) => {
        try {
            const { sender, receiver, message } = req.body;

            const senderUser = await User.findById(sender);
            const receiverUser = await User.findById(receiver);

            if (!senderUser || !receiverUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const newMessage = new Message({ sender, receiver, message });
            await newMessage.save();

            sendMessageToQueue(newMessage);

            res.status(200).json({ message: "Message sent", data: newMessage });
        } catch (error) {
            res.status(500).json({ message: "Error sending message", error });
        }
    },

    getMessages: async (req, res) => {
        try {
            const { userId } = req.params;
            const messages = await Message.find({ receiver: userId }).populate("sender", "receiver");
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving messages", error });
        }
    }
}