const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const controller = require('./../controllers/productsController');
const validationMW = require('../middlewares/validationMW');

router
  .route('/products/:id')
  .get(controller.getSpecificProduct)
  .delete(controller.deleteProduct);

router
  .route('/products')
  .get(controller.getAllProducts)
  .post(
    [
      body('name')
        .isString()
        .withMessage('product name is required and should be string'),
      body('description')
        .isString()
        .withMessage('product description is required and should be string'),
      body('stockAmount')
        .optional()
        .isNumeric()
        .withMessage('product stock should be number'),
      body('price')
        .isNumeric()
        .withMessage('product price is required and should be a number'),
      body('subCategory')
        .isObject()
        .withMessage('product sub categordy is required '),
    ],

    validationMW,
    controller.addNewProduct
  )
  .put(
    [
      body('name')
        .optional()
        .isString()
        .withMessage('product name is required and should be string'),
      body('description')
        .optional()
        .isString()
        .withMessage('product description is required and should be string'),
      body('stockAmount')
        .optional()
        .isNumeric()
        .withMessage('product stock should be number'),
      body('price')
        .optional()
        .isNumeric()
        .withMessage('product price is required and should be a number'),
      body('subCategory')
        .optional()
        .isObject()
        .withMessage('product sub categordy is required '),
    ],

    validationMW,
    controller.updateProduct
  );

module.exports = router;
