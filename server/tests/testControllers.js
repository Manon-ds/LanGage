// const GPT = require("../gpt/gptAPI");
const {
  postMessage,
  retrieveConversation,
  addGPTReplyProp,
} = require("../models/messageModel");
const { reduceAndSortConversationHistory } = require("../util.js");


const mockGPTReply = {
  role: 'Test Role',
  content: 'GPT Reply Content',
}


async function gptReplyTest(req, res) {
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


    const reply = mockGPTReply//TODO
    //const gptOutput = await GPT.main(userMessage, conversationHistory);

    // Isolate the response message.
    // const reply = gptOutput.message;

    // Assign the reply a conversation ID. This was extracted from the request body on line 26.
    reply.conversationID = conversationID;
    console.log(reply);
    // Post the reply from GPT to the database, it is then assigned an id from MongoDB.
    const replyWithID = await postMessage(reply);
    // Add the chatGPT reply to the database?
    await addGPTReplyProp(replyWithID.content, _id);
    // Send a 200 status and a json object containing the replyWithID.
    // Test here -
    res.status(200).json(reply);
  } catch (e) {
    console.log("AI call failed:", e);
    res.status(500).json({ error: "AI reply failed" });
  }
}

module.exports = {
  gptReplyTest
};
