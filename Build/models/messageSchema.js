import { Schema, model } from "mongoose";
const lanGageMessageSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true
    },
    conversationID: {
        type: Number,
        required: true
    },
    reply: {
        type: String,
        default: null
    }
});
export const Message = model("LanGageMessage", lanGageMessageSchema);
