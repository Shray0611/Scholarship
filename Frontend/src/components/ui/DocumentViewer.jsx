import React, { useState, useEffect } from "react";
import { Button } from "./index";

const DocumentViewer = ({
  url,
  blob,
  contentType,
  fileName,
  title,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fileType, setFileType] = useState("unknown");

  useEffect(() => {
    setLoading(true);
    setError("");
    if (!blob && !url) {
      setError("No document provided");
      setLoading(false);
      return;
    }
    // Detect file type from contentType
    if (contentType) {
      if (contentType === "application/pdf") setFileType("pdf");
      else if (contentType.startsWith("image/")) setFileType("image");
      else if (contentType.includes("word")) setFileType("word");
      else setFileType("unknown");
    } else {
      setFileType("unknown");
    }
    setLoading(false);
  }, [blob, url, contentType]);

  const handleDownload = () => {
    if (blob) {
      const blobUrl = window.URL.createObjectURL(
        new Blob([blob], { type: contentType })
      );
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || title || "document";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } else if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || title || "document";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title || "Document Preview"}
          </h3>
          <div className="flex space-x-2">
            <Button variant="secondary" size="small" onClick={handleDownload}>
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </span>
            </Button>
            <Button variant="secondary" size="small" onClick={onClose}>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Close
              </span>
            </Button>
          </div>
        </div>

        <div className="p-4 flex-grow overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="bg-red-100 dark:bg-red-900/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-red-500 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Error Loading Document
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
              <Button variant="primary" size="small" onClick={handleDownload}>
                Download Instead
              </Button>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {fileType === "pdf" && blob && (
                <object
                  data={URL.createObjectURL(
                    new Blob([blob], { type: contentType })
                  )}
                  type="application/pdf"
                  className="w-full h-full min-h-[500px]"
                >
                  <div className="text-center py-10">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Unable to display PDF directly. Your browser may not
                      support PDF viewing.
                    </p>
                    <Button variant="primary" onClick={handleDownload}>
                      Download PDF
                    </Button>
                  </div>
                </object>
              )}

              {fileType === "image" && blob && (
                <div className="flex items-center justify-center h-full">
                  <img
                    src={URL.createObjectURL(
                      new Blob([blob], { type: contentType })
                    )}
                    alt={title || "Document preview"}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </div>
              )}

              {fileType === "word" && (
                <div className="text-center py-10">
                  <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="h-8 w-8 text-blue-500 dark:text-blue-400"
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
                    Word Document
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Word documents cannot be previewed directly in the browser.
                  </p>
                  <Button variant="primary" onClick={handleDownload}>
                    Download Document
                  </Button>
                </div>
              )}

              {fileType === "unknown" && (
                <div className="text-center py-10">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="h-8 w-8 text-gray-500 dark:text-gray-400"
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
                    Unknown Document Type
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    This document type cannot be previewed in the browser.
                  </p>
                  <Button variant="primary" onClick={handleDownload}>
                    Download Document
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
