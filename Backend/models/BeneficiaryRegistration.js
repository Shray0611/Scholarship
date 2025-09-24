const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    // Personal Details
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    // Contact Details
    mobileNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    // Address Details
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // Indian pincode format
    },

    // Social and Status Details
    caste: {
      type: String,
      required: true,
      trim: true,
    },
    subCaste: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["General", "OBC", "SC", "ST", "EWS", "Other"],
      required: true, // Assuming this is also a required field
    },
    religion: {
      type: String,
      enum: [
        "Hindu",
        "Muslim",
        "Christian",
        "Sikh",
        "Buddhist",
        "Jain",
        "Parsi",
        "Jewish",
        "Other",
      ],
      required: true, // Assuming this is also a required field
    },
    orphan: {
      type: Boolean,
      default: false,
    },
    physicallyDisabled: {
      type: Boolean,
      default: false,
    },

    // Linked Documents (using ObjectId references)
    documentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  },
  { timestamps: true }
);

const BeneficiaryRegistration = mongoose.model(
  "BeneficiaryRegistration",
  beneficiarySchema
);

module.exports = BeneficiaryRegistration;
