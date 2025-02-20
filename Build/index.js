import config from "./config.js";
import express from 'express';
const app = express();
import router from"./router.js";
import cors from"cors";
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
const server = app.listen(config.port, () => console.log(`server is running on port ${config.port}`));
module.exports = { app, server };
