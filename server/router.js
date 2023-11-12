const router = require('express').Router();
const { gptReply, getConversation, postNewMessage, getConversationsList } = require('./controllers/messagesController')
const { translateWord } = require('./controllers/translationController')


router.post('/messages/gpt', gptReply);
router.post('/messages/user', postNewMessage);
router.get('/messages/conversations', getConversationsList);
router.get('/messages/:id', getConversation);
router.post('/translate/word', translateWord);


module.exports = router;