const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userFunctionalityRouter = require('./routers/user_routers/UserRouter.js');
const messageFunctionalityRouter = require('./routers/message_routers/MessageRouter.js');
const messageWebSocket = require('./routers/message_routers/MessageWebSocket');

app.listen(3000);
app.use(bodyParser.json());

app.use('/user/', userFunctionalityRouter);
app.use('/topics/', messageFunctionalityRouter);
messageWebSocket;
