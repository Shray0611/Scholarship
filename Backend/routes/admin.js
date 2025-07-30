const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const User = require("../models/User");
const StudentRegistration = require("../models/StudentRegistration");
const SchoolFeesApplication = require("../models/SchoolFeesApplication");
const TravelExpensesApplication = require("../models/TravelExpensesApplication");
const StudyBooksApplication = require("../models/StudyBooksApplication");
const PDFDocument = require("pdfkit");

// GET /api/admin/users
// Get all users for admin dashboard
router.get("/users", [auth, adminAuth], async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/admin/users/:id
// Get a specific user's registration details
router.get("/users/:id", [auth, adminAuth], async (req, res) => {
  try {
    const registration = await StudentRegistration.findOne({
      user: req.params.id,
    });
    if (!registration) {
      return res.status(404).json({ msg: "Registration not found" });
    }
    res.json(registration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET /api/admin/users/:id/applications
// Get all applications from a specific user
router.get("/users/:id/applications", [auth, adminAuth], async (req, res) => {
  try {
    // Get user's ID from params
    const userId = req.params.id;

    // Fetch applications from all three collections
    const schoolFeesApps = await SchoolFeesApplication.find({ user: userId });
    const travelExpensesApps = await TravelExpensesApplication.find({
      user: userId,
    });
    const studyBooksApps = await StudyBooksApplication.find({ user: userId });

    // Log study books applications count
    console.log("Study Books Applications found:", studyBooksApps.length);

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
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Approve School Fees Application
router.post("/approve/school-fees/:id", [auth, adminAuth], async (req, res) => {
  try {
    const app = await SchoolFeesApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ msg: "Application not found" });
    app.status = "approved";
    await app.save();
    res.json({ success: true, msg: "School fees application approved." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Approve Travel Expenses Application
router.post(
  "/approve/travel-expenses/:id",
  [auth, adminAuth],
  async (req, res) => {
    try {
      const app = await TravelExpensesApplication.findById(req.params.id);
      if (!app) return res.status(404).json({ msg: "Application not found" });
      app.status = "approved";
      await app.save();
      res.json({ success: true, msg: "Travel expenses application approved." });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Approve Study Books Application
router.post("/approve/study-books/:id", [auth, adminAuth], async (req, res) => {
  try {
    const app = await StudyBooksApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ msg: "Application not found" });
    app.status = "approved";
    await app.save();
    res.json({ success: true, msg: "Study books application approved." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Study Books Application with dropdown selections and generate ID
router.post("/update/study-books/:id", [auth, adminAuth], async (req, res) => {
  try {
    console.log("Received update request for study books:", {
      id: req.params.id,
      body: req.body,
    });

    const { standard, stream, medium } = req.body;

    // Validate required fields
    if (!standard || !stream || !medium) {
      return res.status(400).json({
        msg: "All fields (standard, stream, medium) are required",
      });
    }

    const app = await StudyBooksApplication.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ msg: "Application not found" });
    }

    console.log("Found application:", app._id);

    // Check if application already has a generatedId and setNumber
    if (app.generatedId && app.setNumber) {
      console.log(
        "Application already has ID:",
        app.generatedId,
        "Set Number:",
        app.setNumber
      );
      console.log(
        "Cannot change existing ID. Only updating standard, stream, medium fields."
      );

      // Only update the dropdown fields, keep existing generatedId and setNumber
      app.standard = standard;
      app.stream = stream;
      app.medium = medium;

      await app.save();

      console.log("Application updated (ID unchanged - already exists)");

      return res.json({
        success: true,
        msg: "Application updated (ID unchanged - already exists)",
        generatedId: app.generatedId,
        setNumber: app.setNumber,
      });
    }

    // Generate new ID only if one doesn't exist
    console.log("Generating new ID for application without existing ID");

    // Get the latest set number for this combination
    console.log("Looking for existing applications with:", {
      standard,
      stream,
      medium,
    });

    // First, check if there are any applications with this exact combination
    const latestSet = await StudyBooksApplication.findOne({
      standard,
      stream,
      medium,
      setNumber: { $exists: true, $ne: null },
    }).sort({ setNumber: -1 });

    console.log(
      "Latest set found for exact combination:",
      latestSet
        ? {
            id: latestSet._id,
            setNumber: latestSet.setNumber,
            generatedId: latestSet.generatedId,
          }
        : "No previous set found"
    );

    let setNumber;

    if (latestSet) {
      // If we found an application with this exact combination, increment the set number
      setNumber = latestSet.setNumber + 1;
      console.log(
        "Found existing combination, incrementing set number to:",
        setNumber
      );
    } else {
      // If no exact combination found, check if this is the first application with any combination
      const totalWithSetNumbers = await StudyBooksApplication.countDocuments({
        setNumber: { $exists: true, $ne: null },
      });

      if (totalWithSetNumbers === 0) {
        // This is the very first application to get a set number
        setNumber = 1;
        console.log(
          "This is the first application to get a set number, starting with 1"
        );
      } else {
        // Find the highest set number across all combinations and increment
        const highestSet = await StudyBooksApplication.findOne({
          setNumber: { $exists: true, $ne: null },
        }).sort({ setNumber: -1 });

        setNumber = highestSet.setNumber + 1;
        console.log(
          "No exact combination found, using next available set number:",
          setNumber
        );
      }
    }

    console.log("Calculated new set number:", setNumber);

    // Generate abbreviations
    const standardAbbr = standard ? standard.replace(/\D/g, "") : "";
    const streamAbbr =
      stream && stream.length > 0 ? stream.charAt(0).toUpperCase() : "";
    const mediumAbbr =
      medium && medium.length > 0 ? medium.charAt(0).toUpperCase() : "";

    // Generate ID
    const generatedId = `${standardAbbr}-${streamAbbr}-${mediumAbbr}-${setNumber}`;

    console.log("Generated ID:", generatedId);

    // Update the application with new ID
    app.standard = standard;
    app.stream = stream;
    app.medium = medium;
    app.generatedId = generatedId;
    app.setNumber = setNumber;

    await app.save();

    console.log("Application updated successfully");

    res.json({
      success: true,
      msg: "Study books application updated successfully.",
      generatedId,
      setNumber,
    });
  } catch (err) {
    console.error("Error updating study books application:", err);
    res.status(500).json({
      msg: "Server error while updating study books application",
      error: err.message,
    });
  }
});

// Download Study Books Application as PDF
router.get("/download/study-books/:id", [auth, adminAuth], async (req, res) => {
  try {
    // Fetch application and registration data
    const app = await StudyBooksApplication.findById(req.params.id).populate(
      "user"
    );
    if (!app) return res.status(404).json({ msg: "Application not found" });
    const registration = await StudentRegistration.findOne({
      user: app.user._id,
    });
    if (!registration)
      return res.status(404).json({ msg: "Student registration not found" });

    // Initialize PDF with options
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      info: {
        Title: `Study Books Application - ${app._id}`,
        Author: "Vivekanand Seva Mandal",
      },
    });

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=study-books-application-${app._id}.pdf`
    );
    doc.pipe(res);

    // Helper function to draw a horizontal line
    const drawLine = (y, xStart = 40, xEnd = 555) => {
      doc.moveTo(xStart, y).lineTo(xEnd, y).lineWidth(1).stroke();
    };

    // Header Section
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#003087")
      .text("Vivekanand Seva Mandal", { align: "center" })
      .moveDown(0.3);
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Study Books Scholarship Application", { align: "center" })
      .moveDown(0.5);
    drawLine(doc.y + 10);
    doc.moveDown(1);

    // Student Details Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Student Details", 40, doc.y, { underline: true })
      .moveDown(0.5);

    // Table-like layout for student details
    const tableTop = doc.y;
    const col1X = 40;
    const col2X = 200;
    const col3X = 350;
    const rowHeight = 20;
    const labelWidth = 150;
    const valueWidth = 150;

    // Define student details fields
    const studentFields = [
      ["Academic Year", registration.academicYear || "N/A"],
      ["Date", registration.date ? registration.date.toDateString() : "N/A"],
      ["Applicant Name", registration.applicantName || "N/A"],
      ["Mother's Name", registration.motherName || "N/A"],
      ["DOB", registration.dob ? registration.dob.toDateString() : "N/A"],
      ["Gender", registration.gender || "N/A"],
      ["Caste", registration.caste || "N/A"],
      ["College Name", registration.collegeName || "N/A"],
      ["Course Name", registration.courseName || "N/A"],
      ["Address", registration.address || "N/A"],
      ["Village Name", registration.villageName || "N/A"],
      ["State", registration.state || "N/A"],
      ["Orphan", registration.orphan ? "Yes" : "No"],
      ["Disabled", registration.disabled ? "Yes" : "No"],
    ];

    // Draw table headers and background
    doc
      .rect(35, tableTop - 5, 520, 20)
      .fillOpacity(0.1)
      .fill("#E0E0E0")
      .fillOpacity(1);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#333333")
      .text("Field", col1X, tableTop, { width: labelWidth })
      .text("Details", col2X, tableTop, { width: valueWidth });

    // Draw student details in a table-like format
    let currentY = tableTop + rowHeight;
    studentFields.forEach(([label, value], index) => {
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333333")
        .text(label, col1X, currentY, { width: labelWidth, align: "left" });
      doc
        .font("Helvetica")
        .text(value, col2X, currentY, { width: valueWidth * 2, align: "left" });
      currentY += rowHeight;
    });

    // Draw table border
    doc
      .rect(35, tableTop - 5, 520, currentY - tableTop)
      .lineWidth(0.5)
      .strokeColor("#CCCCCC")
      .stroke();
    doc.moveDown(2);

    // Book Request Details Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Book Request Details", 40, doc.y, { underline: true })
      .moveDown(0.5);

    // Book details in a table-like format
    const bookTableTop = doc.y;
    const bookFields = [
      ["Year of Study", app.yearOfStudy || "N/A"],
      ["Field", app.field || app.courseName || "N/A"],
      ["Books Required", ""], // Books will be listed separately
    ];

    // Draw book details table
    doc
      .rect(35, bookTableTop - 5, 520, 20)
      .fillOpacity(0.1)
      .fill("#E0E0E0")
      .fillOpacity(1);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#333333")
      .text("Field", col1X, bookTableTop, { width: labelWidth })
      .text("Details", col2X, bookTableTop, { width: valueWidth });

    currentY = bookTableTop + rowHeight;
    bookFields.forEach(([label, value], index) => {
      if (label === "Books Required") return; // Handle books separately
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333333")
        .text(label, col1X, currentY, { width: labelWidth, align: "left" });
      doc
        .font("Helvetica")
        .text(value, col2X, currentY, { width: valueWidth * 2, align: "left" });
      currentY += rowHeight;
    });

    // Parse and list books required
    const booksRequiredClean = app.booksRequired.split(",").map((b) => {
      let match = b.match(/(.+?)\s*\((Textbook|Guide)\)/i);
      if (match) {
        let name = match[1].trim();
        let type = match[2];
        return `${name} (${type})`;
      }
      return b.trim();
    });

    // Draw books required as a numbered list with visible font color
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor("#333333") // Ensure label is visible
      .text("Books Required", col1X, currentY, { width: labelWidth });
    booksRequiredClean.forEach((book, index) => {
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#333333") // Ensure book items are visible
        .text(`${index + 1}. ${book}`, col2X, currentY, {
          width: valueWidth * 2,
          align: "left",
        });
      currentY += rowHeight;
    });

    // Add generated ID if available
    if (app.generatedId) {
      if (currentY % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333333")
        .text("Generated ID", col1X, currentY, { width: labelWidth });
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#333333")
        .text(app.generatedId, col2X, currentY, {
          width: valueWidth * 2,
          align: "left",
        });
      currentY += rowHeight;
    }

    // Draw book table border
    doc
      .rect(35, bookTableTop - 5, 520, currentY - bookTableTop)
      .lineWidth(0.5)
      .strokeColor("#CCCCCC")
      .stroke();
    doc.moveDown(2);

    // Footer
    const pageHeight = doc.page.height;
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#666666")
      .text(
        "Vivekanand Seva Mandal | Contact: info@vsm.org | Page 1 of 1",
        40,
        pageHeight - 50,
        { align: "center" }
      );

    // Finalize PDF
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message || "Server error" });
  }
});

// Download School Fees Application as PDF
router.get("/download/school-fees/:id", [auth, adminAuth], async (req, res) => {
  try {
    // Fetch application and registration data
    const app = await SchoolFeesApplication.findById(req.params.id).populate(
      "user"
    );
    if (!app) return res.status(404).json({ msg: "Application not found" });
    const registration = await StudentRegistration.findOne({
      user: app.user._id,
    });
    if (!registration)
      return res.status(404).json({ msg: "Student registration not found" });

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      info: {
        Title: `School Fees Application - ${app._id}`,
        Author: "Vivekanand Seva Mandal",
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=school-fees-application-${app._id}.pdf`
    );
    doc.pipe(res);

    // Helper function to draw a horizontal line
    const drawLine = (y, xStart = 40, xEnd = 555) => {
      doc.moveTo(xStart, y).lineTo(xEnd, y).lineWidth(1).stroke();
    };

    // Header Section
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor("#003087")
      .text("Vivekanand Seva Mandal", { align: "center" })
      .moveDown(0.3);
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("School Fees Scholarship Application", { align: "center" })
      .moveDown(0.5);
    drawLine(doc.y + 10);
    doc.moveDown(1);

    // Student Details Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Student Details", 40, doc.y, { underline: true })
      .moveDown(0.5);

    // Table-like layout for student details
    const tableTop = doc.y;
    const col1X = 40;
    const col2X = 200;
    const rowHeight = 20;
    const labelWidth = 150;
    const valueWidth = 150;

    // Define student details fields
    const studentFields = [
      ["Academic Year", registration.academicYear || "N/A"],
      ["Date", registration.date ? registration.date.toDateString() : "N/A"],
      ["Applicant Name", registration.applicantName || "N/A"],
      ["Mother's Name", registration.motherName || "N/A"],
      ["DOB", registration.dob ? registration.dob.toDateString() : "N/A"],
      ["Gender", registration.gender || "N/A"],
      ["Caste", registration.caste || "N/A"],
      ["College Name", registration.collegeName || "N/A"],
      ["Course Name", registration.courseName || "N/A"],
      ["Address", registration.address || "N/A"],
      ["Village Name", registration.villageName || "N/A"],
      ["State", registration.state || "N/A"],
      ["Orphan", registration.orphan ? "Yes" : "No"],
      ["Disabled", registration.disabled ? "Yes" : "No"],
    ];

    // Draw table headers and background
    doc
      .rect(35, tableTop - 5, 520, 20)
      .fillOpacity(0.1)
      .fill("#E0E0E0")
      .fillOpacity(1);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#333333")
      .text("Field", col1X, tableTop, { width: labelWidth })
      .text("Details", col2X, tableTop, { width: valueWidth });

    // Draw student details in a table-like format
    let currentY = tableTop + rowHeight;
    studentFields.forEach(([label, value], index) => {
      if (index % 2 === 0) {
        doc
          .rect(35, currentY - 5, 520, rowHeight)
          .fillOpacity(0.05)
          .fill("#F5F5F5")
          .fillOpacity(1);
      }
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333333")
        .text(label, col1X, currentY, { width: labelWidth, align: "left" });
      doc
        .font("Helvetica")
        .text(value, col2X, currentY, { width: valueWidth * 2, align: "left" });
      currentY += rowHeight;
    });

    // Draw table border
    doc
      .rect(35, tableTop - 5, 520, currentY - tableTop)
      .lineWidth(0.5)
      .strokeColor("#CCCCCC")
      .stroke();
    doc.moveDown(2);

    // Uploaded Documents Section
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#003087")
      .text("Uploaded Documents", 40, doc.y, { underline: true })
      .moveDown(0.5);

    const docFields = [
      ["Birth Certificate", "birthCertificate"],
      ["Leaving Certificate", "leavingCertificate"],
      ["Marksheet", "marksheet"],
      ["Admission Proof", "admissionProof"],
      ["Income Proof", "incomeProof"],
      ["Bank Account Details", "bankAccount"],
      ["Ration Card", "rationCard"],
    ];
    doc.font("Helvetica").fontSize(11).fillColor("#222");
    doc.moveDown(0.2);
    const baseUrl = req.protocol + "://" + req.get("host");
    docFields.forEach(([label, field]) => {
      if (app[field] && app[field].data) {
        const fullUrl = `${baseUrl}/api/admin/school-fees/${app._id}/file/${field}`;
        doc.text(`${label}: `, {
          continued: true,
          underline: false,
          link: undefined,
        });
        doc.fillColor("blue").text("Link", { link: fullUrl, underline: true });
        doc.fillColor("#222");
      }
    });
    doc.moveDown(2);

    // Footer
    doc
      .font("Helvetica-Oblique")
      .fontSize(10)
      .fillColor("#888888")
      .text(
        "This is a system-generated document. All uploaded documents are available at the above links.",
        40,
        doc.y,
        { align: "left" }
      );

    doc.end();
  } catch (err) {
    console.error(err);
    if (doc && !doc.ended)
      try {
        doc.end();
      } catch (e) {}
    res.status(500).json({ msg: err.message || "Server error" });
  }
});

// Download Travel Expenses Application as PDF
router.get(
  "/download/travel-expenses/:id",
  [auth, adminAuth],
  async (req, res) => {
    let pdfStreamed = false;
    try {
      // Fetch application and registration data
      const app = await TravelExpensesApplication.findById(
        req.params.id
      ).populate("user");
      if (!app) {
        console.error(`Application not found for ID: ${req.params.id}`);
        return res
          .status(404)
          .type("application/json")
          .send(JSON.stringify({ msg: "Application not found" }));
      }
      const registration = await StudentRegistration.findOne({
        user: app.user._id,
      });
      if (!registration) {
        console.error(
          `Student registration not found for user ID: ${app.user._id}`
        );
        return res
          .status(404)
          .type("application/json")
          .send(JSON.stringify({ msg: "Student registration not found" }));
      }

      const doc = new PDFDocument({
        margin: 30,
        size: "A4",
        info: {
          Title: `Travel Expenses Application - ${app._id}`,
          Author: "Vivekanand Seva Mandal",
        },
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=travel-expenses-application-${app._id}.pdf`
      );
      pdfStreamed = true;
      doc.pipe(res);

      // Helper function to draw a horizontal line
      const drawLine = (y, xStart = 30, xEnd = 565) => {
        doc.moveTo(xStart, y).lineTo(xEnd, y).lineWidth(1).stroke();
      };

      // Helper function to calculate wrapped text height
      const getTextHeight = (text, font, fontSize, width) => {
        if (!text || typeof text !== "string") return 14;
        doc.font(font).fontSize(fontSize);
        return doc.heightOfString(text, { width }) + 4;
      };

      // Helper function to check and add new page if needed
      const checkPageOverflow = (requiredHeight) => {
        const pageHeight = doc.page.height - 60; // More margin for footer
        if (doc.y + requiredHeight > pageHeight) {
          doc.addPage();
          return 40; // Start position on new page
        }
        return doc.y;
      };

      // Header Section
      let currentY = 40;
      doc.y = currentY;

      doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor("#003087")
        .text("Vivekanand Seva Mandal", { align: "center" });

      currentY = doc.y + 8;
      doc.y = currentY;

      doc
        .fontSize(12)
        .fillColor("#333333")
        .text("Travel Expenses Scholarship Application", { align: "center" });

      currentY = doc.y + 15;
      drawLine(currentY);
      currentY += 20;

      // Student Details Section
      currentY = checkPageOverflow(30);
      doc.y = currentY;

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#003087")
        .text("Student Details", 30, currentY, { underline: true });

      currentY = doc.y + 15;

      const col1X = 30;
      const col2X = 160;
      const labelWidth = 120;
      const valueWidth = 405;
      const minRowHeight = 16;
      const maxRowHeight = 60;

      const studentFields = [
        ["Academic Year", (registration.academicYear || "N/A").toString()],
        ["Date", registration.date ? registration.date.toDateString() : "N/A"],
        ["Applicant Name", (registration.applicantName || "N/A").toString()],
        ["Mother's Name", (registration.motherName || "N/A").toString()],
        ["DOB", registration.dob ? registration.dob.toDateString() : "N/A"],
        ["Gender", (registration.gender || "N/A").toString()],
        ["Caste", (registration.caste || "N/A").toString()],
        ["College Name", (registration.collegeName || "N/A").toString()],
        ["Course Name", (registration.courseName || "N/A").toString()],
        ["Address", (registration.address || "N/A").toString()],
        ["Village Name", (registration.villageName || "N/A").toString()],
        ["State", (registration.state || "N/A").toString()],
        ["Orphan", registration.orphan ? "Yes" : "No"],
        ["Disabled", registration.disabled ? "Yes" : "No"],
      ];

      // Calculate total table height needed
      const totalTableHeight = (studentFields.length + 1) * minRowHeight + 20;
      currentY = checkPageOverflow(totalTableHeight);

      const tableTop = currentY;

      // Draw table header
      doc
        .rect(25, tableTop, 540, minRowHeight)
        .fillOpacity(0.1)
        .fill("#E0E0E0")
        .fillOpacity(1);

      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("#333333")
        .text("Field", col1X, tableTop + 4, { width: labelWidth })
        .text("Details", col2X, tableTop + 4, { width: valueWidth });

      currentY = tableTop + minRowHeight;

      studentFields.forEach(([label, value], index) => {
        // Calculate dynamic row height
        const labelHeight = getTextHeight(
          label,
          "Helvetica-Bold",
          9,
          labelWidth
        );
        const valueHeight = getTextHeight(value, "Helvetica", 9, valueWidth);
        const rowHeight = Math.min(
          maxRowHeight,
          Math.max(minRowHeight, Math.max(labelHeight, valueHeight))
        );

        // Check for page overflow before drawing row
        if (currentY + rowHeight > doc.page.height - 60) {
          doc.addPage();
          currentY = 40;
        }

        // Alternate row background
        if (index % 2 === 0) {
          doc
            .rect(25, currentY, 540, rowHeight)
            .fillOpacity(0.05)
            .fill("#F5F5F5")
            .fillOpacity(1);
        }

        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor("#333333")
          .text(label || "N/A", col1X, currentY + 4, {
            width: labelWidth,
            align: "left",
          });

        doc.font("Helvetica").text(value || "N/A", col2X, currentY + 4, {
          width: valueWidth,
          align: "left",
        });

        currentY += rowHeight;
      });

      // Draw table border
      doc
        .rect(25, tableTop, 540, currentY - tableTop)
        .lineWidth(0.5)
        .strokeColor("#CCCCCC")
        .stroke();

      currentY += 25; // Space after table

      // Travel Expense Details Section
      currentY = checkPageOverflow(30);
      doc.y = currentY;

      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#003087")
        .text("Travel Expense Details", 30, currentY, { underline: true });

      currentY = doc.y + 15;

      const travelFields = [
        ["Residence Place", (app.residencePlace || "N/A").toString()],
        ["Destination Place", (app.destinationPlace || "N/A").toString()],
        [
          "Distance (km)",
          app.distance != null ? app.distance.toString() : "N/A",
        ],
        ["Travel Mode", (app.travelMode || "N/A").toString()],
        [
          "Aid Required (Rs)",
          app.aidRequired != null ? app.aidRequired.toString() : "N/A",
        ],
        [
          "ID Card",
          app.idCard && app.idCard.data
            ? `${req.protocol}://${req.get("host")}/api/admin/travel-expenses/${
                app._id
              }/file/idCard`
            : "N/A",
        ],
        ["Status", (app.status || "N/A").toString()],
        ["Applied On", app.createdAt ? app.createdAt.toDateString() : "N/A"],
      ];

      // Calculate total travel table height needed
      const totalTravelTableHeight =
        (travelFields.length + 1) * minRowHeight + 20;
      currentY = checkPageOverflow(totalTravelTableHeight);

      const travelTableTop = currentY;

      // Draw travel table header
      doc
        .rect(25, travelTableTop, 540, minRowHeight)
        .fillOpacity(0.1)
        .fill("#E0E0E0")
        .fillOpacity(1);

      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("#333333")
        .text("Field", col1X, travelTableTop + 4, { width: labelWidth })
        .text("Details", col2X, travelTableTop + 4, { width: valueWidth });

      currentY = travelTableTop + minRowHeight;

      travelFields.forEach(([label, value], index) => {
        // Calculate dynamic row height
        const labelHeight = getTextHeight(
          label,
          "Helvetica-Bold",
          9,
          labelWidth
        );
        const valueHeight = getTextHeight(value, "Helvetica", 9, valueWidth);
        const rowHeight = Math.min(
          maxRowHeight,
          Math.max(minRowHeight, Math.max(labelHeight, valueHeight))
        );

        // Check for page overflow before drawing row
        if (currentY + rowHeight > doc.page.height - 60) {
          doc.addPage();
          currentY = 40;
        }

        // Alternate row background
        if (index % 2 === 0) {
          doc
            .rect(25, currentY, 540, rowHeight)
            .fillOpacity(0.05)
            .fill("#F5F5F5")
            .fillOpacity(1);
        }

        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor("#333333")
          .text(label || "N/A", col1X, currentY + 4, {
            width: labelWidth,
            align: "left",
          });

        // Special handling for ID Card link
        if (label === "ID Card" && value && value !== "N/A") {
          doc
            .font("Helvetica")
            .fillColor("blue")
            .text("View/Download", col2X, currentY + 4, {
              width: valueWidth,
              align: "left",
              link: value,
              underline: true,
            });
          doc.fillColor("#333333");
        } else {
          doc.font("Helvetica").text(value || "N/A", col2X, currentY + 4, {
            width: valueWidth,
            align: "left",
          });
        }

        currentY += rowHeight;
      });

      // Draw travel table border
      doc
        .rect(25, travelTableTop, 540, currentY - travelTableTop)
        .lineWidth(0.5)
        .strokeColor("#CCCCCC")
        .stroke();

      // Footer - Add to each page
      const addFooter = (pageNum) => {
        const pageHeight = doc.page.height;
        doc
          .font("Helvetica")
          .fontSize(8)
          .fillColor("#666666")
          .text(
            `Vivekanand Seva Mandal | Contact: info@vsm.org | Page ${pageNum}`,
            30,
            pageHeight - 30,
            { align: "center" }
          );
      };

      // Add footer to all pages
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        addFooter(i + 1);
      }

      doc.end();
    } catch (err) {
      console.error(`Error generating PDF: ${err.message}`);
      if (!pdfStreamed) {
        res
          .status(500)
          .type("application/json")
          .send(JSON.stringify({ msg: err.message || "Server error" }));
      } else {
        res.destroy && res.destroy();
      }
    }
  }
);

// GET /api/admin/school-fees/:appId/file/:fieldName
router.get(
  "/school-fees/:appId/file/:fieldName",
  [auth, adminAuth],
  async (req, res) => {
    try {
      const { appId, fieldName } = req.params;
      const app = await SchoolFeesApplication.findById(appId);
      if (!app || !app[fieldName] || !app[fieldName].data) {
        return res.status(404).json({ msg: "File not found" });
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
  }
);

// GET /api/admin/travel-expenses/:appId/file/idCard
router.get(
  "/travel-expenses/:appId/file/idCard",
  [auth, adminAuth],
  async (req, res) => {
    try {
      const { appId } = req.params;
      const app = await TravelExpensesApplication.findById(appId);
      if (!app || !app.idCard || !app.idCard.data) {
        return res.status(404).json({ msg: "File not found" });
      }
      const fileBuffer = Buffer.isBuffer(app.idCard.data)
        ? app.idCard.data
        : Buffer.from(app.idCard.data);

      res.setHeader("Content-Type", app.idCard.contentType);
      res.setHeader("Content-Length", fileBuffer.length);
      const dispositionType =
        app.idCard.contentType.startsWith("image/") ||
        app.idCard.contentType === "application/pdf"
          ? "inline"
          : "attachment";
      res.setHeader(
        "Content-Disposition",
        `${dispositionType}; filename=\"${app.idCard.fileName}\"`
      );
      res.send(fileBuffer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
