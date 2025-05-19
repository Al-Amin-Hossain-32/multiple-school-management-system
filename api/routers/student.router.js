const express = require('express');
const { createNewStudent } = require('../controlers/student.controller');

const router = express.Router();

router.post("/createStudent", createNewStudent);
module.exports = router;


// router.post("/create", createFee);
// router.get("/all", getFees);

// module.exports = router;