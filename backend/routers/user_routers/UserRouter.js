const express = require('express');

const router = express.Router();
const signIn = require('./SignIn');
const signUp = require('./SignUp');
const signInValidator = require('../middlewares/user_meddlewares/ValidateSignIn.js');
const signUpValidator = require('../middlewares/user_meddlewares/ValidateSignUp.js');


router.use('/sign-in', signInValidator);

router.use('/sign-in', signIn);

router.use('/sign-up', signUpValidator);

router.use('/sign-up', signUp);
module.exports = router;
