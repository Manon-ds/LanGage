/* eslint-disable no-undef */
const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const TestMessage = require('./testSchema');

// const mongoose = require('mongoose');
// const MONGODB_URI = "mongodb://localhost:27017/testMessagesdb";


const mockMessage = {
  result: {
    role: "Test Role",
    content: "Test Content",
    timestamp: Date.now(),
    conversationID: 99,
    reply: null,
  },
  message : {
    role: "Test Role",
    content: "Test Content",
    conversationID: 99,
  },
};


describe('End to end tests', () => {
  const app = express();
  app.use(express.json);
  app.use(router);

  const request = supertest(app);

  // beforeEach(async () => {
  //   await mongoose.connect(MONGODB_URI);
  // });


  // afterEach(async () => {
  //   await mongoose.connection.close();
  //   jest.restoreAllMocks();
  // });

  //router.post("/messages/user", postNewMessage);
  test.only('Should post a user message to the DB', async () => {
    await request.post('/messages/user', ).send(mockMessage.message);

    const message = await TestMessage.findOne({conversationID: mockMessage.result.conversationID});

    expect(message.content).toBe(mockMessage.message.content);

  })

})