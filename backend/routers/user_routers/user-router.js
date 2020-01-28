const express = require('express');

const router = express.Router();
const signIn = require('./sign-in.js');
const signUp = require('./sign-up.js');
const signInValidator = require('../middlewares/user_middlewares/validate-sign-in-middleware.js');
const signUpValidator = require('../middlewares/user_middlewares/validate-sign-up-middleware.js');
const updateUserPersonalData = require('./change-user-personal-data.js');
const userPersonalDataValidator = require('../middlewares/user_middlewares/validate-personal-data-middleware.js');
const changePassword = require('./change-password.js');
const changeEmail = require('./change-email.js');

router.use('/sign-in', signInValidator);

router.use('/sign-in', signIn);

router.use('/sign-up', signUpValidator);

router.use('/sign-up', signUp);

router.use('/profile/change-data/send', userPersonalDataValidator);

router.use('/profile/change-data/send', updateUserPersonalData);

router.use('/profile/change-pass/send', changePassword);

router.use('/profile/change-email/send', changeEmail);

module.exports = router;
