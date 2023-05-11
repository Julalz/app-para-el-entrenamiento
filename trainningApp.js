"use strict";

require(`dotenv`).config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./src/routes/userRouter");
const exerciseRouter = require("./src/routes/exerciseRouter");

const app = express();
app.use(express.json());

const { PORT } = process.env;
const port = PORT | 3000;

app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log(`Running ${PORT}`));
