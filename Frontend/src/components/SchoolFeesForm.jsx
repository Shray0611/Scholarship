import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SchoolFeesForm = () => {
  const [files, setFiles] = useState({
    birthCertificate: null,
    leavingCertificate: null,
    marksheet: null,
    admissionProof: null,
    incomeProof: null,
    bankAccount: null,
    rationCard: null,
  });
  const [fileNames, setFileNames] = useState({
    birthCertificate: "",
    leavingCertificate: "",
    marksheet: "",
    admissionProof: "",
    incomeProof: "",
    bankAccount: "",
    rationCard: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setFileNames((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if all required files are uploaded
    const requiredFiles = [
      "birthCertificate",
      "leavingCertificate",
      "marksheet",
      "admissionProof",
      "incomeProof",
      "bankAccount",
    ];

    const missingFiles = requiredFiles.filter((file) => !files[file]);

    if (missingFiles.length > 0) {
      setError(
        `Please upload all required documents: ${missingFiles.join(", ")}`
      );
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      // Add all files to form data
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      // Add application type
      formData.append("applicationType", "schoolFees");

      const token = localStorage.getItem("token");
      await axios.post("/api/applications/school-fees", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setLoading(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/options");
      }, 2000);
    } catch (err) {
      console.error("Error submitting school fees application:", err);
      setError(err.response?.data?.msg || "Failed to submit application");
      setLoading(false);
    }
  };

  const renderFileInput = (name, label, isRequired = true) => {
    const hasFile = fileNames[name] !== "";

    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <div
            className={`border-2 border-dashed rounded-lg p-4 transition-all ${
              hasFile
                ? "bg-blue-50 border-blue-300"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <input
              type="file"
              name={name}
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              {hasFile ? (
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-blue-600 truncate max-w-xs">
                    {fileNames[name]}
                  </span>
                </div>
              ) : (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPG, PNG (Max 10MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 pb-16">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 py-6 px-6">
          <h2 className="text-2xl font-bold text-white">
            Apply for School Fees Scholarship
          </h2>
          <p className="text-blue-100 mt-1">
            Please upload all required documents to complete your application
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Application submitted successfully! Redirecting to options
                    page...
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Required Documents
              </h3>
              <div className="border-b border-gray-200 mb-6"></div>

              {renderFileInput("birthCertificate", "Birth Certificate")}
              {renderFileInput(
                "leavingCertificate",
                "Leaving Certificate (Previous Schooling)"
              )}
              {renderFileInput(
                "marksheet",
                "Marksheet (All marksheets combined in one)"
              )}
              {renderFileInput("admissionProof", "Proof of Admission")}
              {renderFileInput("incomeProof", "Proof of Income")}
              {renderFileInput("bankAccount", "Bank Account Details")}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Optional Documents
              </h3>
              <div className="border-b border-gray-200 mb-6"></div>

              {renderFileInput("rationCard", "Ration Card", false)}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/options")}
                className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Need help? Contact our support team at support@university.edu</p>
      </div>
    </div>
  );
};

export default SchoolFeesForm;
