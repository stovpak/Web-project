const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRouter = require('./routers/user_routers/UserRouter');


app.listen(3000);
app.use(bodyParser.json());

app.use('/user/', userRouter);
