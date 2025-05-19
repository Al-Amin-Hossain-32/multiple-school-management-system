// models/fee.model.js

const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // তোমার Student মডেল যদি থাকে
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // eg: "April 2025"
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Bkash", "Nagad", "Bank"],
    default: "Cash",
  },
  status: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fee", feeSchema);
