const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

require("../backend/db.js");

const { authRouter } = require("./controller/auth_controller.js");
const { eventRouter } = require("./controller/event_controller.js");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/v1/user", authRouter);
app.use("/api/v1/event", eventRouter);

app.listen(8080, (req, res) => {
  console.log("port is running at 8080 !!");
});
