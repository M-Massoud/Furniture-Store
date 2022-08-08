const express = require('express');
const { param, body } = require('express-validator');
const controller = require('../controllers/subCategoryController');
const validationMW = require('../middlewares/validationMW');
const router = express.Router();
const authMW = require('../middlewares/authMW');
const adminAuthorizationMW = require('../middlewares/adminAuthorizationMW');

router
  .route('/subCategory')
  .get(controller.getAllSubCategories)
  .post(
    authMW,
    adminAuthorizationMW,
    [
      body('title')
        .isString()
        .withMessage('sub category title shoud be characters'),
      body('products')
        .optional()
        .isArray({ type: Number })
        .withMessage('products should be array of numbers'),
    ],

    validationMW,
    controller.createSubCategory
  )
  .put(
    authMW,
    adminAuthorizationMW,
    [
      body('title')
        .optional()
        .isString()
        .withMessage('sub category title shoud be characters'),
      body('products')
        .optional()
        .isArray({ type: Number })
        .withMessage('products should be array of numbers'),
    ],

    validationMW,
    controller.updateSubCategory
  );

router
  .route('/subCategory/:id')
  .get(controller.getSubCategoryById)
  .delete(
    authMW,
    adminAuthorizationMW,
    param('id')
      .isNumeric()
      .withMessage('not a valid sub category id , should be a number'),
    validationMW,
    controller.deleteSubCategory
  );

// to delete product from subcategory
router
  .route('/deleteProuductFromSubcategory/:id')
  .delete(
    authMW,
    adminAuthorizationMW,
    param('id')
      .isNumeric()
      .withMessage('subcategory id is required and should be number'),
    validationMW,
    controller.deleteProductFromSubcategoryById
  );

router
  .route('/subCategory/updateProducts')
  .put(
    authMW,
    adminAuthorizationMW,
    [
      body('id')
        .isNumeric()
        .withMessage('sub category id shoud be number'),
      body('products')
        .isArray({ type: Number })
        .withMessage('products should be array of numbers'),
    ],
    validationMW,
    controller.updateSubCategoryProducts
  );

router
  .route('/editSubCategory')
  .put(
    authMW,
    adminAuthorizationMW,
    [
      body('id').isNumeric().withMessage('Category id shoud be number'),
      body('title').optional().isString().withMessage('sub category title shoud be characters'),
      body('products').optional().isArray({ type: Number }).withMessage('products should be array of numbers'),
    ],
    validationMW,
    controller.editSubCategory
  );

module.exports = router;
