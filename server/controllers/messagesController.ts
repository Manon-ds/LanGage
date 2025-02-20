// @ts-ignore
import GPT from "../gpt/gptAPI";
import { Response, Request } from "express";
import { Document, Types, ObjectId } from "mongoose";
import { gptReplyType } from "../models/modelTypes";

import {
  postMessage,
  retrieveConversation,
  retrieveConversationList,
  addGPTReplyProp,
} from "../models/messageModel";

import { reduceAndSortConversationHistory } from "../util";


export async function postNewMessage(req: Request, res: Response) {
  try {
    const newMessageWithID: gptReplyType | undefined = await postMessage(req.body);
    res.status(200).json(newMessageWithID);
  } catch (e) {
    console.error("New message post failed:", e);
    res.status(500).json({ error: "New message post failed" });
  }
}

export async function gptReply(req: Request, res: Response) {
  try {
    const {
      role,
      content,
      conversationID,
      _id,
    }: { role: string; content: string; conversationID: number; _id: string } =
      req.body;
    const userMessage = { role, content };
    //console.log(userMessage);
    const dbConversationHistory = await retrieveConversation(conversationID);
    // console.log(dbConversationHistory);
    const conversationHistory = reduceAndSortConversationHistory(
      dbConversationHistory
    );
    const gptOutput = await GPT.main(userMessage, conversationHistory);
    const reply = gptOutput.message;
    reply.conversationID = conversationID;
    const replyWithID: any = await postMessage(reply);
    await addGPTReplyProp(replyWithID.content, _id);
    console.log(`Reply with ID: ${replyWithID}`);
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
