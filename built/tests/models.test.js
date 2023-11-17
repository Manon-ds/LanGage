/* eslint-disable no-undef */
const mongoose = require("mongoose");
const TestMessage = require("./testSchema.js");
const { postMessage, retrieveConversation, retrieveConversationList, addGPTReplyProp } = require("./testModels.js");
// const request = require("supertest");
const MONGODB_URI = "mongodb://localhost:27017/testMessagesdb";
const mockMessage = {
    result: {
        role: "Test Role",
        content: "Test Content",
        timestamp: Date.now(),
        conversationID: 1,
        reply: null,
    },
    message: {
        role: "Test Role",
        content: "Test Content",
        conversationID: 1,
    },
};
// TODO: Expand describe to cover whole file and build it tests for each function.
beforeEach(async () => {
    await mongoose.connect(MONGODB_URI);
});
describe("postMessage testing", () => {
    it("goodPath should return a new message with ID", async () => {
        const data = await postMessage(mockMessage.message);
        expect(data.role).toBe(mockMessage.result.role);
    });
    it("error thrown when there is no message passed", async () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await postMessage(undefined);
        expect(consoleSpy).toHaveBeenCalled();
        // .toHaveBeenCalledTimes(
        //   "User message not posted:",
        //   expect.objectContaining({
        //     message: expect.stringContaining("LanGageMessage validation failed"),
        //   })
        //   );
        consoleSpy.mockRestore();
    });
});
describe("retrieveConversation testing", () => {
    it("should find and return messages with a certain id", async () => {
        const data = await retrieveConversation(mockMessage.message.conversationID);
        expect(data[0].content).toBe(mockMessage.result.content);
    });
    it("should console log an error when conversations fail to retrieve", async () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
        await retrieveConversation(undefined);
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
// TODO: Expand describe to cover whole file and build it tests for each function.
test(" goodPath should return a new message with ID", async () => {
    const data = await postMessage(mockMessage.message);
    expect(data.content).toBe(mockMessage.result.content);
});
test('should return conversation list', async () => {
    const data = await retrieveConversationList("conversationID");
    const result = await TestMessage.distinct("conversationID");
    expect(data).toEqual(result);
});
test('should log an error when conversation list not retrieved', async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
    await retrieveConversationList(undefined);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
    // const result = await TestMessage.distinct(undefined);
    // console.log(result);
    // await expect(TestMessage.distinct(undefined)).toThrow();
});
test('should ad reply prop', async () => {
    addGPTReplyProp("reply", '65573664105c707a4b91a932');
    const res = await TestMessage.find({ _id: '65573664105c707a4b91a932' });
    expect(res[0].reply).toEqual("reply");
});
// test.only('error thrown when there is no message passed', async () => {
//   const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
//    await addGPTReplyProp('undefined');
//   expect(consoleSpy).toHaveBeenCalled();
//   consoleSpy.mockRestore();
// });
afterEach(async () => {
    await mongoose.connection.close();
    jest.restoreAllMocks();
});
