const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.ObjectId,
    ref: "School",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // একই ইমেইল যেন দুইবার না আসে
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  student_class: {
    type: String,
    required: true,
  },
  roll: {
    type: Number,
    required: false, // future use, optional now
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"], // enum ব্যবহার করলে ডেটা consistent থাকবে
  },
  guardian: {
    type: String,
    required: true,
    trim: true,
  },
  guardian_phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,15}$/, // শুধু নাম্বার, এবং দৈর্ঘ্য নিয়ন্ত্রণ
  },
  student_image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // find() দিয়ে আনলে পাসওয়ার্ড না আসে
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
