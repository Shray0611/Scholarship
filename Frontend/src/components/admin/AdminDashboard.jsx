import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Alert } from "../ui";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Get all users
        const res = await axios.get("/api/admin/users", {
          headers: { "x-auth-token": token },
        });

        // Store all users
        setUsers(res.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
        setLoading(false);
      }
    }
    fetchUsers();
  }, [navigate]);

  const handleUserClick = (id) => {
    navigate(`/admin/users/${id}`);
  };

  const handleEditUser = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  const handleScholarshipApplication = (userId) => {
    navigate(`/admin/users/${userId}/apply/scholarship`);
  };

  const handleTravelApplication = (userId) => {
    navigate(`/admin/users/${userId}/apply/travel`);
  };

  const handleAddBeneficiary = () => {
    navigate("/admin/add-beneficiary");
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Beneficiary Management
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/add-beneficiary")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Beneficiary
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString("en-GB")}
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

      <Card
        title="Beneficiary Management"
        subtitle="Manage beneficiaries and their applications"
        shadow="lg"
        padding="normal"
        rounded="lg"
        className="border border-gray-200 mb-8"
      >
        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p>No beneficiaries found in the system.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <div className="flex flex-wrap gap-3 justify-center items-center max-w-2xl">
                          <button
                            onClick={() => handleUserClick(user._id)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium px-3 py-2 rounded-md bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 transition-colors duration-200 text-sm min-w-fit"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleEditUser(user._id)}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium px-3 py-2 rounded-md bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800 transition-colors duration-200 text-sm min-w-fit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleScholarshipApplication(user._id)
                            }
                            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium px-3 py-2 rounded-md bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800 transition-colors duration-200 text-sm min-w-fit"
                          >
                            School Fees Scholarship
                          </button>
                          <button
                            onClick={() => handleTravelApplication(user._id)}
                            className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-medium px-3 py-2 rounded-md bg-orange-50 hover:bg-orange-100 dark:bg-orange-900 dark:hover:bg-orange-800 transition-colors duration-200 text-sm min-w-fit"
                          >
                            Travel
                          </button>
                          <button
                            onClick={() =>
                              handleStudyBooksApplication(user._id)
                            }
                            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium px-3 py-2 rounded-md bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800 transition-colors duration-200 text-sm min-w-fit"
                          >
                            Study Books
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminDashboard;
