import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudyBooksForm = () => {
  const [formData, setFormData] = useState({
    yearOfStudy: "",
    field: "",
    booksRequired: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [bookInput, setBookInput] = useState("");
  const [bookType, setBookType] = useState("Textbook");
  const [booksList, setBooksList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = () => {
    if (bookInput.trim() !== "") {
      setBooksList([...booksList, { name: bookInput, type: bookType }]);
      setBookInput("");
      setBookType("Textbook");
    }
  };

  const handleRemoveBook = (index) => {
    setBooksList(booksList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.yearOfStudy || !formData.field || booksList.length === 0) {
      setError("Please fill in all fields and add at least one book");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/applications/study-books",
        {
          ...formData,
          booksRequired: booksList
            .map((book) => `${book.name} (${book.type})`)
            .join(", "),
          applicationType: "studyBooks",
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/options");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to submit application");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <h2 className="text-3xl font-bold text-white text-center">
          Apply for Study Books
        </h2>
        <p className="text-blue-100 text-center mt-2">
          Complete the form below to request academic books for your studies
        </p>
      </div>

      <div className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-400 rounded flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Application submitted successfully! Redirecting to options page...
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
          Please provide details about the books you need for your studies:
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Year of Study <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:text-white appearance-none"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Field of Study <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  required
                  className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:text-white appearance-none"
                >
                  <option value="">Select Field</option>
                  <option value="Medical">Medical</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Arts">Arts</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Science">Science</option>
                  <option value="Other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Add Book <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <input
                type="text"
                value={bookInput}
                onChange={(e) => setBookInput(e.target.value)}
                placeholder="Book Name"
                className="shadow-sm block w-full md:w-1/2 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 sm:text-sm border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 dark:text-white"
              />
              <select
                value={bookType}
                onChange={(e) => setBookType(e.target.value)}
                className="block w-full md:w-1/4 pl-3 pr-10 py-3 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 dark:text-white appearance-none"
              >
                <option value="Textbook">Textbook</option>
                <option value="Guide">Guide</option>
              </select>
              <button
                type="button"
                onClick={handleAddBook}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
            {booksList.length > 0 && (
              <ul className="mt-4 space-y-2">
                {booksList.map((book, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded p-2"
                  >
                    <span>
                      {book.name}{" "}
                      <span className="italic text-xs text-gray-500">
                        ({book.type})
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBook(idx)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/options")}
              className="py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex justify-center items-center py-3 px-8 rounded-lg text-white font-medium text-base transition duration-150 ease-in-out ${
                loading
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-indigo-50 dark:bg-gray-700/30 p-4 text-center text-sm text-gray-600 dark:text-gray-300">
        <p>Need help? Contact student support at support@university.edu</p>
      </div>
    </div>
  );
};

export default StudyBooksForm;
