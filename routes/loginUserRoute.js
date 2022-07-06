const express=require("express");
const controller=require("../controllers/loginUserController");
const route=express.Router();

route.post("/login-user",controller.loginUser);

module.exports=route;