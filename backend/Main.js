const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRouter = require('./routers/user_routers/UserRouter.js');
const messageRouter = require('./routers/message_routers/MessageRouter.js');
const messageWebSocket = require('./routers/message_routers/MessageWebSocet');

app.listen(3000);
app.use(bodyParser.json());

app.use('/user/', userRouter);
app.use('/topics/', messageRouter);
messageWebSocket;
