const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/adminController");
const validationMW = require("../middlewares/validationMW");

const router = express.Router();

router
  .route("/admin")
  .get(controller.getAllAdmins)
  .post(
    [
      body("id").isEmpty().withMessage("admin id shoud be number"),
      body("firstName").isAlpha().withMessage("first name shoud be alpha"),
      body("lastName").isAlpha().withMessage("last name shoud be alpha"),
      body("password").isString().isStrongPassword().withMessage("Password shoud be a string"),
      body("email")
        .isEmail()
        .withMessage("admin email shoud be like example@email.com"),
    ],
    validationMW,
    controller.createAdmin
  )
  .put(
    [
      body("firstName").isAlpha().withMessage("first name shoud be alpha"),
      body("lastName").isAlpha().withMessage("last name shoud be alpha"),
      body("password").isString().isStrongPassword().withMessage("Password shoud be a string"),
      body("email")
        .isEmail()
        .withMessage("admin email shoud be like example@email.com"),
    ],
    controller.updateAdmin
  );

router
  .route("/admin/:id")
  .get(controller.getAdminById)
  .delete(body("_id").isObject().isEmpty(), controller.deleteAdmin);

module.exports = router;
