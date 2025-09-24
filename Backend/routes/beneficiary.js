const Beneficiary = require("../models/BeneficiaryRegistration");
const Academic = require("../models/AcademicDetails");
const Document = require("../models/BeneficiaryDocument");
const express = require("express");
const router = express.Router();

// Import your custom Cloudinary upload middleware AND the uploadFile function
// Updated path to correctly point to the utils/index.js file
const { upload, uploadFile } = require("../utils");

// This middleware defines the fields that will be processed by multer
const documentUpload = upload.fields([
  { name: "aadharCard", maxCount: 1 },
  { name: "passportSizePhoto", maxCount: 1 },
  { name: "houseImage", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "rationCard", maxCount: 1 },
  { name: "birthCertificate", maxCount: 1 },
  { name: "leavingCertificate", maxCount: 1 },
  { name: "casteCertificate", maxCount: 1 },
  { name: "casteValidityCertificate", maxCount: 1 },
  { name: "incomeCertificate", maxCount: 1 },
  { name: "domicileCertificate", maxCount: 1 },
]);

router.post("/", documentUpload, async (req, res) => {
  try {
    // 1. Text fields are in `req.body`
    const { ...personalAndAcademicDetails } = req.body;
    // 2. Uploaded file buffers are in `req.files`
    const files = req.files;

    // --- CORRECTED CLOUDINARY UPLOAD LOGIC ---
    const uploadPromises = [];

    // Iterate over the files received from multer
    for (const fieldName in files) {
      if (Object.hasOwnProperty.call(files, fieldName)) {
        const fileArray = files[fieldName];
        if (fileArray && fileArray[0]) {
          // Use the 'uploadFile' utility function you created
          const promise = uploadFile(fileArray[0]).then((result) => {
            // Return an object with the field name and the secure URL
            return { [fieldName]: result.secureUrl };
          });
          uploadPromises.push(promise);
        }
      }
    }

    // Execute all uploads in parallel
    const uploadResults = await Promise.all(uploadPromises);

    // Consolidate the array of objects into a single object of URLs
    const documentUrls = uploadResults.reduce(
      (acc, current) => ({ ...acc, ...current }),
      {}
    );

    // --- DATABASE SAVING LOGIC ---


    // 4. Create and save the Document document with the Cloudinary URLs
    // Build the document payload dynamically to handle optional files
    const documentPayload = {};
    if (documentUrls.aadharCard)
      documentPayload.aadharCard = { url: documentUrls.aadharCard };
    if (documentUrls.passportSizePhoto)
      documentPayload.passportSizePhoto = {
        url: documentUrls.passportSizePhoto,
      };
    if (documentUrls.houseImage)
      documentPayload.houseImage = { url: documentUrls.houseImage };
    if (documentUrls.panCard)
      documentPayload.panCard = { url: documentUrls.panCard };
    if (documentUrls.rationCard)
      documentPayload.rationCard = { url: documentUrls.rationCard };
    if (documentUrls.birthCertificate)
      documentPayload.birthCertificate = { url: documentUrls.birthCertificate };
    if (documentUrls.leavingCertificate)
      documentPayload.leavingCertificate = {
        url: documentUrls.leavingCertificate,
      };
    if (documentUrls.casteCertificate)
      documentPayload.casteCertificate = { url: documentUrls.casteCertificate };
    if (documentUrls.casteValidityCertificate)
      documentPayload.casteValidityCertificate = {
        url: documentUrls.casteValidityCertificate,
      };
    if (documentUrls.incomeCertificate)
      documentPayload.incomeCertificate = {
        url: documentUrls.incomeCertificate,
      };
    if (documentUrls.domicileCertificate)
      documentPayload.domicileCertificate = {
        url: documentUrls.domicileCertificate,
      };

    const newDocument = new Document(documentPayload);
    const savedDocument = await newDocument.save();

    // 5. Create and save the final Beneficiary document
    const newBeneficiary = new Beneficiary({
      firstName: personalAndAcademicDetails.firstName,
      middleName: personalAndAcademicDetails.middleName,
      lastName: personalAndAcademicDetails.lastName,
      motherName: personalAndAcademicDetails.motherName,
      mobileNumber: personalAndAcademicDetails.mobileNumber,
      email: personalAndAcademicDetails.email,
      address: personalAndAcademicDetails.address,
      city: personalAndAcademicDetails.city,
      state: personalAndAcademicDetails.state,
      pinCode: personalAndAcademicDetails.pinCode,
      dob: personalAndAcademicDetails.dob,
      gender: personalAndAcademicDetails.gender,
      orphan: personalAndAcademicDetails.orphan,
      physicallyDisabled: personalAndAcademicDetails.physicallyDisabled,
      caste: personalAndAcademicDetails.caste,
      subCaste: personalAndAcademicDetails.subCaste,
      category: personalAndAcademicDetails.category,
      religion: personalAndAcademicDetails.religion,
      documentDetails: savedDocument._id,
    });
    const savedBeneficiary = await newBeneficiary.save();

    // 3. Create and save the Academic document
    const newAcademic = new Academic({
      academicField: personalAndAcademicDetails.academicField,
      academicYear: personalAndAcademicDetails.academicYear,
      courseName: personalAndAcademicDetails.courseName,
      collegeName: personalAndAcademicDetails.collegeName,
      lastAcademicYearPercentage:
        personalAndAcademicDetails.lastAcademicYearPercentage,
      hobbies: personalAndAcademicDetails.hobbies,
      beneficiaryDetails: savedBeneficiary._id,
    });
    const savedAcademic = await newAcademic.save();

    res.status(201).json({
      message: "Beneficiary registered successfully!",
      data: savedBeneficiary,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    res
      .status(500)
      .json({ error: "Server error during registration or file upload" });
  }
});

module.exports = router;
