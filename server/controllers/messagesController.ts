// @ts-ignore
import GPT from "../gpt/gptAPI";
import { Response, Request } from 'express';

import {
  postMessage,
  retrieveConversation,
  retrieveConversationList,
  addGPTReplyProp,
} from "../models/messageModel";
import { reduceAndSortConversationHistory } from "../util";

//TODO Make this one function wihtin the controllers, removing extra functionality from the model.

//TODO: Possible refactor: change concateneated error logs to template literals. IF TIME!

interface Message{
  _id: string,
  role: string,
  content: string,
  conversationID: number,
  reply: null | string,
  timestamp: number,
  __v: number}


export async function postNewMessage(req: Request , res: Response){
  try {
    const newMessageWithID: Message = await postMessage(req.body);
    res.status(200).json(newMessageWithID);
  } catch (e) {
    console.error("New message post failed:", e);
    res.status(500).json({ error: "New message post failed" });
  }
}

export async function gptReply(req: Request, res: Response) {
  try {
    const { role, content, conversationID, _id }: {role: string, content: string, conversationID: number, _id: string} = req.body;
    const userMessage = { role, content };
    //console.log(userMessage);
    const dbConversationHistory = await retrieveConversation(conversationID);
    // console.log(dbConversationHistory);
    const conversationHistory = reduceAndSortConversationHistory(
      dbConversationHistory
      );
      console.log(conversationHistory);


    const gptOutput = await GPT.main(userMessage, conversationHistory);
    const reply = gptOutput.message;
    reply.conversationID = conversationID;
    const replyWithID = await _postMessage(reply);
    await addGPTReplyProp(replyWithID.content, _id);
    console.log(`Reply with ID: ${replyWithID}`)
    res.status(200).json(replyWithID);
  } catch (e) {
    console.log("🤖AI call failed:", e);
    res.status(500).json({ error: `AI reply failed: ${e}` });
  }
}
// Think of it as if you are sending the reply from ChatGPT.

export async function getConversation(req: Request, res: Response) {
  try {
    const conversationID = req.params.id;
    const conversationHistory = await retrieveConversation(conversationID);
    res.status(200).json(conversationHistory);
  } catch (e) {
    console.log("Got an error:", e);
    res.status(500).json({ error: "Could not retrieve conversation" });
  }
}

export async function getConversationsList(req: Request, res: Response) {
  try {
    const conversationList = await retrieveConversationList();
    res.status(200).json(conversationList);
  } catch (e) {
    console.log("Got an error:", e);
    res.status(500).json({ error: "Could not retrieve conversation list" });
  }
}
