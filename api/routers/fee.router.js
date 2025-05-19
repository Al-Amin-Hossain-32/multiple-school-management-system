// routes/fee.route.js

const express = require("express");
const { createFee, getFees } = require("../controlers/feesController/fee.controller");

const router = express.Router();

router.post("/create", createFee);
router.get("/all", getFees);

module.exports = router;
