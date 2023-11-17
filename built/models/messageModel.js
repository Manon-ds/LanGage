const LanGageMessage = require("./messageSchema");
async function postMessage(message) {
    try {
        const newMessageWithId = await LanGageMessage.create(message);
        return newMessageWithId;
    }
    catch (e) {
        console.log("User message not posted:", e);
    }
}
async function retrieveConversation(conversationID) {
    try {
        const conversationByID = await LanGageMessage.find({
            conversationID: conversationID,
        });
        if (conversationByID.length === 0) {
            throw new Error("Converstaion not found.");
        }
        return conversationByID;
    }
    catch (e) {
        console.log("Conversation retrieval failed:", e);
        throw e;
    }
}
async function retrieveConversationList() {
    try {
        const conversationList = await LanGageMessage.distinct("conversationID");
        return conversationList;
    }
    catch (e) {
        console.log("Conversation list retrieval failed:", e);
        throw new Error(e);
    }
}
async function addGPTReplyProp(gptReply, id) {
    try {
        await LanGageMessage.updateOne({ _id: id }, { $set: { reply: gptReply } });
    }
    catch (e) {
        console.log("User message not posted:", e);
    }
}
module.exports = {
    postMessage,
    retrieveConversation,
    retrieveConversationList,
    addGPTReplyProp,
};
