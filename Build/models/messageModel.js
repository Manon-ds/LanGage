var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Message as LanGageMessage } from "./messageSchema.js";
export function _postMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMessageWithId = yield LanGageMessage.create(message);
            return newMessageWithId;
        }
        catch (e) {
            console.log("User message not posted:", e);
        }
    });
}
export function retrieveConversation(conversationID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conversationByID = yield LanGageMessage.find({
                conversationID: conversationID,
            });
            return conversationByID;
        }
        catch (e) {
            console.log("Conversation retrieval failed:", e);
            throw e;
        }
    });
}
export function retrieveConversationList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conversationList = yield LanGageMessage.distinct("conversationID");
            return conversationList;
        }
        catch (e) {
            console.log("Conversation list retrieval failed:", e);
            throw e;
        }
    });
}
export function addGPTReplyProp(gptReply, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield LanGageMessage.updateOne({ _id: id }, { $set: { reply: gptReply } });
        }
        catch (e) {
            console.log("User message not posted:", e);
        }
    });
}
