const mongoose = require("./testDB.js");
const Schema = mongoose.Schema;
const testMessageSchema = new Schema({
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
const Test = mongoose.model("TestMessage", testMessageSchema);
module.exports = Test;
