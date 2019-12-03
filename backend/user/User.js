const express = require('express');

const router = express.Router();
const signIn = require('../routers/user_routers/SignIn');
const signUp = require('../routers/user_routers/SignUp');
const signInValidator = require('../routers/middlewares/user_meddlewares/ValidateSignIn.js');
const signUpValidator = require('../routers/middlewares/user_meddlewares/ValidateSignUp.js');


router.use('/SignIn', signInValidator);

router.use('/SignIn', signIn);

router.use('/SignUp', signUpValidator);

router.use('/SignUp', signUp);
module.exports = router;
