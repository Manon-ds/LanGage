const GPT = require("../gpt/gptAPI");
// const {Response, Request } = require('express');

const {
  postMessage,
  retrieveConversation,
  retrieveConversationList,
  addGPTReplyProp,
} = require("../models/messageModel");
const { reduceAndSortConversationHistory } = require("../util.js");

//TODO Make this one function wihtin the controllers, removing extra functionality from the model.

//TODO: Possible refactor: change concateneated error logs to template literals. IF TIME!

async function postNewMessage(req , res){
  try {
    const newMessageWithID = await postMessage(req.body);
    res.status(200).json(newMessageWithID);
  } catch (e) {
    console.error("New message post failed:", e);
    res.status(500).json({ error: "New message post failed" });
  }
}

async function gptReply(req, res) {
  try {
    const { role, content, conversationID, _id } = req.body;
    const userMessage = { role, content };
    //console.log(userMessage);
    const dbConversationHistory = await retrieveConversation(conversationID);
    console.log(dbConversationHistory);
    const conversationHistory = reduceAndSortConversationHistory(
      dbConversationHistory
      );
      console.log(conversationHistory);
    const gptOutput = await GPT.main(userMessage, conversationHistory);
    const reply = gptOutput.message;
    reply.conversationID = conversationID;
    const replyWithID = await postMessage(reply);
    await addGPTReplyProp(replyWithID.content, _id);
    res.status(200).json(replyWithID);
  } catch (e) {
    console.log("🤖AI call failed:", e);
    res.status(500).json({ error: `AI reply failed: ${e}` });
  }
}
// Think of it as if you are sending the reply from ChatGPT.

async function getConversation(req, res) {
  try {
    const conversationID = req.params.id;
    const conversationHistory = await retrieveConversation(conversationID);
    res.status(200).json(conversationHistory);
  } catch (e) {
    console.log("Got an error:", e);
    res.status(500).json({ error: "Could not retrieve conversation" });
  }
}

async function getConversationsList(req, res) {
  try {
    const conversationList = await retrieveConversationList();
    res.status(200).json(conversationList);
  } catch (e) {
    console.log("Got an error:", e);
    res.status(500).json({ error: "Could not retrieve conversation list" });
  }
}

module.exports = {
  gptReply,
  getConversation,
  postNewMessage,
  getConversationsList,
};