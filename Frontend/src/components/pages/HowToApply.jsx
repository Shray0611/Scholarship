import React from "react";
import { Link } from "react-router-dom";

const HowToApply = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            How to{" "}
            <span className="text-blue-600 dark:text-blue-400">Apply</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Simple steps to apply for a scholarship from Vivekanand Seva Mandal
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Application Process
            </h2>

            <div className="space-y-12">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Register on our Portal
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Create an account on our scholarship portal. You'll need to
                    provide basic information including your name, contact
                    details, and create a password.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Required Information:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                      <li>Full Name</li>
                      <li>Email Address</li>
                      <li>Phone Number</li>
                      <li>Secure Password</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Complete Your Profile
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Fill out your complete profile with personal, educational,
                    and financial information. This helps us understand your
                    background and financial needs.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Profile Information:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                      <li>Personal Details (Address, Date of Birth, etc.)</li>
                      <li>
                        Educational Background (School/College, Current
                        Class/Course)
                      </li>
                      <li>Family Information (Parent/Guardian Details)</li>
                      <li>
                        Financial Information (Family Income, Other
                        Scholarships)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Choose Scholarship Type
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Select the type of scholarship assistance you need. You can
                    apply for one or more categories based on your requirements.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Scholarship Categories:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                      <li>School Fees Assistance</li>
                      <li>Travel Expenses Support</li>
                      <li>Study Materials Aid</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Upload Required Documents
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Submit all necessary documents to verify your eligibility.
                    Clear scans or photos of the documents are acceptable.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Required Documents:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                      <li>ID Proof (Aadhar Card/PAN Card)</li>
                      <li>Latest Academic Marksheet</li>
                      <li>Income Certificate/Proof of Family Income</li>
                      <li>
                        School/College Fee Receipt (for School Fees Assistance)
                      </li>
                      <li>Travel Proof (for Travel Expenses Support)</li>
                      <li>
                        List of Required Books/Materials (for Study Materials
                        Aid)
                      </li>
                      <li>Passport Size Photograph</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xl font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Submit Application & Wait for Review
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    After filling all details and uploading documents, submit
                    your application. Our team will review it and get back to
                    you within 2-3 weeks.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      What Happens Next:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                      <li>Application Screening (1 week)</li>
                      <li>Document Verification (1 week)</li>
                      <li>Final Decision (1 week)</li>
                      <li>Email Notification of Results</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Eligibility Criteria
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Must be a student enrolled in a recognized educational
                  institution
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Family annual income should not exceed ₹3,00,000
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Minimum 60% marks in the previous academic year
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Good conduct certificate from current institution
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Should not be receiving a full scholarship from any other
                  organization
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Important Dates
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-3">
                    JUN
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      June 1, 2023
                    </p>
                    <p>Application Portal Opens</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-3">
                    JUL
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      July 31, 2023
                    </p>
                    <p>Application Deadline</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-3">
                    AUG
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      August 1-21, 2023
                    </p>
                    <p>Application Review Period</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-3">
                    AUG
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      August 30, 2023
                    </p>
                    <p>Results Announcement</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mr-3">
                    SEP
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      September 15, 2023
                    </p>
                    <p>First Disbursement of Funds</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 dark:bg-blue-700 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Apply?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start your application today and take the first step towards
              receiving financial support for your education.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Apply Now
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowToApply;
