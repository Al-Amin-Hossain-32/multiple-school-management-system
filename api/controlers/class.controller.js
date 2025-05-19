const Class = require("../models/class.model");
const mongoose = require("mongoose");

module.exports = {
  createClass : async(req,res)=>{
    try{

    }catch(error){
      res.status(500).json({success:false,message:"Server Error in Createing class."})
    }
  }
}



// // ✅ Create new class
// exports.create = async (req, res) => {
//   try {
//     const { school, name, academicYear, sections } = req.body;

//     // Validation
//     if (!school || !name || !academicYear || !Array.isArray(sections) || sections.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "school, name, academicYear এবং অন্তত একটি section দিতে হবে",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(school)) {
//       return res.status(400).json({ success: false, message: "Invalid school ID" });
//     }

//     for (let sec of sections) {
//       if (!sec.name || !sec.classTeacher) {
//         return res.status(400).json({
//           success: false,
//           message: "প্রতিটি section-এ name এবং classTeacher দিতে হবে",
//         });
//       }
//       if (!mongoose.Types.ObjectId.isValid(sec.classTeacher)) {
//         return res.status(400).json({ success: false, message: "Invalid classTeacher ID" });
//       }
//     }

//     const newClass = await Class.create({ school, name, academicYear, sections });
//     res.status(201).json({ success: true, data: newClass });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // 📚 Get all classes
// exports.getAll = async (req, res) => {
//   try {
//     const classes = await Class.find()
//       .populate("school")
//       .populate("sections.classTeacher")
//       .populate("sections.students");
//     res.status(200).json({ success: true, data: classes });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // 🔍 Get one class
// exports.getOne = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid class ID" });
//     }

//     const found = await Class.findById(id)
//       .populate("school")
//       .populate("sections.classTeacher")
//       .populate("sections.students");

//     if (!found) return res.status(404).json({ success: false, message: "Class not found" });

//     res.status(200).json({ success: true, data: found });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ✏️ Update class
// exports.update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { school, name, academicYear, sections } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid class ID" });
//     }

//     if (school && !mongoose.Types.ObjectId.isValid(school)) {
//       return res.status(400).json({ success: false, message: "Invalid school ID" });
//     }

//     if (sections) {
//       for (let sec of sections) {
//         if (!sec.name || !sec.classTeacher) {
//           return res.status(400).json({
//             success: false,
//             message: "প্রতিটি section-এ name এবং classTeacher দিতে হবে",
//           });
//         }
//         if (!mongoose.Types.ObjectId.isValid(sec.classTeacher)) {
//           return res.status(400).json({ success: false, message: "Invalid classTeacher ID" });
//         }
//       }
//     }

//     const updated = await Class.findByIdAndUpdate(
//       id,
//       { school, name, academicYear, sections },
//       { new: true, runValidators: true }
//     );

//     if (!updated) return res.status(404).json({ success: false, message: "Class not found" });

//     res.status(200).json({ success: true, data: updated });

//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // ❌ Delete class
// exports.remove = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid class ID" });
//     }

//     const deleted = await Class.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Class not found" });

//     res.status(200).json({ success: true, message: "Class deleted successfully" });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
