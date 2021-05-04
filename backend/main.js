const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const userFunctionalityRouter = require("./routers/user_routers/user-router.js");
const messageFunctionalityRouter = require("./routers/message_routers/message-router.js");
const messageWebSocket = require("./routers/message_routers/message-web-socket");
const accessControlRouter = require("./routers/access-control-router.js");

app.listen(3001);
app.use("/", accessControlRouter);
app.use(bodyParser.json());
app.use("/user/", userFunctionalityRouter);
app.use("/topics/", messageFunctionalityRouter);
messageWebSocket;
