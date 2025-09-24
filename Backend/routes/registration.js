const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const StudentRegistration = require("../models/StudentRegistration");

// Helper function to convert dd/mm/yyyy to Date object
const parseDate = (dateString) => {
  if (!dateString) return null;

  // Check if it's already in ISO format
  if (dateString.includes("T") || dateString.includes("-")) {
    return new Date(dateString);
  }

  // Parse dd/mm/yyyy format
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  return null;
};

// POST /api/registration
router.post("/", auth, async (req, res) => {
  try {
    // Parse and format dates
    const registrationData = {
      ...req.body,
      user: req.user.id,
      date: parseDate(req.body.date),
      dob: parseDate(req.body.dob),
    };

    const newRegistration = new StudentRegistration(registrationData);
    const reg = await newRegistration.save();
    res.json(reg);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/registration/check
router.get("/check", auth, async (req, res) => {
  try {
    const registration = await StudentRegistration.findOne({
      user: req.user.id,
    });
    res.json({ hasRegistered: !!registration });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/registration/me
router.get("/me", auth, async (req, res) => {
  try {
    const registration = await StudentRegistration.findOne({
      user: req.user.id,
    });
    if (!registration)
      return res.status(404).json({ msg: "Registration not found" });

    // Format dates for display
    const formattedRegistration = registration.toObject();
    if (formattedRegistration.date) {
      formattedRegistration.date =
        formattedRegistration.date.toLocaleDateString("en-GB");
    }
    if (formattedRegistration.dob) {
      formattedRegistration.dob =
        formattedRegistration.dob.toLocaleDateString("en-GB");
    }

    res.json(formattedRegistration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// PUT /api/registration
router.put("/", auth, async (req, res) => {
  try {
    const registration = await StudentRegistration.findOne({
      user: req.user.id,
    });
    if (!registration)
      return res.status(404).json({ msg: "Registration not found" });

    // Update all editable fields
    Object.keys(req.body).forEach((key) => {
      if (key !== "_id" && key !== "user" && key !== "__v") {
        if (key === "date" || key === "dob") {
          registration[key] = parseDate(req.body[key]);
        } else {
          registration[key] = req.body[key];
        }
      }
    });
    await registration.save();
    res.json({ success: true, msg: "Profile updated successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
