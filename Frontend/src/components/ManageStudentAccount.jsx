import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Alert, Button, Input } from "./ui";

const ManageStudentAccount = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  
  const [registrationData, setRegistrationData] = useState({
    academicYear: "",
    collegeName: "",
    courseName: "",
    applicantName: "",
    motherName: "",
    dob: "",
    address: "",
    villageName: "",
    state: "",
    caste: "",
    gender: "",
    orphan: false,
    disabled: false
  });

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Fetch user details
      const userResponse = await axios.get(`/api/admin/users/${userId}`, {
        headers: { "x-auth-token": token }
      });

      // Fetch registration details
      const registrationResponse = await axios.get(`/api/admin/users/${userId}`, {
        headers: { "x-auth-token": token }
      });

      if (registrationResponse.data) {
        setRegistrationData({
          academicYear: registrationResponse.data.academicYear || "",
          collegeName: registrationResponse.data.collegeName || "",
          courseName: registrationResponse.data.courseName || "",
          applicantName: registrationResponse.data.applicantName || "",
          motherName: registrationResponse.data.motherName || "",
          dob: registrationResponse.data.dob ? new Date(registrationResponse.data.dob).toISOString().split('T')[0] : "",
          address: registrationResponse.data.address || "",
          villageName: registrationResponse.data.villageName || "",
          state: registrationResponse.data.state || "",
          caste: registrationResponse.data.caste || "",
          gender: registrationResponse.data.gender || "",
          orphan: registrationResponse.data.orphan || false,
          disabled: registrationResponse.data.disabled || false
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data");
      setLoading(false);
    }
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Validate password confirmation
      if (userData.password && userData.password !== userData.confirmPassword) {
        setError("Passwords do not match");
        setSaving(false);
        return;
      }

      const updateData = {
        ...registrationData
      };

      // Only include user data if password is being changed
      if (userData.password) {
        updateData.password = userData.password;
      }
      if (userData.username) {
        updateData.username = userData.username;
      }

      await axios.put(`/api/admin/update-student-account/${userId}`, updateData, {
        headers: { "x-auth-token": token }
      });

      setSuccess("Student account updated successfully");
      
      // Clear password fields
      setUserData(prev => ({
        ...prev,
        password: "",
        confirmPassword: ""
      }));

    } catch (err) {
      console.error("Error updating student account:", err);
      setError(err.response?.data?.msg || "Failed to update student account");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.delete(`/api/admin/delete-student-account/${userId}`, {
        headers: { "x-auth-token": token }
      });

      setSuccess("Student account deleted successfully");
      setTimeout(() => {
        navigate("/admin");
      }, 2000);

    } catch (err) {
      console.error("Error deleting student account:", err);
      setError(err.response?.data?.msg || "Failed to delete student account");
    } finally {
      setSaving(false);
      setShowDeleteConfirm(false);
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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Student Account
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate("/admin")}
        >
          Back to Dashboard
        </Button>
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

      {success && (
        <Alert
          variant="success"
          className="mb-6"
          dismissible
          onDismiss={() => setSuccess("")}
        >
          {success}
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Account Details */}
        <Card
          title="User Account Details"
          subtitle="Update username and password"
          shadow="lg"
          padding="normal"
          rounded="lg"
          className="border border-gray-200"
        >
          <div className="space-y-4">
            <Input
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleUserDataChange}
              placeholder="Leave empty to keep current username"
            />
            
            <Input
              label="New Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleUserDataChange}
              placeholder="Leave empty to keep current password"
            />
            
            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={userData.confirmPassword}
              onChange={handleUserDataChange}
              placeholder="Confirm new password"
            />
          </div>
        </Card>

        {/* Student Registration Details */}
        <Card
          title="Student Registration Details"
          subtitle="Update student information"
          shadow="lg"
          padding="normal"
          rounded="lg"
          className="border border-gray-200"
        >
          <div className="space-y-4">
            <Input
              label="Applicant Name"
              name="applicantName"
              value={registrationData.applicantName}
              onChange={handleRegistrationDataChange}
              required
            />
            
            <Input
              label="Mother's Name"
              name="motherName"
              value={registrationData.motherName}
              onChange={handleRegistrationDataChange}
              required
            />
            
            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              value={registrationData.dob}
              onChange={handleRegistrationDataChange}
              required
            />
            
            <Input
              label="Gender"
              name="gender"
              value={registrationData.gender}
              onChange={handleRegistrationDataChange}
            />
            
            <Input
              label="Caste"
              name="caste"
              value={registrationData.caste}
              onChange={handleRegistrationDataChange}
            />
          </div>
        </Card>

        {/* Academic Information */}
        <Card
          title="Academic Information"
          subtitle="Update academic details"
          shadow="lg"
          padding="normal"
          rounded="lg"
          className="border border-gray-200"
        >
          <div className="space-y-4">
            <Input
              label="Academic Year"
              name="academicYear"
              value={registrationData.academicYear}
              onChange={handleRegistrationDataChange}
            />
            
            <Input
              label="College Name"
              name="collegeName"
              value={registrationData.collegeName}
              onChange={handleRegistrationDataChange}
              required
            />
            
            <Input
              label="Course Name"
              name="courseName"
              value={registrationData.courseName}
              onChange={handleRegistrationDataChange}
              required
            />
            
            <Input
              label="Address"
              name="address"
              value={registrationData.address}
              onChange={handleRegistrationDataChange}
            />
            
            <Input
              label="Village Name"
              name="villageName"
              value={registrationData.villageName}
              onChange={handleRegistrationDataChange}
            />
            
            <Input
              label="State"
              name="state"
              value={registrationData.state}
              onChange={handleRegistrationDataChange}
            />
          </div>
        </Card>

        {/* Special Categories */}
        <Card
          title="Special Categories"
          subtitle="Update special category information"
          shadow="lg"
          padding="normal"
          rounded="lg"
          className="border border-gray-200"
        >
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="orphan"
                checked={registrationData.orphan}
                onChange={handleRegistrationDataChange}
                className="mr-2"
              />
              Orphan
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="disabled"
                checked={registrationData.disabled}
                onChange={handleRegistrationDataChange}
                className="mr-2"
              />
              Disabled
            </label>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <div className="flex space-x-4">
          <Button
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Account"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/users/${userId}`)}
          >
            View Applications
          </Button>
        </div>
        
        <Button
          variant="danger"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={saving}
        >
          Delete Account
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this student account? This action cannot be undone and will delete all associated data including applications.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={saving}
              >
                {saving ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudentAccount; 