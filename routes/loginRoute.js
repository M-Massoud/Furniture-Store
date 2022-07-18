const express=require("express");
const controller=require("../controllers/loginController");
const route=express.Router();

route.post("/login-user",controller.loginUser);
route.post("/login-Admin",controller.loginAdmin);

module.exports=route;