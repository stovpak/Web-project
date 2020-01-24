const express = require('express');

const router = express.Router();
const signIn = require('./SignIn.js');
const signUp = require('./SignUp.js');
const signInValidator = require('../middlewares/user_middlewares/ValidateSignInMiddleware.js');
const signUpValidator = require('../middlewares/user_middlewares/ValidateSignUpMiddleware.js');
const updateUserPersonalData = require('./ChangeUserPersonalData.js');
const userPersonalDataValidator = require('../middlewares/user_middlewares/ValidateUserPersonalDataMiddleware.js');
const changePassword = require('./ChangePassword.js');
const changeEmail = require('./ChangeEmail.js');

router.use('/sign-in', signInValidator);

router.use('/sign-in', signIn);

router.use('/sign-up', signUpValidator);

router.use('/sign-up', signUp);

router.use('/profile/change-data/send', userPersonalDataValidator);

router.use('/profile/change-data/send', updateUserPersonalData);

router.use('/profile/change-pass/send', changePassword);

router.use('/profile/change-email/send', changeEmail);

module.exports = router;
