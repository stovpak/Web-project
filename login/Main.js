const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SignIn = require('./routers/SignIn');
const SignUp = require('./routers/SignUp');
const SignInValidator = require('./routers/middlewares/SignInValidator.js');
const SignUpValidator = require('./routers/middlewares/SignUpValidator.js');


app.listen(3000);
app.use(bodyParser.json());


app.use('/SignIn', SignInValidator);

app.use('/SignIn', SignIn);

app.use('/SignUp', SignUpValidator);

app.use('/SignUp', SignUp);
