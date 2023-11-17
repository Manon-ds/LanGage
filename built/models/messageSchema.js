const mongoose = require("../db.js");
const Schema = mongoose.Schema;
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
        default: Date.now,
    },
    conversationID: {
        type: Number,
        required: true,
    },
    reply: {
        type: String,
        default: null,
    },
});
const Message = mongoose.model("LanGageMessage", lanGageMessageSchema);
module.exports = Message;
