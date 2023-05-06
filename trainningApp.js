"use strict";

require(`dotenv`).config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const { PORT } = process.env;
const port = PORT | 3000;

app.listen(port, () => console.log(`Running ${PORT}`));
