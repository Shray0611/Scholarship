import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TravelExpensesForm = () => {
  const [formData, setFormData] = useState({
    residencePlace: "",
    destinationPlace: "",
    distance: "",
    travelMode: "",
    aidRequired: "",
  });
  const [idCard, setIdCard] = useState(null);
  const [idCardName, setIdCardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setIdCard(e.target.files[0]);
      setIdCardName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form data
    if (
      !formData.residencePlace ||
      !formData.destinationPlace ||
      !formData.distance ||
      !formData.travelMode ||
      !formData.aidRequired ||
      !idCard
    ) {
      setError("Please fill in all fields and upload your ID card");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Add ID card file
      submitData.append("idCard", idCard);

      // Add application type
      submitData.append("applicationType", "travelExpenses");

      const token = localStorage.getItem("token");
      await axios.post("/api/applications/travel-expenses", submitData, {
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
      console.error("Error submitting travel expenses application:", err);
      setError(err.response?.data?.msg || "Failed to submit application");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4 pb-16">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 dark:bg-green-700 py-6 px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Apply for Travel Expenses
              </h2>
              <p className="text-green-100 mt-1">
                Please provide details about your travel requirements
              </p>
            </div>
            <div className="hidden md:block">
              <svg
                className="h-16 w-16 text-green-200 opacity-80"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 dark:text-gray-100">
          {(error || success) && (
            <div className="mb-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
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
                      <p className="text-sm text-red-700 dark:text-red-400">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
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
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Application submitted successfully! Redirecting to
                        options page...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Main form sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Personal Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Travel Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Place of Residence{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="residencePlace"
                        value={formData.residencePlace}
                        onChange={handleChange}
                        placeholder="Enter your place of residence"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                        dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Destination Place{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="destinationPlace"
                        value={formData.destinationPlace}
                        onChange={handleChange}
                        placeholder="Enter your destination (e.g., college, school)"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                        dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mode of Transportation{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="travelMode"
                    value={formData.travelMode}
                    onChange={handleChange}
                    placeholder="Describe how you travel (e.g., bus, train, auto-rickshaw)"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Right column - Financial and Distance */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Financial Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Approximate Distance (in km){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="distance"
                          value={formData.distance}
                          onChange={handleChange}
                          placeholder="Enter the distance"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                          dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                            km
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Financial Aid Required{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                            ₹
                          </span>
                        </div>
                        <input
                          type="number"
                          name="aidRequired"
                          value={formData.aidRequired}
                          onChange={handleChange}
                          placeholder="Enter the amount needed"
                          min="1"
                          className="w-full pl-7 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                          dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                            INR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload - Full Width */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                Documentation
              </h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload ID Card <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 transition-all ${
                      idCardName
                        ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600"
                        : "border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500"
                    }`}
                  >
                    <input
                      type="file"
                      name="idCard"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="text-center">
                      {idCardName ? (
                        <div className="flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-green-600 dark:text-green-400 truncate max-w-xs">
                            {idCardName}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                            />
                          </svg>
                          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                            Click to upload your ID card or drag and drop
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            Student ID, College ID, or Government ID (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/options")}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md 
                text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent shadow-sm text-base font-medium rounded-md 
                text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 
                disabled:opacity-50 flex items-center"
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

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Need assistance? Contact our support team at support@university.edu
        </p>
      </div>
    </div>
  );
};

export default TravelExpensesForm;
