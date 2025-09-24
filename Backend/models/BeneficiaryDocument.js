const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  // Compulsory Documents
  aadharCard: {
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  passportSizePhoto: {
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  houseImage: {
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },

  // Optional Documents
  panCard: {
    url: {
      type: String,
      trim: true,
    },
  },
  rationCard: {
    url: {
      type: String,
      trim: true,
    },
  },
  birthCertificate: {
    url: {
      type: String,
      trim: true,
    },
  },
  leavingCertificate: {
    url: {
      type: String,
      trim: true,
    },
  },
  casteCertificate: {
    url: {
      type: String,
      trim: true,
    },
  },
  casteValidityCertificate: {
    url: {
      type: String,
      trim: true,
    },
  },
  incomeCertificate: {
    url: {
      type: String,
      trim: true,
    },
  },
  domicileCertificate: {
    url: {
      type: String,
      trim: true,
    },
  },
}, { timestamps: true });

const Document = mongoose.model("BeneficiaryDocument", documentSchema);

module.exports = Document;