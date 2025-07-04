const mongoose = require("mongoose");

const StudyBooksApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicationType: {
    type: String,
    default: "studyBooks",
  },
  yearOfStudy: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  booksRequired: {
    type: String,
    required: true,
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
  "StudyBooksApplication",
  StudyBooksApplicationSchema
);
