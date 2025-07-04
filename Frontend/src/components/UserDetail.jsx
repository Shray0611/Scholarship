import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Alert, DocumentViewer } from "./ui";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const UserDetail = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("registration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewingDocument, setViewingDocument] = useState(null);
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
                    onClick={() =>
                      setViewingDocument({
                        url: BASE_URL + app.idCard,
                        title: "ID Card",
                      })
                    }
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
                    onClick={() => handleDownload(app.idCard, "id_card.pdf")}
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
                <p className="text-gray-900 dark:text-white">{app.field}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Books Required
              </p>
              <div className="p-4 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {app.booksRequired}
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
          url={viewingDocument.url}
          blob={viewingDocument.blob}
          contentType={viewingDocument.contentType}
          fileName={viewingDocument.fileName}
          title={viewingDocument.title}
          onClose={() => setViewingDocument(null)}
        />
      )}
    </div>
  );
};

export default UserDetail;
