import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Alert } from "./ui";

const UserHistory = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchApplications() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user applications
        const res = await axios.get("/api/applications/my-applications", {
          headers: { "x-auth-token": token },
        });

        setApplications(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load your applications. Please try again later.");
        setLoading(false);
      }
    }
    fetchApplications();
  }, [navigate]);

  const getStatusBadge = (status) => {
    // Default is pending
    let badgeClass =
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200";
    let statusText = "Pending";
    let icon = (
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
    );

    // If status is available in the future, update accordingly
    if (status === "approved") {
      badgeClass =
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
      statusText = "Approved";
      icon = (
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    } else if (status === "rejected") {
      badgeClass =
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
      statusText = "Rejected";
      icon = (
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }

    return (
      <span
        className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center ${badgeClass}`}
      >
        {icon}
        {statusText}
      </span>
    );
  };

  const renderSchoolFeesDetails = (app) => {
    return (
      <div className="mt-6 space-y-6">
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
            Documents submitted for your school fees scholarship application.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {app.birthCertificate && (
              <DocumentCard
                title="Birth Certificate"
                url={app.birthCertificate}
                color="blue"
              />
            )}
            {app.leavingCertificate && (
              <DocumentCard
                title="Leaving Certificate"
                url={app.leavingCertificate}
                color="green"
              />
            )}
            {app.marksheet && (
              <DocumentCard
                title="Marksheet"
                url={app.marksheet}
                color="purple"
              />
            )}
            {app.admissionProof && (
              <DocumentCard
                title="Admission Proof"
                url={app.admissionProof}
                color="orange"
              />
            )}
            {app.incomeProof && (
              <DocumentCard
                title="Income Proof"
                url={app.incomeProof}
                color="pink"
              />
            )}
            {app.bankAccount && (
              <DocumentCard
                title="Bank Account Details"
                url={app.bankAccount}
                color="indigo"
              />
            )}
            {app.rationCard && (
              <DocumentCard
                title="Ration Card"
                url={app.rationCard}
                color="teal"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTravelExpensesDetails = (app) => {
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
            Residence Place
          </p>
          <p className="text-gray-900 dark:text-white">{app.residencePlace}</p>
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
            <a
              href={app.idCard}
              target="_blank"
              rel="noopener noreferrer"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View ID Card
            </a>
          </div>
        )}
      </div>
    );
  };

  const renderStudyBooksDetails = (app) => {
    return (
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
              Year of Study
            </p>
            <p className="text-gray-900 dark:text-white">{app.yearOfStudy}</p>
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
  };

  const renderApplicationDetails = (app) => {
    switch (app.applicationType) {
      case "schoolFees":
        return renderSchoolFeesDetails(app);
      case "travelExpenses":
        return renderTravelExpensesDetails(app);
      case "studyBooks":
        return renderStudyBooksDetails(app);
      default:
        return (
          <p className="text-gray-500 dark:text-gray-400 italic mt-4">
            No details available
          </p>
        );
    }
  };

  const DocumentCard = ({ title, url, color }) => {
    const colors = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-500 dark:text-blue-400",
        hover: "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30",
        icon: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-500 dark:text-green-400",
        hover: "group-hover:bg-green-100 dark:group-hover:bg-green-900/30",
        icon: "group-hover:text-green-600 dark:group-hover:text-green-400",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-500 dark:text-purple-400",
        hover: "group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30",
        icon: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-500 dark:text-orange-400",
        hover: "group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30",
        icon: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
      },
      pink: {
        bg: "bg-pink-100 dark:bg-pink-900/30",
        text: "text-pink-500 dark:text-pink-400",
        hover: "group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30",
        icon: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
      },
      indigo: {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        text: "text-indigo-500 dark:text-indigo-400",
        hover: "group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30",
        icon: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
      },
      teal: {
        bg: "bg-teal-100 dark:bg-teal-900/30",
        text: "text-teal-500 dark:text-teal-400",
        hover: "group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30",
        icon: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
      },
    };

    const colorClasses = colors[color] || colors.blue;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex flex-col"
      >
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
              PDF Document
            </span>
          </div>
        </div>
        <div className="mt-auto pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            View document
          </span>
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </div>
      </a>
    );
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              My Scholarship Applications
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View all your scholarship applications and their status
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/options")}
              className="inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Apply for Scholarship
            </button>
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
              You haven't submitted any scholarship applications yet. Click the
              button above to apply for a scholarship.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {applications.map((app, index) => (
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
                  {getStatusBadge(app.status)}
                  <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    ID: #{app._id ? app._id.slice(-5) : index + 1}
                  </span>
                </div>
              </div>
              {renderApplicationDetails(app)}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
