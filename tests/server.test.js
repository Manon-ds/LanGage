const mongoose = require("mongoose");
const request = require("supertest");
const index = require("../server/index");
const { describe } = require("yargs");
const { it } = require("node:test");
const { postMessage } = require("server/models/messageModel.js");

const mockMessage = {
  result: {
    role: "Test Role",
    content: "Test Content",
    timestamp: Date.now,
    conversationID: 1,
    reply: null,
  },
  message : {
    role: "Test Role",
    content: "Test Content",
    conversationID: 1,
  }
};

// TODO: Expand describe to cover whole file and build it tests for each function.
describe("postMessage", () => {
  it(" goodPath should return a new message with ID", async () => {
    const data = await postMessage(mockMessage.message);
    expect(data).toMatch(mockMessage.result);
  });

  // it("badPath should log an error", async () => {});
});
