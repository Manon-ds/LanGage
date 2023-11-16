/* eslint-disable no-undef */
const mongoose = require("mongoose");
const { postMessage, retrieveConversation } = require("../models/messageModel.js");
// const request = require("supertest");

const MONGODB_URI = "mongodb://localhost:27017/lanGageMessagesdb";

const mockMessage = {
  result: {
    role: "Test Role",
    content: "Test Content",
    timestamp: Date.now(),
    conversationID: 1,
    reply: null,
  },
  result1: {
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
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await postMessage(undefined);
    expect(consoleSpy).toHaveBeenCalledWith(
      "User message not posted:",
      expect.objectContaining({
        message: expect.stringContaining("LanGageMessage validation failed"),
      })
      );
      consoleSpy.mockRestore();
    });
  });

  describe("retrieveConversation testing", () => {
    it("should find and return messages with a certain id", async () => {
      const data = await retrieveConversation(mockMessage.message.conversationID);
      expect(data[0].content).toBe(mockMessage.result.content);
    });

    it.only("should console log an error when conversations fail to retrieve", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    await expect(retrieveConversation(undefined)).rejects.toThrowError;
    // console.log("Conversation retrieval failed:")
    expect(consoleSpy).toHaveBeenCalledWith(
      "Conversation retrieval failed:",
      expect.anything()
    )
    consoleSpy.mockRestore();
  })
});

afterEach(async () => {
  await mongoose.connection.close();
  jest.restoreAllMocks();
});
