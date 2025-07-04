import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      category: "Application Process",
      questions: [
        {
          question: "How do I apply for a scholarship?",
          answer:
            "To apply for a scholarship, you need to register on our portal, complete your profile, select the scholarship type you're interested in, upload the required documents, and submit your application. Visit our 'How to Apply' page for a detailed step-by-step guide.",
        },
        {
          question: "What is the application deadline?",
          answer:
            "The application deadline for the current cycle is July 31, 2023. Applications submitted after this date will not be considered for the current academic year.",
        },
        {
          question: "Can I apply for multiple scholarship categories?",
          answer:
            "Yes, you can apply for multiple scholarship categories (School Fees, Travel Expenses, Study Materials) in a single application if you meet the eligibility criteria for each.",
        },
        {
          question: "How long does the application process take?",
          answer:
            "Completing the application itself typically takes about 30-45 minutes if you have all the required documents ready. The review process takes approximately 2-3 weeks after submission.",
        },
      ],
    },
    {
      category: "Eligibility",
      questions: [
        {
          question: "Who is eligible to apply for the scholarship?",
          answer:
            "Students enrolled in recognized educational institutions, with a family annual income not exceeding ₹3,00,000, who have scored a minimum of 60% marks in their previous academic year are eligible to apply.",
        },
        {
          question: "Can I apply if I'm receiving another scholarship?",
          answer:
            "Yes, but only if you're not receiving a full scholarship from another organization. Partial scholarships from other sources are acceptable, but you must disclose this information in your application.",
        },
        {
          question: "Is there an age limit for applicants?",
          answer:
            "No, there is no specific age limit. However, you must be currently enrolled in an educational institution, from primary school to post-graduation level.",
        },
        {
          question: "Are there any geographical restrictions?",
          answer:
            "Currently, we primarily serve students in Maharashtra state, with a focus on Mumbai and surrounding areas. However, deserving cases from other regions may also be considered.",
        },
      ],
    },
    {
      category: "Documentation",
      questions: [
        {
          question: "What documents do I need to submit with my application?",
          answer:
            "Required documents include ID proof, latest academic marksheet, income certificate/proof of family income, school/college fee receipt (for School Fees Assistance), travel proof (for Travel Expenses Support), list of required books/materials (for Study Materials Aid), and a passport-size photograph.",
        },
        {
          question: "What if I don't have all the required documents?",
          answer:
            "All required documents are essential for application processing. If you're unable to provide certain documents due to genuine reasons, please contact our support team to discuss alternative documentation options.",
        },
        {
          question: "Do I need to submit original documents?",
          answer:
            "No, you don't need to submit original documents. Clear scans or photos of the documents uploaded to our portal are sufficient. However, during verification, we may ask to see the originals.",
        },
        {
          question: "Can I update my documents after submission?",
          answer:
            "Yes, you can update your documents within 7 days of submission if you need to correct or add information. After this period, you'll need to contact our support team for assistance.",
        },
      ],
    },
    {
      category: "Selection Process",
      questions: [
        {
          question: "How are scholarship recipients selected?",
          answer:
            "Recipients are selected based on financial need, academic performance, and the completeness and authenticity of their application. Each application is reviewed by our scholarship committee using a standardized evaluation process.",
        },
        {
          question: "When will I know if my application is successful?",
          answer:
            "Results for all applications will be announced by August 30, 2023. All applicants will be notified by email, regardless of whether their application is successful or not.",
        },
        {
          question: "If my application is rejected, can I apply again?",
          answer:
            "Yes, you can apply again in the next application cycle. We encourage unsuccessful applicants to review the feedback provided (if any) and address any issues before reapplying.",
        },
        {
          question: "Is there an interview process?",
          answer:
            "In some cases, shortlisted applicants may be invited for an interview, either in person or via video call. This is to verify information and better understand the applicant's needs and circumstances.",
        },
      ],
    },
    {
      category: "Scholarship Details",
      questions: [
        {
          question: "How much financial assistance can I expect?",
          answer:
            "The amount varies depending on the scholarship category and individual needs. School Fees Assistance typically covers 50-100% of fees, Travel Expenses Support ranges from ₹5,000 to ₹15,000 per year, and Study Materials Aid ranges from ₹3,000 to ₹10,000 per year.",
        },
        {
          question: "How is the scholarship amount disbursed?",
          answer:
            "Scholarship amounts are disbursed directly to the student's bank account or to the educational institution, depending on the scholarship category. Disbursements typically occur in September and January.",
        },
        {
          question: "Is the scholarship renewable?",
          answer:
            "Yes, scholarships can be renewed annually, provided that the student maintains the required academic performance (minimum 60% marks) and continues to meet the eligibility criteria.",
        },
        {
          question:
            "Are there any obligations after receiving the scholarship?",
          answer:
            "Scholarship recipients are expected to submit progress reports at the end of each semester/academic year. We also encourage recipients to participate in community service activities organized by Vivekanand Seva Mandal.",
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Application Process");
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Frequently Asked{" "}
            <span className="text-blue-600 dark:text-blue-400">Questions</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about Vivekanand Seva Mandal's
            scholarship programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Categories
                </h2>
                <nav className="space-y-2">
                  {faqs.map((category) => (
                    <button
                      key={category.category}
                      onClick={() => setActiveCategory(category.category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                        activeCategory === category.category
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category.category}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {activeCategory}
                </h2>
                <div className="space-y-4">
                  {faqs
                    .find((cat) => cat.category === activeCategory)
                    .questions.map((faq, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0"
                      >
                        <button
                          onClick={() => toggleQuestion(index)}
                          className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white py-2 focus:outline-none"
                        >
                          <span>{faq.question}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                              openQuestion === index
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          className={`mt-2 text-gray-600 dark:text-gray-300 transition-all duration-200 ${
                            openQuestion === index ? "block" : "hidden"
                          }`}
                        >
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you couldn't find the answer to your question in our FAQ,
                  please don't hesitate to contact us. Our support team is ready
                  to assist you with any inquiries regarding our scholarship
                  programs.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col space-y-3">
                <Link
                  to="/contact"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/how-to-apply"
                  className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  How to Apply
                </Link>
              </div>
            </div>
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

export default FAQ;
