/* eslint-disable no-undef */
const mongoose = require("mongoose");
// const request = require("supertest");
// const index = require("../index");
// const { expect } = require('jest');

const MONGODB_URI = "mongodb://localhost:27017/lanGageMessagesdb"

const { postMessage } = require("../models/messageModel.js");

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
    name: 'Richard'
  },
  message : {
    role: "Test Role",
    content: "Test Content",
    conversationID: 1,
  }
};

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

// TODO: Expand describe to cover whole file and build it tests for each function.
  test(" goodPath should return a new message with ID",  async () => {
    const data =  await postMessage(mockMessage.message);
    expect(data.content).toBe(mockMessage.result.content);
  });



// describe("postMessage", () => {
//   it(" goodPath should return a new message with ID", async () => {
//     const data = await postMessage(mockMessage.message);
//     expect(data).toEqual(mockMessage.result);
//   });
// });
// it("badPath should log an error", async () => {});