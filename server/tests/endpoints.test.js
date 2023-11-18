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



describe('End to end tests', () => {

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

  it("should get conversation", async () => {
    const res = await request(app)
        .get("/messages/1")
        .set('Content-type', 'application/json')
        .expect(200)
    expect(res.body[0].content).toEqual("content");
  });
  it("should get status 200", async () => {
    await request(app)
        .get("/messages/1")
        .set('Content-type', 'application/json')
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
      })
  });

  it("should translate text", async () => {
    const res = await request(app)
        .post("/translate/word")
        .set('Content-type', 'application/json')
        .send({"word": 'hola'})
        .expect(200)
    expect(res.body).toEqual('hello');
  });
  it("should translate text", async () => {
    await request(app)
        .post("/translate/word")
        .set('Content-type', 'application/json')
        .send({"word": 'hola'})
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
      })
  });



  it("should retrieve a reply from ChatGPT and assign the id number to it.", async () => {
    const res = await request(app)
      .post("/messages/gpt")
      .set("Content-type", "application/json")
      .send(mockMessage.message)
      .expect(200);

    expect(res.body.conversationID).toBe(mockMessage.message.conversationID);
  });

  it("should retrieve a list of all conversations from the database", async () => {
    const res = await request(app).get("/messages/conversations").expect(200);

    expect(res.body.length).toBeGreaterThan(1);
  });
})
