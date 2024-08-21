import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'


export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message);
        // The id extracted from req.params belongs to the receiverId
        const { id: receiverId } = req.params;
        // console.log(receiverId);
        // The id extracted from the middleware "authRequired/validateToken" belongs to the senderId
        const senderId = req.userId;
        // console.log(senderId);

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }



        // This promise runs in parallel
        await Promise.all([conversation.save(), newMessage.save()]);



        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.userId;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");  // This method is used for getting each message from the array of messages

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};