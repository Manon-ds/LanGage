var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import GPT from "../gpt/gptAPI.js";
import { _postMessage, retrieveConversation, retrieveConversationList, addGPTReplyProp, } from "../models/messageModel.js";
import { reduceAndSortConversationHistory } from "../util.js";
function postNewMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMessageWithID = yield _postMessage(req.body);
            res.status(200).json(newMessageWithID);
        }
        catch (e) {
            console.error("New message post failed:", e);
            res.status(500).json({ error: "New message post failed" });
        }
    });
}
function gptReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { role, content, conversationID, _id } = req.body;
            const userMessage = { role, content };
            const dbConversationHistory = yield retrieveConversation(conversationID);
            const conversationHistory = reduceAndSortConversationHistory(dbConversationHistory);
            const gptOutput = yield GPT.main(userMessage, conversationHistory);
            const reply = gptOutput.message;
            reply.conversationID = conversationID;
            const replyWithID = yield _postMessage(reply);
            yield addGPTReplyProp(replyWithID.content, _id);
            res.status(200).json(replyWithID);
        }
        catch (e) {
            console.log("🤖AI call failed:", e);
            res.status(500).json({ error: `AI reply failed: ${e}` });
        }
    });
}
function getConversation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conversationID = req.params.id;
            const conversationHistory = yield retrieveConversation(conversationID);
            res.status(200).json(conversationHistory);
        }
        catch (e) {
            console.log("Got an error:", e);
            res.status(500).json({ error: "Could not retrieve conversation" });
        }
    });
}
function getConversationsList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conversationList = yield retrieveConversationList();
            res.status(200).json(conversationList);
        }
        catch (e) {
            console.log("Got an error:", e);
            res.status(500).json({ error: "Could not retrieve conversation list" });
        }
    });
}
export {
    gptReply,
    getConversation,
    postNewMessage,
    getConversationsList,
};
