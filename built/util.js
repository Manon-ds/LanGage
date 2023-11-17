function reduceAndSortConversationHistory(dbConversationHistory) {
    const sortedShortenedHistory = dbConversationHistory
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(-6);
    const transformedHistory = sortedShortenedHistory.map((entry) => ({
        role: entry.role,
        content: entry.content,
    }));
    return transformedHistory;
}
module.exports = { reduceAndSortConversationHistory };
