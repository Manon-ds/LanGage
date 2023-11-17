/* eslint-disable no-undef */
// const express = require('express');
// const router = require('../router');
const request = require("supertest");
// const TestMessage = require('./testSchema');
// const LanGageMessage = require('../models/messageSchema')
const { app, server } = require("../index");

const mongoose = require("mongoose");
// const MONGODB_URI = "mongodb://localhost:27017/testMessagesdb";

const mockMessage = {
  result: {
    role: "Test Role",
    content: "Test Content",
    timestamp: Date.now(),
    conversationID: 99,
    reply: null,
  },
  message: {
    role: "Test Role",
    content: "Test Content",
    conversationID: 99,
  },
};

describe("Endpoint tests", () => {
  beforeAll(() => {});

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    server.close();

    done();
  });

  it("should post user message", async () => {
    const res = await request(app)
      .post("/messages/user")
      .set("Content-type", "application/json")
      .send(mockMessage.message)
      .expect(200);

    expect(res.body.content).toEqual(mockMessage.result.content);
  });

  it("should retrieve a reply from ChatGPT and assign the id number to it.", async () => {
    const res = await request(app)
      .post("/messages/gpt")
      .set("Content-type", "application/json")
      .send(mockMessage.message)
      .expect(200);

    expect(res.body.conversationID).toBe(mockMessage.message.conversationID);
  });

  // testing router.get("/messages/conversations", getConversationsList);
  it("should retrieve a list of all conversations from the database", async () => {
    const res = await request(app).get("/messages/conversations").expect(200);

    expect(res.body.length).toBeGreaterThan(1);
  });
});

// beforeEach(async () => {
//   await mongoose.connect(MONGODB_URI);
// });

// afterEach(async () => {
//   await mongoose.connection.close();
//   jest.restoreAllMocks();
// });

//router.post("/messages/user", postNewMessage);
