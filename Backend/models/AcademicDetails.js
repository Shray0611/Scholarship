const mongoose = require("mongoose");
const BeneficiaryRegistration = require("./BeneficiaryRegistration");

const academicSchema = new mongoose.Schema({
  academicField: {
    type: String,
    required: true,
    trim: true,
  },
  academicYear: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear() + 10,
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  collegeName: {
    type: String,
    required: true,
    trim: true,
  },
  lastAcademicYearPercentage: {
    type: Number,
    min: 0,
    max: 100, // since it’s a percentage
  },
  hobbies: {
    type: String,
  },
  beneficiaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BeneficiaryRegistration,
  },
}, { timestamps: true });

const AcademicDetails = mongoose.model("AcademicDetails", academicSchema);

module.exports = AcademicDetails;
