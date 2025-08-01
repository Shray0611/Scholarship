import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Alert, Button, Input } from "./ui";

const CreateStudentAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Step 1: User account details
    username: "",
    password: "",
    confirmPassword: "",
    
    // Step 2: Student registration details
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
    disabled: false,
    
    // Step 3: Application details (optional)
    createSchoolFeesApp: false,
    createTravelExpensesApp: false,
    createStudyBooksApp: false,
    
    // School fees application fields
    schoolFeesAmount: "",
    birthCertificate: null,
    leavingCertificate: null,
    marksheet: null,
    admissionProof: null,
    incomeProof: null,
    bankAccount: null,
    rationCard: null,
    
    // Travel expenses application fields
    residencePlace: "",
    destinationPlace: "",
    distance: "",
    travelMode: "",
    aidRequired: "",
    idCard: null,
    
    // Study books application fields
    yearOfStudy: "",
    field: "",
    booksRequired: "",
    standard: "",
    stream: "",
    medium: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [createdUserId, setCreatedUserId] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep1 = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError("Username, password, and confirm password are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.applicantName || !formData.motherName || !formData.dob) {
      setError("Applicant name, mother's name, and date of birth are required");
      return false;
    }
    if (!formData.collegeName || !formData.courseName) {
      setError("College name and course name are required");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Step 1: Create user account
      const accountData = {
        username: formData.username,
        password: formData.password
      };

      const accountResponse = await axios.post("/api/admin/create-student-account", accountData, {
        headers: { "x-auth-token": token }
      });

      const userId = accountResponse.data.user._id;
      setCreatedUserId(userId);
      setCreatedUser(accountResponse.data.user);

      setSuccess("User account created successfully! Proceed to registration.");
      setCurrentStep(2);

    } catch (err) {
      console.error("Error creating user account:", err);
      setError(err.response?.data?.msg || "Failed to create user account");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Step 2: Complete registration
      const registrationData = {
        userId: createdUserId,
        academicYear: formData.academicYear,
        collegeName: formData.collegeName,
        courseName: formData.courseName,
        applicantName: formData.applicantName,
        motherName: formData.motherName,
        dob: formData.dob,
        address: formData.address,
        villageName: formData.villageName,
        state: formData.state,
        caste: formData.caste,
        gender: formData.gender,
        orphan: formData.orphan,
        disabled: formData.disabled
      };

      await axios.post("/api/admin/create-student-registration", registrationData, {
        headers: { "x-auth-token": token }
      });

      setSuccess("Registration completed successfully! You can now apply for scholarships.");
      setCurrentStep(3);

    } catch (err) {
      console.error("Error completing registration:", err);
      setError(err.response?.data?.msg || "Failed to complete registration");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitApplications = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Step 3: Create applications if requested
      const applicationPromises = [];

      if (formData.createSchoolFeesApp) {
        const schoolFeesData = {
          userId: createdUserId,
          amount: formData.schoolFeesAmount
        };
        applicationPromises.push(
          axios.post("/api/admin/create-school-fees-application", schoolFeesData, {
            headers: { "x-auth-token": token }
          })
        );
      }

      if (formData.createTravelExpensesApp) {
        const travelData = {
          userId: createdUserId,
          residencePlace: formData.residencePlace,
          destinationPlace: formData.destinationPlace,
          distance: formData.distance,
          travelMode: formData.travelMode,
          aidRequired: formData.aidRequired
        };
        applicationPromises.push(
          axios.post("/api/admin/create-travel-expenses-application", travelData, {
            headers: { "x-auth-token": token }
          })
        );
      }

      if (formData.createStudyBooksApp) {
        const studyBooksData = {
          userId: createdUserId,
          yearOfStudy: formData.yearOfStudy,
          field: formData.field,
          booksRequired: formData.booksRequired,
          standard: formData.standard,
          stream: formData.stream,
          medium: formData.medium
        };
        applicationPromises.push(
          axios.post("/api/admin/create-study-books-application", studyBooksData, {
            headers: { "x-auth-token": token }
          })
        );
      }

      // Wait for all applications to be created
      await Promise.all(applicationPromises);

      setSuccess(`Student account creation completed! Username: ${formData.username}, Password: ${formData.password}`);
      
      // Reset form
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
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
        disabled: false,
        createSchoolFeesApp: false,
        createTravelExpensesApp: false,
        createStudyBooksApp: false,
        schoolFeesAmount: "",
        birthCertificate: null,
        leavingCertificate: null,
        marksheet: null,
        admissionProof: null,
        incomeProof: null,
        bankAccount: null,
        rationCard: null,
        residencePlace: "",
        destinationPlace: "",
        distance: "",
        travelMode: "",
        aidRequired: "",
        idCard: null,
        yearOfStudy: "",
        field: "",
        booksRequired: "",
        standard: "",
        stream: "",
        medium: ""
      });
      setCurrentStep(1);
      setCreatedUserId(null);
      setCreatedUser(null);

    } catch (err) {
      console.error("Error creating applications:", err);
      setError(err.response?.data?.msg || "Failed to create applications");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Step 1: Create User Account
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Username *"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Password *"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Confirm Password *"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Account Creation Process
        </h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          This step creates the basic user account with username and password. 
          The student will be able to login with these credentials and complete their profile.
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Step 2: Student Registration
      </h3>
      
      {createdUser && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Account Created Successfully
          </h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            Username: <strong>{createdUser.username}</strong> | 
            User ID: <strong>{createdUser._id}</strong>
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Applicant Name *"
          name="applicantName"
          value={formData.applicantName}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Mother's Name *"
          name="motherName"
          value={formData.motherName}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Date of Birth *"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
        
        <Input
          label="Caste"
          name="caste"
          value={formData.caste}
          onChange={handleInputChange}
        />
        
        <Input
          label="Academic Year"
          name="academicYear"
          value={formData.academicYear}
          onChange={handleInputChange}
        />
        
        <Input
          label="College Name *"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Course Name *"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        
        <Input
          label="Village Name"
          name="villageName"
          value={formData.villageName}
          onChange={handleInputChange}
        />
        
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="orphan"
            checked={formData.orphan}
            onChange={handleInputChange}
            className="mr-2"
          />
          Orphan
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            name="disabled"
            checked={formData.disabled}
            onChange={handleInputChange}
            className="mr-2"
          />
          Disabled
        </label>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Registration Process
        </h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          This step completes the student registration with all personal and academic details. 
          The student will now have a complete profile in the system.
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Step 3: Scholarship Applications
      </h3>
      
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
          Registration Completed Successfully
        </h4>
        <p className="text-green-700 dark:text-green-300 text-sm">
          The student account is now fully registered. You can optionally create scholarship applications on their behalf.
        </p>
      </div>
      
      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="createSchoolFeesApp"
            checked={formData.createSchoolFeesApp}
            onChange={handleInputChange}
            className="mr-2"
          />
          Create School Fees Application
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            name="createTravelExpensesApp"
            checked={formData.createTravelExpensesApp}
            onChange={handleInputChange}
            className="mr-2"
          />
          Create Travel Expenses Application
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            name="createStudyBooksApp"
            checked={formData.createStudyBooksApp}
            onChange={handleInputChange}
            className="mr-2"
          />
          Create Study Books Application
        </label>
      </div>
      
      {formData.createSchoolFeesApp && (
        <div className="border p-4 rounded-lg">
          <h4 className="font-semibold mb-3">School Fees Application Details</h4>
          <Input
            label="Amount Required"
            name="schoolFeesAmount"
            type="number"
            value={formData.schoolFeesAmount}
            onChange={handleInputChange}
          />
        </div>
      )}
      
      {formData.createTravelExpensesApp && (
        <div className="border p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Travel Expenses Application Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Residence Place"
              name="residencePlace"
              value={formData.residencePlace}
              onChange={handleInputChange}
            />
            <Input
              label="Destination Place"
              name="destinationPlace"
              value={formData.destinationPlace}
              onChange={handleInputChange}
            />
            <Input
              label="Distance (km)"
              name="distance"
              type="number"
              value={formData.distance}
              onChange={handleInputChange}
            />
            <Input
              label="Travel Mode"
              name="travelMode"
              value={formData.travelMode}
              onChange={handleInputChange}
            />
            <Input
              label="Aid Required (Rs)"
              name="aidRequired"
              type="number"
              value={formData.aidRequired}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      
      {formData.createStudyBooksApp && (
        <div className="border p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Study Books Application Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Year of Study"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleInputChange}
            />
            <Input
              label="Field"
              name="field"
              value={formData.field}
              onChange={handleInputChange}
            />
            <Input
              label="Standard"
              name="standard"
              value={formData.standard}
              onChange={handleInputChange}
            />
            <Input
              label="Stream"
              name="stream"
              value={formData.stream}
              onChange={handleInputChange}
            />
            <Input
              label="Medium"
              name="medium"
              value={formData.medium}
              onChange={handleInputChange}
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Books Required
              </label>
              <textarea
                name="booksRequired"
                value={formData.booksRequired}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows="3"
                placeholder="Enter required books..."
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          Application Process
        </h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          This step creates scholarship applications on behalf of the student. 
          The student can later login and view/manage these applications.
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Create Student Account
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

      <Card
        title={`Step ${currentStep} of 3`}
        subtitle={
          currentStep === 1 ? "Create User Account" :
          currentStep === 2 ? "Student Registration" :
          "Scholarship Applications"
        }
        shadow="lg"
        padding="normal"
        rounded="lg"
        className="border border-gray-200"
      >
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep === 1 ? (
            <Button
              onClick={handleCreateAccount}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          ) : currentStep === 2 ? (
            <Button
              onClick={handleCompleteRegistration}
              disabled={loading}
            >
              {loading ? "Completing Registration..." : "Complete Registration"}
            </Button>
          ) : (
            <Button
              onClick={handleSubmitApplications}
              disabled={loading}
            >
              {loading ? "Creating Applications..." : "Complete Process"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateStudentAccount; 