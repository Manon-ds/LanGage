/* eslint-disable no-undef */
// const express = require('express');
// const router = require('../router');
const request = require('supertest');
// const TestMessage = require('./testSchema');
// const LanGageMessage = require('../models/messageSchema')
const {app, server } = require('../index');

const mongoose = require('mongoose');
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

const mockGPTReply = {
  role: 'Test Role',
  content: 'GPT Reply Content',
}




describe('Endpoint tests', () => {
  beforeAll(() => {

  })

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    server.close();

    done()
  })

  it("should post user message", async () => {
    const res = await request(app)
        .post("/messages/user")
        .set('Content-type', 'application/json')
        .send(mockMessage.message)
        .expect(200);

    expect(res.body.content).toEqual(mockMessage.result.content);
});

  it.only('should retrieve a reply from ChatGPT and assign the id number to it.', async () => {
    const res = await request(app)
      .post("/messages/gpt")
      .set('Content-type', 'application/json')
      .send(mockMessage.message)
      .expect(200);

      expect(res.body.content).toBe(mockGPTReply.content);
  })

})



  // beforeEach(async () => {
  //   await mongoose.connect(MONGODB_URI);
  // });


  // afterEach(async () => {
  //   await mongoose.connection.close();
  //   jest.restoreAllMocks();
  // });

  //router.post("/messages/user", postNewMessage);
