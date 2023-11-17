const router = require("express").Router();
const {
  // gptReply,
  getConversation,
  postNewMessage,
  getConversationsList,
} = require("./controllers/messagesController");
const { gptReplyTest } = require("./tests/testControllers");
const { translateText } = require("./controllers/translationController");

//router.post("/messages/gpt", gptReply);
router.post("/messages/gpt", gptReplyTest);
router.post("/messages/user", postNewMessage);
router.get("/messages/conversations", getConversationsList);
router.get("/messages/:id", getConversation);
router.post("/translate/word", translateText);

module.exports = router;
