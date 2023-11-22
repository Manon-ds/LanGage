import { Message as LanGageMessage} from "./messageSchema";


export async function postMessage(message: any) {
  try {
    const newMessageWithId = await LanGageMessage.create(message);
    return newMessageWithId;
  } catch (e) {
    console.log("User message not posted:", e);
  }
}

export async function retrieveConversation(conversationID: any) {
  try {
    const conversationByID = await LanGageMessage.find({
      conversationID: conversationID,
    });
    if (conversationByID.length === 0) {
      throw new Error("Converstaion not found.")
    }

    return conversationByID;
  } catch (e) {
    console.log("Conversation retrieval failed:", e);
    throw e;
  }
}

export async function retrieveConversationList() {
  try {
    const conversationList = await LanGageMessage.distinct("conversationID");
    return conversationList;
  } catch (e) {
    console.log("Conversation list retrieval failed:", e);
    throw new Error(e);

  }
}

export async function addGPTReplyProp(gptReply: any, id: any) {
  try {
    await LanGageMessage.updateOne({ _id: id }, { $set: { reply: gptReply } });
  } catch (e) {
    console.log("User message not posted:", e);
  }
}

