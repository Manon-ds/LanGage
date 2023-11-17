const testMessage = require("./testSchema");

async function postMessage(message) {
  try {
    const newMessageWithId = await testMessage.create(message);
    return newMessageWithId;
  } catch (e) {
    console.log("User message not posted:", e);
  }
}

async function retrieveConversation(conversationID) {
  try {
    const conversationByID = await testMessage.find({
      conversationID: conversationID,
    });
    if (conversationByID.length === 0) {
      throw new Error("Converstaion not found.")
    }

    return conversationByID;
  } catch (e) {
    console.log("Conversation retrieval failed:", e);
  }
}

async function retrieveConversationList(field) {
    // "conversationID"
  try {
    const conversationList = await testMessage.distinct(field);
    if (conversationList.length === 0) {
        throw new Error("Conversation list retrieval failed:")
      }
    return conversationList;
  } catch (e) {
    console.log("Conversation list retrieval failed:", e);
  }
}

async function addGPTReplyProp(gptReply, id) {
    console.log('called')

  try {
    const result = await testMessage.updateOne({ _id: id }, { $set: { reply: gptReply } });
    console.log('result' ,result)
  } catch (e) {
    console.log("User message not posted:", e);
  }
}

module.exports = {
  postMessage,
  retrieveConversation,
  retrieveConversationList,
  addGPTReplyProp,
};
