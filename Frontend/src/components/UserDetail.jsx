import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Alert, DocumentViewer } from "./ui";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Configure axios base URL
axios.defaults.baseURL = BASE_URL;

const UserDetail = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("registration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
  const [showBookNumbering, setShowBookNumbering] = useState(false);
  const [bookNumberingData, setBookNumberingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user registration data
        const regRes = await axios.get(`/api/admin/users/${id}`, {
          headers: { "x-auth-token": token },
        });

        // Fetch user applications
        const appRes = await axios.get(`/api/admin/users/${id}/applications`, {
          headers: { "x-auth-token": token },
        });

        setRegistration(regRes.data);
        setApplications(appRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again later.");
        setLoading(false);
      }
    }
    fetchData();
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/admin");
  };

  const handleDownload = (url, filename) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = filename; // This will use the original filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadStudyBooksPDF = async (appId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/admin/download/study-books/${appId}`,
        {
          headers: { "x-auth-token": token },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `study-books-application-${appId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF.");
    }
  };

  const handleDownloadSchoolFeesPDF = async (appId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/admin/download/school-fees/${appId}`,
        {
          headers: { "x-auth-token": token },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `school-fees-application-${appId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF.");
    }
  };

  const handleDownloadTravelExpensesPDF = async (appId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/admin/download/travel-expenses/${appId}`,
        {
          headers: { "x-auth-token": token },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `travel-expenses-application-${appId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download PDF.");
    }
  };

  const handleApproveApplication = async (app) => {
    try {
      const token = localStorage.getItem("token");
      let url = "";
      if (app.applicationType === "schoolFees") {
        url = `/api/admin/approve/school-fees/${app._id}`;
      } else if (app.applicationType === "travelExpenses") {
        url = `/api/admin/approve/travel-expenses/${app._id}`;
      } else if (app.applicationType === "studyBooks") {
        url = `/api/admin/approve/study-books/${app._id}`;
      }
      await axios.post(url, {}, { headers: { "x-auth-token": token } });
      // Refresh applications list
      setApplications((prev) =>
        prev.map((a) => (a._id === app._id ? { ...a, status: "approved" } : a))
      );
      alert("Application approved!");
    } catch (err) {
      alert("Failed to approve application.");
    }
  };

  // Test function to check backend connectivity
  const testBackendConnection = async () => {
    try {
      console.log("Testing backend connection...");
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/admin/users", {
        headers: { "x-auth-token": token },
      });
      console.log("Backend is accessible:", response.status);
      return true;
    } catch (err) {
      console.error("Backend connection failed:", err);
      console.error("Error details:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        config: err.config,
      });
      return false;
    }
  };

  const handleStudyBooksUpdate = async (appId, field, value) => {
    try {
      console.log("Dropdown changed:", { appId, field, value });

      const token = localStorage.getItem("token");
      const currentApp = applications.find((app) => app._id === appId);

      if (!currentApp) {
        alert("Application not found in state.");
        return;
      }

      // Create a copy of the current app and update the specific field
      const updatedApp = { ...currentApp, [field]: value };

      // Update the application in state immediately for UI responsiveness
      setApplications((prev) =>
        prev.map((a) => (a._id === appId ? updatedApp : a))
      );

      // Check if all required fields are selected
      if (!updatedApp.standard || !updatedApp.stream || !updatedApp.medium) {
        console.log(
          "Not all required fields selected yet. Skipping backend update."
        );
        return; // Don't send request to backend yet
      }

      // Prepare the update data for backend
      const updateData = {
        standard: updatedApp.standard,
        stream: updatedApp.stream,
        medium: updatedApp.medium,
      };

      console.log("Sending update request:", {
        appId,
        field,
        value,
        updateData,
        url: `/api/admin/update/study-books/${appId}`,
      });

      const response = await axios.post(
        `/api/admin/update/study-books/${appId}`,
        updateData,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response:", response.data);

      // Update the application in state with generated ID
      setApplications((prev) =>
        prev.map((a) =>
          a._id === appId
            ? {
                ...a,
                generatedId: response.data.generatedId,
                setNumber: response.data.setNumber,
              }
            : a
        )
      );

      if (response.data.generatedId) {
        alert(`ID generated successfully: ${response.data.generatedId}`);
      }
    } catch (err) {
      console.error("Error updating study books application:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error message:", err.message);
      console.error("Error config:", err.config);

      // Revert the local state change if backend update failed
      setApplications((prev) =>
        prev.map((a) => (a._id === appId ? currentApp : a))
      );

      if (err.response?.status === 404) {
        alert("Application not found on server.");
      } else if (err.response?.status === 401) {
        alert("Authentication failed. Please login again.");
      } else if (err.response?.status === 403) {
        alert("Access denied. Admin privileges required.");
      } else if (err.code === "ERR_NETWORK") {
        alert("Network error. Please check if the backend server is running.");
      } else {
        alert(
          `Failed to update study books application: ${
            err.response?.data?.msg || err.message
          }`
        );
      }
    }
  };

  const handleAssignBookNumbers = async (appId, bookNumbers) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/admin/assign-book-numbers/${appId}`,
        { bookNumbers },
        {
          headers: { "x-auth-token": token },
        }
      );

      if (response.data.success) {
        // Update the application in the local state
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app._id === appId
              ? {
                  ...app,
                  bookNumbers: response.data.bookNumbers,
                }
              : app
          )
        );

        setError(""); // Clear any existing errors
        alert("Book numbers assigned successfully!");
      }
    } catch (err) {
      console.error("Error assigning book numbers:", err);
      setError(
        err.response?.data?.msg ||
          "Failed to assign book numbers. Please try again."
      );
    }
  };

  const handlePreviewDocument = async (url, title) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: { "x-auth-token": token },
        responseType: "blob",
      });
      const contentType = response.headers["content-type"];
      // Try to extract filename from Content-Disposition header
      let fileName = title;
      const disposition = response.headers["content-disposition"];
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match) fileName = match[1];
      }
      if (
        !contentType.startsWith("image/") &&
        contentType !== "application/pdf"
      ) {
        alert(
          "This document type cannot be previewed in the browser. Please download it instead."
        );
        return;
      }
      setViewingDocument({
        blob: response.data,
        contentType,
        fileName,
        url: URL.createObjectURL(response.data),
        title: fileName,
      });
    } catch (err) {
      alert("Failed to preview document.");
    }
  };

  const handleDirectDownload = async (url, title) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: { "x-auth-token": token },
        responseType: "blob",
      });
      let fileName = title;
      const disposition = response.headers["content-disposition"];
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match) fileName = match[1];
      }
      const blobUrl = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Failed to download document.");
    }
  };

  // Helper to fetch and preview travel expenses ID card (admin)
  const handleViewTravelIdCard = async (app) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `/api/admin/travel-expenses/${app._id}/file/idCard`,
        {
          headers: { "x-auth-token": token },
          responseType: "arraybuffer",
        }
      );
      // Try to extract filename from Content-Disposition header
      let fileName = "ID Card";
      const disposition = res.headers["content-disposition"];
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match) fileName = match[1];
      }
      setViewingDocument({
        blob: res.data,
        contentType: res.headers["content-type"],
        fileName,
        title: fileName,
      });
    } catch (err) {
      alert("Failed to load ID Card");
    }
  };

  const handleDownloadTravelIdCard = async (app) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `/api/admin/travel-expenses/${app._id}/file/idCard`,
        {
          headers: { "x-auth-token": token },
          responseType: "arraybuffer",
        }
      );
      let fileName = "id_card.pdf";
      const disposition = res.headers["content-disposition"];
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match) fileName = match[1];
      }
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download ID Card");
    }
  };

  const DocumentCard = ({ title, url, color, onClick }) => {
    const colors = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-500",
        hover: "hover:bg-blue-200",
        icon: "text-blue-500",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-500",
        hover: "hover:bg-green-200",
        icon: "text-green-500",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-500",
        hover: "hover:bg-purple-200",
        icon: "text-purple-500",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-500",
        hover: "hover:bg-orange-200",
        icon: "text-orange-500",
      },
      pink: {
        bg: "bg-pink-100",
        text: "text-pink-500",
        hover: "hover:bg-pink-200",
        icon: "text-pink-500",
      },
      indigo: {
        bg: "bg-indigo-100",
        text: "text-indigo-500",
        hover: "hover:bg-indigo-200",
        icon: "text-indigo-500",
      },
      teal: {
        bg: "bg-teal-100",
        text: "text-teal-500",
        hover: "hover:bg-teal-200",
        icon: "text-teal-500",
      },
    };

    const colorClasses = colors[color] || colors.blue;

    return (
      <div className="group p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex flex-col text-left w-full">
        <div className="flex items-center mb-3">
          <div className={`p-2 rounded-lg mr-3 ${colorClasses.bg}`}>
            <svg
              className={`w-6 h-6 ${colorClasses.text}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <span className="block font-medium text-gray-800 dark:text-white">
              {title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              View document
            </span>
          </div>
        </div>
        <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePreviewDocument(url, title)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview
            </button>
            <button
              onClick={() => handleDirectDownload(url, title)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
          </div>
          <span
            className={`p-1 rounded-full bg-gray-100 dark:bg-gray-700 ${colorClasses.hover} transition-colors duration-200`}
          >
            <svg
              className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${colorClasses.icon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  };

  const renderApplicationDetails = (app) => {
    switch (app.applicationType) {
      case "schoolFees":
        return (
          <div className="mt-4 space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white flex items-center mb-4">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Uploaded Documents
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                All required documents submitted by the student for school fees
                scholarship application.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {app.birthCertificate && app.birthCertificate.data && (
                  <DocumentCard
                    title="Birth Certificate"
                    url={`${BASE_URL}/api/admin/school-fees/${app._id}/file/birthCertificate`}
                    color="blue"
                    onClick={() =>
                      handlePreviewDocument(
                        `${BASE_URL}/api/admin/school-fees/${app._id}/file/birthCertificate`,
                        "Birth Certificate"
                      )
                    }
                  />
                )}
                {app.leavingCertificate && app.leavingCertificate.data && (
                  <DocumentCard
                    title="Leaving Certificate"
                    url={`${BASE_URL}/api/admin/school-fees/${app._id}/file/leavingCertificate`}
                    color="green"
                    onClick={() =>
                      handlePreviewDocument(
                        `${BASE_URL}/api/admin/school-fees/${app._id}/file/leavingCertificate`,
                        "Leaving Certificate"
                      )
                    }
                  />
                )}
                {app.marksheet && app.marksheet.data && (
                  <DocumentCard
                    title="Marksheet"
                    url={`${BASE_URL}/api/admin/school-fees/${app._id}/file/marksheet`}
                    color="purple"
                    onClick={() =>
                      handlePreviewDocument(
                        `${BASE_URL}/api/admin/school-fees/${app._id}/file/marksheet`,
                        "Marksheet"
                      )
                    }
                  />
                )}
                {app.admissionProof && app.admissionProof.data && (
                  <DocumentCard
                    title="Admission Proof"
                    url={`${BASE_URL}/api/admin/school-fees/${app._id}/file/admissionProof`}
                    color="orange"
                    onClick={() =>
                      handlePreviewDocument(
                        `${BASE_URL}/api/admin/school-fees/${app._id}/file/admissionProof`,
                        "Admission Proof"
                      )
                    }
                  />
                )}
                {app.incomeProof && app.incomeProof.data && (
                  <DocumentCard
                    title="Income Proof"
                    url={`${BASE_URL}/api/admin/school-fees/${app._id}/file/incomeProof`}
                    color="pink"
                    onClick={() =>
                      handlePreviewDocument(
                        `${BASE_URL}/api/admin/school-fees/${app._id}/file/incomeProof`,
                        "Income Proof"
                      )
                    }
                  />
                )}
                {app.bankAccount && app.bankAccount.data && (
                  <DocumentCard
                    title="Bank Account Details"
                    url={`${BASE_URL}/api/admin/school-fees/${app._id}/file/bankAccount`}
                    color="indigo"
                    onClick={() =>
                      handlePreviewDocument(
                        `${BASE_URL}/api/admin/school-fees/${app._id}/file/bankAccount`,
                        "Bank Account Details"
                      )
                    }
                  />
                )}
                {app.rationCard && app.rationCard.data && (
                  <DocumentCard
                    title="Ration Card"
                    url={`${BASE_URL}/api/admin/school-fees/${app._id}/file/rationCard`}
                    color="teal"
                    onClick={() =>
                      handlePreviewDocument(
                        `${BASE_URL}/api/admin/school-fees/${app._id}/file/rationCard`,
                        "Ration Card"
                      )
                    }
                  />
                )}
              </div>
            </div>
            <button
              onClick={() => handleDownloadSchoolFeesPDF(app._id)}
              className="ml-2 px-3 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
              title="Download Application PDF"
            >
              <svg
                className="w-4 h-4 mr-1 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF
            </button>
          </div>
        );
      case "travelExpenses":
        return (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Residence Place
              </p>
              <p className="text-gray-900 dark:text-white">
                {app.residencePlace}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Destination Place
              </p>
              <p className="text-gray-900 dark:text-white">
                {app.destinationPlace}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Distance (km)
              </p>
              <p className="text-gray-900 dark:text-white">{app.distance}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Travel Mode
              </p>
              <p className="text-gray-900 dark:text-white">{app.travelMode}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Aid Required (INR)
              </p>
              <p className="text-gray-900 dark:text-white font-bold">
                {app.aidRequired}
              </p>
            </div>
            {app.idCard && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  ID Card
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewTravelIdCard(app)}
                    className="inline-flex items-center text-primary hover:text-primary-dark"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownloadTravelIdCard(app)}
                    className="inline-flex items-center text-primary hover:text-primary-dark"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case "studyBooks":
        return (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Year of Study
                </p>
                <p className="text-gray-900 dark:text-white">
                  {app.yearOfStudy}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Field of Study
                </p>
                <p className="text-gray-900 dark:text-white">
                  {app.field || app.courseName || "Not specified"}
                </p>
              </div>
            </div>

            {/* Admin Dropdowns */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Admin Configuration
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Standard
                  </label>
                  <select
                    value={app.standard || ""}
                    onChange={(e) =>
                      handleStudyBooksUpdate(
                        app._id,
                        "standard",
                        e.target.value
                      )
                    }
                    disabled={app.status === "approved"}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Standard</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stream
                  </label>
                  <select
                    value={app.stream || ""}
                    onChange={(e) =>
                      handleStudyBooksUpdate(app._id, "stream", e.target.value)
                    }
                    disabled={app.status === "approved"}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Stream</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Bachelor of Arts">
                      Bachelor of Arts (BA)
                    </option>
                    <option value="Bcom">Bcom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Medium
                  </label>
                  <select
                    value={app.medium || ""}
                    onChange={(e) =>
                      handleStudyBooksUpdate(app._id, "medium", e.target.value)
                    }
                    disabled={app.status === "approved"}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Medium</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                </div>
              </div>
              {app.generatedId && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Generated ID
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {app.generatedId}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Books Required
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => {
                      const books = app.booksRequired
                        .split(",")
                        .map((book) => book.trim());
                      const bookNumbersInput = books.map((book, index) => ({
                        book,
                        number: 1, // Start with 1 for manual entry
                      }));
                      setBookNumberingData({
                        appId: app._id,
                        books: bookNumbersInput,
                      });
                      setShowBookNumbering(true);
                    }}
                    disabled={app.status === "approved"}
                  >
                    Assign Book Numbers
                  </Button>
                  {app.status === "approved" && (
                    <div className="relative group">
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm rounded-lg shadow-lg border border-red-200 dark:border-red-800 whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Cannot assign book numbers - Application approved
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-100 dark:border-t-red-900/20"></div>
                      </div>
                      <div className="w-4 h-4 text-red-500 dark:text-red-400 cursor-help">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {app.booksRequired.split(",").map((book, index) => {
                  const trimmedBook = book.trim();
                  const match = trimmedBook.match(
                    /(.+?)\s*\((Textbook|Guide)\)/i
                  );

                  // Get assigned book number if available
                  const assignedNumber =
                    app.bookNumbers && app.bookNumbers[trimmedBook]
                      ? app.bookNumbers[trimmedBook]
                      : null;
                  const displayNumber = assignedNumber || index + 1;

                  if (match) {
                    const name = match[1].trim();
                    const type = match[2];
                    return (
                      <div
                        key={index}
                        className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {name}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              ({type})
                            </span>
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              assignedNumber
                                ? "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            #{displayNumber}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {trimmedBook}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            assignedNumber
                              ? "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          #{displayNumber}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <p className="text-gray-500 dark:text-gray-400 italic mt-4">
            No details available
          </p>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Button
              variant="secondary"
              onClick={handleBack}
              size="small"
              className="mb-4 sm:mb-0"
            >
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </span>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {registration?.applicantName || "User Details"}
            </h1>
            {registration && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {registration.collegeName} • {registration.academicYear}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                registration
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {registration ? "Registered" : "Not Registered"}
            </span>
            {applications.length > 0 && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {applications.length} Application
                {applications.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <Alert
          variant="error"
          className="mb-6"
          dismissible
          onDismiss={() => setError("")}
        >
          {error}
        </Alert>
      )}

      <div className="mb-6">
        <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setActiveTab("registration")}
            className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 ${
              activeTab === "registration"
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <span className="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mb-1 sm:mb-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Registration Details
            </span>
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 ${
              activeTab === "applications"
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <span className="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mb-1 sm:mb-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Applications ({applications.length})
            </span>
          </button>
        </div>
      </div>

      {activeTab === "registration" ? (
        <Card
          shadow="md"
          padding="normal"
          rounded="lg"
          className="border border-gray-200 dark:border-gray-700"
        >
          {registration ? (
            <div>
              <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Applicant Details
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Full Name
                      </div>
                      <div className="text-gray-900 dark:text-white font-medium">
                        {registration.applicantName}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Mother's Name
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.motherName}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Date of Birth
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.dob &&
                          new Date(registration.dob).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Gender
                      </div>
                      <div className="text-gray-900 dark:text-white capitalize">
                        {registration.gender}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Contact & Address
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Address
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.address}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        State
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.state}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Caste
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.caste || "Not specified"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Education
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Academic Year
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.academicYear}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        College Name
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.collegeName}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Course Name
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {registration.courseName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-5 h-5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Special Status
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Orphan Status
                      </div>
                      <div>
                        {registration.orphan ? (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <svg
                              className="w-4 h-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            <svg
                              className="w-4 h-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            No
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Disabled Status
                      </div>
                      <div>
                        {registration.disabled ? (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            <svg
                              className="w-4 h-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            <svg
                              className="w-4 h-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            No
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-10 w-10 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Registration Data
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                This user has not completed their registration form yet.
                Registration data will appear here once submitted.
              </p>
            </div>
          )}
        </Card>
      ) : (
        <div className="space-y-6">
          {applications.length === 0 ? (
            <Card
              shadow="md"
              padding="normal"
              rounded="lg"
              className="border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center py-10 px-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-10 w-10 text-blue-500 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Applications Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  This user has not submitted any scholarship applications. When
                  they do, the applications will appear here.
                </p>
              </div>
            </Card>
          ) : (
            applications.map((app, index) => (
              <Card
                key={app._id || index}
                shadow="md"
                padding="normal"
                rounded="lg"
                className="border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      {app.applicationType === "schoolFees" && (
                        <>
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                            />
                          </svg>
                          School Fees Scholarship
                        </>
                      )}
                      {app.applicationType === "travelExpenses" && (
                        <>
                          <svg
                            className="w-5 h-5 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Travel Expenses Support
                        </>
                      )}
                      {app.applicationType === "studyBooks" && (
                        <>
                          <svg
                            className="w-5 h-5 mr-2 text-purple-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          Study Books Assistance
                        </>
                      )}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Submitted:{" "}
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {new Date(app.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.status !== "approved" && (
                      <button
                        onClick={() => handleApproveApplication(app)}
                        className="ml-2 px-3 py-1.5 text-sm font-medium rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                        title="Approve Application"
                      >
                        <svg
                          className="w-4 h-4 mr-1 inline"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Approve
                      </button>
                    )}
                    <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      ID: #{app._id ? app._id.slice(-5) : index + 1}
                    </span>
                  </div>
                </div>
                {renderApplicationDetails(app)}
                {app.applicationType === "studyBooks" && (
                  <button
                    onClick={() => handleDownloadStudyBooksPDF(app._id)}
                    className="ml-2 px-3 py-1.5 text-sm font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition"
                    title="Download Application PDF"
                  >
                    <svg
                      className="w-4 h-4 mr-1 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download PDF
                  </button>
                )}
                {app.applicationType === "travelExpenses" && (
                  <button
                    onClick={() => handleDownloadTravelExpensesPDF(app._id)}
                    className="ml-2 px-3 py-1.5 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition"
                    title="Download Application PDF"
                  >
                    <svg
                      className="w-4 h-4 mr-1 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download PDF
                  </button>
                )}
              </Card>
            ))
          )}
        </div>
      )}
      {viewingDocument && (
        <DocumentViewer
          blob={viewingDocument.blob}
          contentType={viewingDocument.contentType}
          fileName={viewingDocument.fileName}
          title={viewingDocument.title}
          onClose={() => setViewingDocument(null)}
        />
      )}

      {/* Book Numbering Modal */}
      {showBookNumbering && bookNumberingData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Assign Book Numbers
              </h3>
              <button
                onClick={() => {
                  setShowBookNumbering(false);
                  setBookNumberingData(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assign numbers to each book. You can assign the same number to
                multiple students if needed.
              </p>

              <div className="space-y-3">
                {bookNumberingData.books.map((bookData, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {bookData.book}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600 dark:text-gray-400">
                        Book #:
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={bookData.number}
                        onChange={(e) => {
                          const newBooks = [...bookNumberingData.books];
                          newBooks[index].number =
                            parseInt(e.target.value) || 1;
                          setBookNumberingData({
                            ...bookNumberingData,
                            books: newBooks,
                          });
                        }}
                        className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowBookNumbering(false);
                    setBookNumberingData(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    const bookNumbers = bookNumberingData.books.map(
                      (book) => book.number
                    );
                    await handleAssignBookNumbers(
                      bookNumberingData.appId,
                      bookNumbers
                    );
                    setShowBookNumbering(false);
                    setBookNumberingData(null);
                  }}
                >
                  Assign Numbers
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
