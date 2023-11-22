interface Message{
  _id: string,
  role: string,
  content: string,
  conversationID: number,
  reply: null | string,
  timestamp: number,
  __v: number}


function reduceAndSortConversationHistory(dbConversationHistory: Message[]) {
  const sortedShortenedHistory = dbConversationHistory
  // Take the conversation history array, sort it from oldest to newest.
    .sort((a, b) => a.timestamp - b.timestamp)
    // Slice the array to create a copy containing the last 6 entries.
    .slice(-6);
// Map over the 6 entries and create objects for each one, extracting the role and content from each entry.
  const transformedHistory = sortedShortenedHistory.map((entry) => ({
    role: entry.role,
    content: entry.content,
  }));
  return transformedHistory;
}

module.exports = { reduceAndSortConversationHistory };
