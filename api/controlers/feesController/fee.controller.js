// controllers/fee.controller.js

const Fee = require("../../models/feesModel/fee.model");

const createFee = async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json({ success: true, fee });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fee creation failed", error: err });
  }
};

const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate("studentId", "name class roll");
    res.status(200).json({ success: true, fees });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch fees", error: err });
  }
};

module.exports = {
  createFee,
  getFees,
};
