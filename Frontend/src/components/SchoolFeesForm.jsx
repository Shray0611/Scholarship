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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <div
            className={`border-2 border-dashed rounded-xl p-5 transition-all ${
              hasFile
                ? "bg-blue-50 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700"
                : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-600"
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
                    className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate max-w-xs">
                    {fileNames[name]}
                  </span>
                </div>
              ) : (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500"
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
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
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
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 py-8 px-8">
            <h2 className="text-3xl font-bold text-white">
              Apply for School Fees Scholarship
            </h2>
            <p className="text-blue-100 mt-2 text-lg">
              Please upload all required documents to complete your application
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-8 rounded-r-md">
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
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 mb-8 rounded-r-md">
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
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      Application submitted successfully! Redirecting to options
                      page...
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Required Documents
                </h3>
                <div className="border-b-2 border-gray-200 dark:border-gray-700 mb-8"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Optional Documents
                </h3>
                <div className="border-b-2 border-gray-200 dark:border-gray-700 mb-8"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFileInput("rationCard", "Ration Card", false)}
                </div>
              </div>

              <div className="flex justify-end items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate("/options")}
                  className="mr-4 px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 flex items-center transition-colors"
                >
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <p>
            Need help? Contact our support team at{" "}
            <span className="text-blue-600 dark:text-blue-400">
              support@university.edu
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchoolFeesForm;
