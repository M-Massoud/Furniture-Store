const express = require('express');
const { body,param } = require('express-validator');
const controller = require('../controllers/categoryController');
const validationMW = require('../middlewares/validationMW');
const authMW = require('../Middlewares/authMW');
const adminAuthorizationMW = require('../middlewares/adminAuthorizationMW');
const router = express.Router();

router
  .route('/category')
  .get(controller.getAllCategories)
  .post(
    authMW,
    adminAuthorizationMW,
    [
      body('title')
        .isString()
        .withMessage('Category title shoud be characters'),
      body('subCategory')
        .optional()
        .isNumeric()
        .withMessage('sub Category should be number'),
    ],
    validationMW,
    controller.createCategory
  )
  .put(
    authMW,
    adminAuthorizationMW,
    [
      body('title')
        .isString()
        .withMessage('Category title shoud be characters'),
      body('subCategory')
        .optional()
        .isNumeric()
        .withMessage('sub category should be number'),
    ],
    validationMW,
    controller.updateCategory
  );

router
  .route('/category/:id')
  .get(controller.getCategoryById)
  .delete(
    authMW,
    adminAuthorizationMW,
    param('id')
      .isNumeric()
      .withMessage('category id is required and should be number'),
    validationMW,
    controller.deleteCategory
  );

module.exports = router;
