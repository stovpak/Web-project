const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SignIn = require('./routers/SignIn');
const SignUp = require('./routers/SignUp');

app.listen(3000);
app.use(bodyParser.json());


app.use('/SignIn', SignIn);

app.use('/SignUp', SignUp);
