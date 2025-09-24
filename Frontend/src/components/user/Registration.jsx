import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const today = new Date().toISOString().split("T")[0];

  // State for handling submission feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    dob: "",
    gender: "",
    orphan: false,
    physicallyDisabled: false,
    motherName: "",
    caste: "",
    subCaste: "",
    category: "",
    religion: "",

    // Step 2: Academic Details
    academicField: "",
    academicYear: "",
    courseName: "",
    collegeName: "",
    lastAcademicYearPercentage: "",
    hobbies: "",

    // Step 3: Documents
    aadharCard: null,
    passportSizePhoto: null,
    houseImage: null,
    panCard: null,
    rationCard: null,
    birthCertificate: null,
    leavingCertificate: null,
    casteCertificate: null,
    casteValidityCertificate: null,
    incomeCertificate: null,
    domicileCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validation for academicYear to be within a range
    if (name === "academicYear") {
      if (value.length > 4) return;
      const year = parseInt(value, 10);
      const maxYear = new Date().getFullYear() + 10;
      if (value !== "" && (year < 2000 || year > maxYear)) {
        return;
      }
    }

    // NEW VALIDATION FOR NUMERIC FIELDS
    // Prevent non-numeric characters and enforce length for mobile number and pin code
    if (name === "mobileNumber" || name === "pinCode") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove any non-digit characters
      const maxLength = name === "mobileNumber" ? 10 : 6;

      // Only update state if the length is within the limit
      if (numericValue.length <= maxLength) {
        setFormData({
          ...formData,
          [name]: numericValue,
        });
      }
      return; // Important to stop the function here
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0] || null,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    const dataToSubmit = new FormData();
    for (const key in formData) {
      dataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/beneficiary-register",
        dataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsLoading(false);
      setSuccessMessage(response.data.message || "Registration successful!");
      console.log("Server response:", response.data);
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.error ||
          "An unknown error occurred during submission."
      );
      console.error("Submission failed:", err);
    }
  };

  const renderFileInput = (name, label, isRequired = false) => (
    <div key={name}>
      <label className="font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        required={isRequired}
        className="w-full border p-2 rounded mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-8 my-10 bg-white shadow-lg rounded-md">
      {successMessage && (
        <div className="p-4 mb-4 text-green-800 bg-green-100 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="p-4 mb-4 text-red-800 bg-red-100 border border-red-300 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Personal Details
            </h2>
            {[
              "firstName",
              "middleName",
              "lastName",
              "motherName",
              "mobileNumber",
              "email",
              "address",
              "city",
              "state",
              "pinCode",
              "dob",
              "caste",
              "subCaste",
            ].map((field) => (
              <div key={field}>
                <label className="capitalize font-medium text-gray-700">
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={
                    field === "dob"
                      ? "date"
                      : field === "email"
                      ? "email"
                      : field === "mobileNumber" || field === "pinCode"
                      ? "tel" // Use 'tel' for numeric keypads on mobile
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={!["subCaste", "email"].includes(field)}
                  className="w-full border p-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
                  max={field === "dob" ? today : undefined}
                  // Add pattern for extra validation and better UX
                  pattern={
                    field === "mobileNumber"
                      ? "[0-9]{10}"
                      : field === "pinCode"
                      ? "[0-9]{6}"
                      : undefined
                  }
                />
              </div>
            ))}
            <div>
              <label className="font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-gray-700">Religion</label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Jain">Jain</option>
                <option value="Sikh">Sikh</option>
              </select>
            </div>
            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="orphan"
                  checked={formData.orphan}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Orphan
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="physicallyDisabled"
                  checked={formData.physicallyDisabled}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Physically Disabled
              </label>
            </div>
          </div>
        )}

        {/* Step 2 & 3 and Navigation Buttons remain the same */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Academic Details
            </h2>
            {[
              { name: "academicField", label: "Academic Field" },
              { name: "courseName", label: "Course Name" },
              { name: "collegeName", label: "College Name" },
            ].map((field) => (
              <div key={field.name}>
                <label className="font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
            <div>
              <label className="font-medium text-gray-700">Academic Year</label>
              <input
                type="number"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                required
                min="2000"
                max={new Date().getFullYear() + 10}
                placeholder="YYYY"
                className="w-full border p-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Last Academic Year Percentage
              </label>
              <input
                type="number"
                name="lastAcademicYearPercentage"
                value={formData.lastAcademicYearPercentage}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                className="w-full border p-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">
                Hobbies (Optional)
              </label>
              <input
                type="text"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
              Upload Documents
            </h2>
            <h3 className="text-lg font-semibold border-b pb-2">
              Compulsory Documents
            </h3>
            {renderFileInput("aadharCard", "Aadhar Card", true)}
            {renderFileInput("passportSizePhoto", "Passport Size Photo", true)}
            {renderFileInput("houseImage", "House Image", true)}
            <h3 className="text-lg font-semibold border-b pb-2 pt-4">
              Optional Documents
            </h3>
            {renderFileInput("panCard", "PAN Card")}
            {renderFileInput("rationCard", "Ration Card")}
            {renderFileInput("birthCertificate", "Birth Certificate")}
            {renderFileInput("leavingCertificate", "Leaving Certificate")}
            {renderFileInput("casteCertificate", "Caste Certificate")}
            {renderFileInput(
              "casteValidityCertificate",
              "Caste Validity Certificate"
            )}
            {renderFileInput("incomeCertificate", "Income Certificate")}
            {renderFileInput("domicileCertificate", "Domicile Certificate")}
          </div>
        )}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400 font-semibold"
            >
              Previous
            </button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
