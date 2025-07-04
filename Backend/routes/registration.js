const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const StudentRegistration = require("../models/StudentRegistration");

// POST /api/registration
router.post("/", auth, async (req, res) => {
  try {
    const newRegistration = new StudentRegistration({
      ...req.body,
      user: req.user.id,
    });
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

module.exports = router;
