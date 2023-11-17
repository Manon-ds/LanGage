const GPT = require("../gpt/gptAPI");
const {
  postMessage,
  retrieveConversation,
  retrieveConversationList,
  addGPTReplyProp,
} = require("../models/messageModel");
const { reduceAndSortConversationHistory } = require("../util.js");

//TODO Make this one function wihtin the controllers, removing extra functionality from the model.

//TODO: Possible refactor: change concateneated error logs to template literals. IF TIME!
async function postNewMessage(req, res) {
  try {
    const newMessageWithID = await postMessage(req.body);
    res.status(200).json(newMessageWithID);
  } catch (e) {
    console.log("New message post failed:", e);
    res.sendStatus(500).json({ error: "New message post failed" });
  }
}

async function gptReply(req, res) {
  try {
    // Extract the message role, content and IDs from the request body.
    const { role, content, conversationID, _id } = req.body;
    // Create a userMessage object with the role and content, extracted above.
    const userMessage = { role, content };
    //Retrieve the conversation history from the database with the relevant converstaion ID.
    const dbConversationHistory = await retrieveConversation(conversationID);
    // Take the retrieved history and pass it through a helper function.
    // The helper function returns an array of message objects sorted from oldest to newest.
    const conversationHistory = reduceAndSortConversationHistory(
      dbConversationHistory
    );
    // Make a call to the chatGPT API. Send the user message and the recent converstaion history for context.
    // Store the GPT response as a variable.
    const gptOutput = await GPT.main(userMessage, conversationHistory);
    // Isolate the response message.
    const reply = gptOutput.message;
    // Assign the reply a conversation ID. This was extracted from the request body on line 26.
    reply.conversationID = conversationID;
    // Post the reply from GPT to the database, it is then assigned an id from MongoDB.
    const replyWithID = await postMessage(reply);
    // Add the chatGPT reply to the database?
    await addGPTReplyProp(replyWithID.content, _id);
    // Send a 200 status and a json object containing the replyWithID.
    // Test here -
    res.status(200).json(replyWithID);
  } catch (e) {
    console.log("AI call failed:", e);
    res.sendStatus(500).json({ error: "AI reply failed" });
  }
}
// Think of it as if you are sending the reply from ChatGPT?

async function getConversation(req, res) {
  try {
    const conversationID = req.params.id;
    const conversationHistory = await retrieveConversation(conversationID);
    res.status(200).json(conversationHistory);
  } catch (e) {
    console.log("Got an error:", e);
    res.sendStatus(500).json({ error: "Could not retrieve conversation" });
  }
}

async function getConversationsList(req, res) {
  try {
    const conversationList = await retrieveConversationList();
    // TODO remove comment here
    console.log("conversationList: ", conversationList);
    res.status(200).json(conversationList);
  } catch (e) {
    console.log("Got an error:", e);
    res.sendStatus(500).json({ error: "Could not retrieve conversation list" });
  }
}

module.exports = {
  gptReply,
  getConversation,
  postNewMessage,
  getConversationsList,
};
