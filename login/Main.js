const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const signIn = require('./routers/SignIn');
const signUp = require('./routers/SignUp');
const signInValidator = require('./routers/middlewares/ValidateSignIn.js');
const signUpValidator = require('./routers/middlewares/ValidateSignUp.js');


app.listen(3000);
app.use(bodyParser.json());


app.use('/SignIn', signInValidator);

app.use('/SignIn', signIn);

app.use('/SignUp', signUpValidator);

app.use('/SignUp', signUp);
