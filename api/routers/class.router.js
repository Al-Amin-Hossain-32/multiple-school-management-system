const express = require("express");
const router = express.Router();
import { createClass } from "../controlers/class.controller"; 
// ✅ ক্লাস তৈরি করুন
router.post("/create", createClass);

// // 📚 সব ক্লাস লিস্ট করুন
// router.get("/list", ClassController.getAll);

// // 🔍 একটি ক্লাস দেখুন
// router.get("/view/:id", ClassController.getOne);

// // ✏️ ক্লাস আপডেট করুন
// router.put("/update/:id", ClassController.update);

// // ❌ ক্লাস মুছে ফেলুন
// router.delete("/delete/:id", ClassController.remove);

module.exports = router;
