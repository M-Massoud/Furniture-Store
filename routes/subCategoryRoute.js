const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/subCategoryController');
const validationMW = require('../middlewares/validationMW');
const router = express.Router();
const authMW = require('../middlewares/authMW');
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
    [
      body('id').isEmpty().withMessage('Category id shoud be number'),
      body('title').isAlpha().withMessage('Category title shoud be alpha'),
    ],
    authMW,
    authFunction,
    validationMW,
    controller.createsubCategory
  )
  .put(
    [
      //   body("id").isEmpty().withMessage("Category id shoud be number"),
      body('title').isAlpha().withMessage('Category title shoud be alpha'),
    ],
    authMW,
    authFunction,
    validationMW,
    controller.updatesubCategory
  );

router
  .route('/subCategory/:id')
  .get(controller.getsubCategoryById)
  .delete(
    body('_id').isObject().isEmpty(),
    authMW,
    authFunction,
    controller.deletesubCategory
  );

module.exports = router;
