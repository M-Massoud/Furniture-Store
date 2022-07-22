const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const controller = require('./../controllers/productsController');
const validationMW = require('../middlewares/validationMW');
const authMW = require('./../middlewares/authMW');
const adminAuthorizationMW = require('../middlewares/adminAuthorizationMW');

const { unlink } = require('node:fs/promises');

// const authFunction = (request, response, next) => {
//   if (request.role == 'admin') next();
//   else {
//     let error = new Error("Not authorized, you don't have the permission");
//     error.status = 403;
//     next(error);
//   }
// };

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
  .delete(authMW, adminAuthorizationMW, controller.deleteProduct);

router
  .route('/products')

  .get(controller.getAllProducts)
  .post(
    authMW,
    adminAuthorizationMW,
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
    controller.addNewProduct
  )
  .put(
    authMW,
    adminAuthorizationMW,
    upload.single('image'),

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
//sort price
router.route("/lowprice").get(controller.sortLowPriceProducts);
router.route("/highprice").get(controller.sortHighPriceProducts);
//filter price
router.route("/highPrice/:key").get(controller.highPriceProducts);
router.route("/lessPrice/:key").get(controller.lessPriceProducts);
module.exports = router;

