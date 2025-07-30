const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const SchoolFeesApplication = require("../models/SchoolFeesApplication");
const TravelExpensesApplication = require("../models/TravelExpensesApplication");
const StudyBooksApplication = require("../models/StudyBooksApplication");

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only .jpeg, .jpg, .png, .pdf files are allowed");
    }
  },
});

// School Fees Application
const schoolFeesUpload = upload.fields([
  { name: "birthCertificate", maxCount: 1 },
  { name: "leavingCertificate", maxCount: 1 },
  { name: "marksheet", maxCount: 1 },
  { name: "admissionProof", maxCount: 1 },
  { name: "incomeProof", maxCount: 1 },
  { name: "bankAccount", maxCount: 1 },
  { name: "rationCard", maxCount: 1 },
]);

router.post("/school-fees", auth, schoolFeesUpload, async (req, res) => {
  try {
    // Prevent duplicate pending/rejected applications
    const existing = await SchoolFeesApplication.findOne({
      user: req.user.id,
      status: { $ne: "approved" },
    });
    if (existing) {
      return res.status(400).json({
        msg: "You already have a pending or rejected school fees application. Please wait for it to be approved before applying again.",
      });
    }

    const fileFields = {};
    // Process uploaded files as blobs
    if (req.files) {
      Object.keys(req.files).forEach((fieldName) => {
        const file = req.files[fieldName][0];
        fileFields[fieldName] = {
          data: file.buffer,
          contentType: file.mimetype,
          fileName: file.originalname,
        };
      });
    }

    const newApplication = new SchoolFeesApplication({
      user: req.user.id,
      applicationType: "schoolFees",
      ...fileFields,
    });

    await newApplication.save();
    res.json({
      success: true,
      msg: "School fees application submitted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Travel Expenses Application
const travelExpensesUpload = upload.fields([{ name: "idCard", maxCount: 1 }]);

router.post(
  "/travel-expenses",
  auth,
  travelExpensesUpload,
  async (req, res) => {
    try {
      // Prevent duplicate pending/rejected applications
      const existing = await TravelExpensesApplication.findOne({
        user: req.user.id,
        status: { $ne: "approved" },
      });
      if (existing) {
        return res.status(400).json({
          msg: "You already have a pending or rejected travel expenses application. Please wait for it to be approved before applying again.",
        });
      }

      let idCardBlob = null;

      // Process uploaded ID card as blob
      if (req.files && req.files.idCard) {
        const file = req.files.idCard[0];
        idCardBlob = {
          data: file.buffer,
          contentType: file.mimetype,
          fileName: file.originalname,
        };
      }

      const newApplication = new TravelExpensesApplication({
        user: req.user.id,
        applicationType: "travelExpenses",
        residencePlace: req.body.residencePlace,
        destinationPlace: req.body.destinationPlace,
        distance: req.body.distance,
        travelMode: req.body.travelMode,
        aidRequired: req.body.aidRequired,
        idCard: idCardBlob,
      });

      await newApplication.save();
      res.json({
        success: true,
        msg: "Travel expenses application submitted successfully",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Study Books Application
router.post("/study-books", auth, async (req, res) => {
  try {
    // Prevent duplicate pending/rejected applications
    const existing = await StudyBooksApplication.findOne({
      user: req.user.id,
      status: { $ne: "approved" },
    });
    if (existing) {
      return res.status(400).json({
        msg: "You already have a pending or rejected study books application. Please wait for it to be approved before applying again.",
      });
    }

    // Validation for required fields
    if (!req.body.yearOfStudy || !req.body.field || !req.body.booksRequired) {
      console.error("Validation error:", {
        yearOfStudy: req.body.yearOfStudy,
        field: req.body.field,
        booksRequired: req.body.booksRequired,
        user: req.user,
      });
      return res.status(400).json({
        msg: "All fields (yearOfStudy, field, booksRequired) are required.",
      });
    }
    const newApplication = new StudyBooksApplication({
      user: req.user.id,
      applicationType: "studyBooks",
      yearOfStudy: req.body.yearOfStudy,
      field: req.body.field,
      booksRequired: req.body.booksRequired,
    });
    await newApplication.save();
    res.json({
      success: true,
      msg: "Study books application submitted successfully",
    });
  } catch (err) {
    console.error("Error in /study-books:", {
      error: err,
      body: req.body,
      user: req.user,
    });
    res.status(500).json({ msg: err.message || "Server error" });
  }
});

// GET /api/applications/my-applications
// Get all applications from the logged-in user
router.get("/my-applications", auth, async (req, res) => {
  try {
    // Get user's ID from auth middleware
    const userId = req.user.id;

    // Fetch applications from all three collections
    const schoolFeesApps = await SchoolFeesApplication.find({ user: userId });
    const travelExpensesApps = await TravelExpensesApplication.find({
      user: userId,
    });
    const studyBooksApps = await StudyBooksApplication.find({ user: userId });

    // Combine all applications
    const allApplications = [
      ...schoolFeesApps,
      ...travelExpensesApps,
      ...studyBooksApps,
    ];

    // Sort by creation date (newest first)
    allApplications.sort((a, b) => b.createdAt - a.createdAt);

    res.json(allApplications);
  } catch (err) {
    console.error("Error fetching user applications:", err);
    res.status(500).send("Server error");
  }
});

// Student document preview/download endpoint
router.get("/:appId/file/:fieldName", auth, async (req, res) => {
  try {
    const { appId, fieldName } = req.params;
    // Try all application types
    let app = await SchoolFeesApplication.findById(appId);
    if (!app) app = await TravelExpensesApplication.findById(appId);
    if (!app) app = await StudyBooksApplication.findById(appId);
    if (!app || !app[fieldName] || !app[fieldName].data) {
      return res.status(404).json({ msg: "File not found" });
    }
    // Check that the user owns this application
    if (app.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    const fileBuffer = Buffer.isBuffer(app[fieldName].data)
      ? app[fieldName].data
      : Buffer.from(app[fieldName].data);

    res.setHeader("Content-Type", app[fieldName].contentType);
    res.setHeader("Content-Length", fileBuffer.length);
    const dispositionType =
      app[fieldName].contentType.startsWith("image/") ||
      app[fieldName].contentType === "application/pdf"
        ? "inline"
        : "attachment";
    res.setHeader(
      "Content-Disposition",
      `${dispositionType}; filename=\"${app[fieldName].fileName}\"`
    );
    res.send(fileBuffer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Student cancels (deletes) their own application
router.delete('/:appId', auth, async (req, res) => {
  try {
    const { appId } = req.params;
    // Try all application types
    let app = await SchoolFeesApplication.findById(appId);
    let model = SchoolFeesApplication;
    if (!app) {
      app = await TravelExpensesApplication.findById(appId);
      model = TravelExpensesApplication;
    }
    if (!app) {
      app = await StudyBooksApplication.findById(appId);
      model = StudyBooksApplication;
    }
    if (!app) {
      return res.status(404).json({ msg: 'Application not found' });
    }
    // Only allow the owner to delete
    if (app.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }
    await model.findByIdAndDelete(appId);
    res.json({ success: true, msg: 'Application cancelled/deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

module.exports = router;
