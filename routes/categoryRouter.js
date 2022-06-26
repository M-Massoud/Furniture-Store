const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/categoryController");
const validationMW = require("../middlewares/validationMW");
const router = express.Router();

router
  .route("/category")
  .get(controller.getAllCategorys)
  .post(
    [
      body("id").isEmpty().withMessage("Category id shoud be number"),
      body("title").isAlpha().withMessage("title shoud be alpha"),
    ],
    validationMW,
    controller.createCategory
  )
  .put(
    [
    //   body("id").isEmpty().withMessage("Category id shoud be number"),
      body("title").isAlpha().withMessage("title shoud be alpha"),
    ],
    controller.updateCategory
  );

router
  .route("/category/:id")
  .get(controller.getCategoryById)
  .delete(body("_id").isObject().isEmpty(), controller.deleteCategory);

module.exports = router;
