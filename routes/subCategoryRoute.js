const express = require('express');
const { body,param } = require('express-validator');
const controller = require('../controllers/subCategoryController');
const validationMW = require('../middlewares/validationMW');
const router = express.Router();
const authMW = require('../middlewares/authMW');
const adminAuthorizationMW = require('../middlewares/adminAuthorizationMW');

const authFunction = (request, response, next) => {
  if (request.role == 'admin') next();
  else {
    let error = new Error("Not authorized, you don't have the permission");
    error.status = 403;
    next(error);
  }
};
router
  .route('/subCategory')
  .get(controller.getAllsubCategories)
  .post(
    authMW,
    adminAuthorizationMW,
    [
      body('id').isEmpty().withMessage('Category id shoud be number'),
      body('title').isAlpha().withMessage('Category title shoud be characters'),
      body('products')
        .optional()
        .isNumeric()
        .withMessage('products ids should be number'),
    ],

    validationMW,
    controller.createsubCategory
  )
  .put(
    authMW,
    adminAuthorizationMW,
    [
      body('title').isAlpha().withMessage('Category title shoud be characters'),
      body('products')
        .optional()
        .isArray()
        .withMessage('products ids should be number'),
    ],

    validationMW,
    controller.updatesubCategory
  );

router
  .route('/subCategory/:id')
  .get(controller.getsubCategoryById)
  .delete(
    authMW,
    adminAuthorizationMW,
    param('id')
      .isObject()
      .withMessage('category id should be number')
      .isEmpty()
      .withMessage("category id shouldn't be empty"),
    validationMW,
    controller.deletesubCategory
  );

module.exports = router;
