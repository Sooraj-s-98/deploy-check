import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }]
});
const Chat = mongoose.model('Chat', chatSchema);
const User = mongoose.model('User', userSchema);
export { Chat, User };
//# sourceMappingURL=User.js.map