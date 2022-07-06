const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/changeUserPasswordController');
const authMW = require('./../Middlewares/authMW');
const userAuthorizationMW = require('./../Middlewares/userAuthorizationMW');
const router = express.Router();

router.post(
  '/changeUserPassword',
  authMW,
  userAuthorizationMW,
  [
    body('oldPassword')
      .isStrongPassword()
      .withMessage(
        'user old Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'
      ),
    body('newPassword')
      .isStrongPassword()
      .withMessage(
        'user new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'
      ),
  ],
  controller.changeUserPassword
);

module.exports = router;
