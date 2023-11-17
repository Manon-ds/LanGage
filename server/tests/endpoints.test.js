/* eslint-disable no-undef */
// const express = require('express');
// const router = require('../router');
const request = require('supertest');
// const TestMessage = require('./testSchema');
// const LanGageMessage = require('../models/messageSchema')
const app = require('../index');

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
  // const app = express();
  // app.use(express.json);
  // app.use(router);
  // const request = supertest(app);
  // test.only('Should post a user message to the DB', async () => {
  //   await request.post('/messages/user', ).send(mockMessage.message);
  //   const message = await LanGageMessage.findOne({conversationID: mockMessage.result.conversationID});
  //   expect(message.content).toBe(mockMessage.message.content);
  // })

  beforeAll(done => {
    done()
  })

  afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    app.close();

    done()
  })

  it("should post user message", async () => {
    const res = await request(app)
        .post("/messages/user")
        .set('Content-type', 'application/json')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
        .send(mockMessage.message)
        .expect(200);

    expect(res.body.content).toEqual(mockMessage.result.content);

});

})



  // beforeEach(async () => {
  //   await mongoose.connect(MONGODB_URI);
  // });


  // afterEach(async () => {
  //   await mongoose.connection.close();
  //   jest.restoreAllMocks();
  // });

  //router.post("/messages/user", postNewMessage);
