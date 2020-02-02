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
const authorizationMiddleware = require('../middlewares/user_middlewares/authorization-middleware.js');
const restorePassword = require('./restore-password.js');
const sendRestorePasswordCode = require('./send-restore-password-key.js');
const restoreKeyMiddleware = require('../middlewares/user_middlewares/validate-is-restore-key-does-exist-middleware');

router.use('/sign-in', signInValidator);

router.use('/sign-in', signIn);

router.use('/sign-up', signUpValidator);

router.use('/sign-up', signUp);

router.use('/profile/change-data/send', authorizationMiddleware);
router.use('/profile/change-data/send', userPersonalDataValidator);
router.use('/profile/change-data/send', updateUserPersonalData);

router.use('/profile/change-pass/send', authorizationMiddleware);
router.use('/profile/change-pass/send', changePassword);
router.use('/profile/change-email/send', authorizationMiddleware);
router.use('/profile/change-email/send', changeEmail);

router.use('/sign-in/forget-password', sendRestorePasswordCode);
router.use('/sign-in/restore-password/send-key', restoreKeyMiddleware);
router.use('/sign-in/restore-password/send-key', restorePassword);

module.exports = router;
