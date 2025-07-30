const mongoose = require("mongoose");

const TravelExpensesApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicationType: {
    type: String,
    default: "travelExpenses",
  },
  residencePlace: {
    type: String,
    required: true,
  },
  destinationPlace: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  travelMode: {
    type: String,
    required: true,
  },
  aidRequired: {
    type: Number,
    required: true,
  },
  idCard: {
    data: Buffer,
    contentType: String,
    fileName: String,
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
  "TravelExpensesApplication",
  TravelExpensesApplicationSchema
);
