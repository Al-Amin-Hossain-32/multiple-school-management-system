
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    school:{type : mongoose.Schema.ObjectId,ref:"School"},
    class_text:{type:String,required:true},
    class_num : {type:Number,required: true},
    attendee:{type:mongoose.Schema.ObjectId,ref:"Teacher"},
    createdAt:{type:Date,default:new Date()}
})

module.exports = mongoose.model("Class",classSchema);

// const mongoose = require('mongoose');

// // Section Schema
// const sectionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   classTeacher: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Teacher',
//     required: true
//   },
//   students: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Student'
//   }]
// }, { _id: false });

// // Main Class Schema
// const classSchema = new mongoose.Schema({
//   school: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'School',
//     required: true
//   },
//   name: {
//     type: String,
//     required: true, // যেমন: '1', '2', '3'
//     trim: true
//   },
//   academicYear: {
//     type: String,
//     required: true // যেমন: '2025'
//   },
//   sections: [sectionSchema],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Class', classSchema);
