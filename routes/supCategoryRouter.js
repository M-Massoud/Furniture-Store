const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/supCategoryController");
const validationMW = require("../middlewares/validationMW");
const router = express.Router();

router
  .route("/supCategory")
  .get(controller.getAllSupCategorys)
  .post(
    [
      body("id").isEmpty().withMessage("Category id shoud be number"),
      body("title").isAlpha().withMessage("title shoud be alpha"),
    ],
    validationMW,
    controller.createSupCategory
  )
  .put(
    [
    //   body("id").isEmpty().withMessage("Category id shoud be number"),
      body("title").isAlpha().withMessage("title shoud be alpha"),
    ],
    controller.updateSupCategory
  );

router
  .route("/supCategory/:id")
  .get(controller.getSupCategoryById)
  .delete(body("_id").isObject().isEmpty(), controller.deleteSupCategory);

module.exports = router;
