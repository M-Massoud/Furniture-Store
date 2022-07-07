const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/adminController');
const validationMW = require('../middlewares/validationMW');
const adminAuthorizationMW = require('../middlewares/adminAuthorizationMW');
const adminAuthorizationByIdMW = require('../middlewares/adminByIdAuthorizationMW');
const authMW = require('../Middlewares/authMW');

const router = express.Router();

router
  .route('/admin')
  .all(authMW, adminAuthorizationMW)
  // get all admins
  .get(controller.getAllAdmins)
  // create a new admin
  .post(
    [
      body('firstName')
        .isAlpha()
        .withMessage('admin first name shoud be characters'),
      body('lastName')
        .isAlpha()
        .withMessage('admin last name shoud be characters'),
      body('password')
        .isStrongPassword()
        .withMessage(
          'admin Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'
        ),
      body('email')
        .isEmail()
        .withMessage('admin email shoud be like example@email.com'),
    ],
    validationMW,
    controller.createAdmin
  )
  // update admin data
  .put(
    [
      body('firstName')
        .optional()
        .isAlpha()
        .withMessage('admin first name shoud be characters'),
      body('lastName')
        .isAlpha()
        .withMessage('admin last name shoud be characters'),
      body('password')
        .optional()
        .isStrongPassword()
        .withMessage(
          'admin Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'
        ),

      body('email')
        .optional()
        .isEmail()
        .withMessage('admin email shoud be like example@email.com'),
    ],
    validationMW,
    controller.updateAdmin
  );

router
  .route('/admin/:id')
  // get a specific admin
  .get(
    authMW,
    adminAuthorizationByIdMW,
    param('id').isMongoId().withMessage("admin id isn't valid id"),
    validationMW,
    controller.getAdminById
  )
  // delete admin
  .delete(
    authMW,
    adminAuthorizationMW,
    param('id').isMongoId().withMessage("admin id isn't valid id"),
    controller.deleteAdmin
  );

module.exports = router;
