const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRouter = require('./user/User');


app.listen(3000);
app.use(bodyParser.json());

app.use('/User/', userRouter);
