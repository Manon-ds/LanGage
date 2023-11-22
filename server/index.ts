import { port } from "./config";
import express from 'express'
const app = express();
const router = require("./router");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

const server = app.listen(port, () => console.log(`server is running on port ${port}`));

module.exports = { app, server };
