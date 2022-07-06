const express=require("express");
const controller=require("../controllers/loginAdminController.js");
const route=express.Router();

route.post("/login-Admin",controller.loginAdmin);

module.exports=route;