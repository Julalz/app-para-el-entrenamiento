"use strict";

require(`dotenv`).config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./src/routes/userRouter");
const exerciseRouter = require("./src/routes/exerciseRouter");
const exerciseImagesRoutes = require("./src/routes/exerciseImagesRoutes");
const fileUpload = require("express-fileupload");

const app = express();
const { PORT } = process.env;
const port = PORT | 3000;

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/images", exerciseImagesRoutes);

app.listen(port, () => console.log(`Running ${PORT}`));
