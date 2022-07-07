const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const controller = require('./../controllers/productsController');
const validationMW = require('../middlewares/validationMW');
const authMW = require('./../middlewares/authMW');

const authFunction = (request, response, next) => {
  if (request.role == 'admin') next();
  else {
    let error = new Error("Not authorized, you don't have the permission");
    error.status = 403;
    next(error);
  }
};

// upload product image functionality
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/products-imgs');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

////////////////////////////////

router
  .route('/products/:id')
  .get(controller.getSpecificProduct)
  .delete(authMW, authFunction, controller.deleteProduct);

router
  .route('/products')

  .get(controller.getAllProducts)
  .post(
    upload.single('image'),

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

    authMW,
    authFunction,
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
    authMW,
    authFunction,
    controller.updateProduct
  );

module.exports = router;
