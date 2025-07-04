const mongoose = require('mongoose');

const StudentRegistrationSchema = new mongoose.Schema({
  academicYear: { type: String },
  date: { type: Date },
  collegeName: { type: String },
  courseName: { type: String },
  applicantName: { type: String },
  motherName: { type: String },
  dob: { type: Date },
  address: { type: String },
  state: { type: String },
  caste: { type: String },
  gender: { type: String },
  orphan: { type: Boolean },
  disabled: { type: Boolean },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('StudentRegistration', StudentRegistrationSchema);
