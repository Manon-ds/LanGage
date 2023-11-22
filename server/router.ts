import express from 'express'
const router = express.Router();

import { gptReply, postNewMessage, getConversation, getConversationsList } from './controllers/messagesController';

import { translateText } from './controllers/translationController';

router.post("/messages/gpt", gptReply);
router.post("/messages/user", postNewMessage);
router.get("/messages/conversations", getConversationsList);
router.get("/messages/:id", getConversation);
router.post("/translate/word", translateText);

export default router;