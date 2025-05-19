// CRUD aplications
require("dotenv").config();
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");


const Student = require("../models/student.model.js");

module.exports = {
  createNewStudent: async (req, res) => {
    
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({success:true,message:"Student Create Successfully",student})
    }catch(error){
        res.status(500).json({success:false,message:"Student Create Faild",error})
    }
  },
  
};