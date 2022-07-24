const express = require("express");
const mongoose = require("mongoose");
const controller = require("../controllers/searchController");

const router = express.Router();
router
    .route("/search/:key")
    .get(controller.searchProducts)
module.exports = router;
