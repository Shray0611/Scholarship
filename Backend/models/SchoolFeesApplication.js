const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  fileName: String,
});

const SchoolFeesApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicationType: {
    type: String,
    default: "schoolFees",
  },
  birthCertificate: {
    type: FileSchema,
    required: true,
  },
  leavingCertificate: {
    type: FileSchema,
    required: true,
  },
  marksheet: {
    type: FileSchema,
    required: true,
  },
  admissionProof: {
    type: FileSchema,
    required: true,
  },
  incomeProof: {
    type: FileSchema,
    required: true,
  },
  bankAccount: {
    type: FileSchema,
    required: true,
  },
  rationCard: {
    type: FileSchema,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "SchoolFeesApplication",
  SchoolFeesApplicationSchema
);
